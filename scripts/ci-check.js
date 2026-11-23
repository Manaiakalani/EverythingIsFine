const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = process.cwd();
const required = ['index.html', 'effects.css', 'lofi-vibes.js', '2092sn.jpg'];

function fail(message) {
  console.error(message);
  process.exit(1);
}

for (const file of required) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    fail('Missing required file: ' + file);
  }
  if (fs.statSync(full).size === 0) {
    fail('Required file is empty: ' + file);
  }
}

function syntaxStatus(file) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
    return 0;
  } catch (err) {
    return err.status || 1;
  }
}

const pageStatus = syntaxStatus(path.join(root, 'lofi-vibes.js'));
if (pageStatus !== 0) {
  process.exit(pageStatus);
}
console.log('Syntax check passed: lofi-vibes.js');

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const inlineRe = /<script(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let inlineCount = 0;

while ((match = inlineRe.exec(html)) !== null) {
  const source = match[1];
  if (!source.trim()) {
    continue;
  }
  const tmp = path.join(
    os.tmpdir(),
    'everything-is-fine-inline-' + inlineCount + '.js'
  );
  fs.writeFileSync(tmp, source);
  const inlineStatus = syntaxStatus(tmp);
  fs.unlinkSync(tmp);
  if (inlineStatus !== 0) {
    process.exit(inlineStatus);
  }
  inlineCount += 1;
}

if (inlineCount === 0) {
  fail('index.html has no inline script to check');
}
console.log('Syntax check passed: ' + inlineCount + ' inline script(s)');

const attrRe = /\b(?:src|href)\s*=\s*["']([^"']+)["']/gi;
const missing = [];
const checked = [];

while ((match = attrRe.exec(html)) !== null) {
  const ref = match[1].trim();
  if (!ref || ref.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(ref)) {
    continue;
  }
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean || checked.includes(clean)) {
    continue;
  }
  checked.push(clean);
  const full = path.resolve(root, clean);
  const relative = path.relative(root, full);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    fail('Page reference escapes the repository: ' + ref);
  }
  if (!fs.existsSync(full)) {
    missing.push(clean);
  }
}

if (missing.length > 0) {
  fail('Missing local page assets:\n' + missing.join('\n'));
}
if (checked.length === 0) {
  fail('index.html has no local src or href assets to check');
}
console.log('Local page assets exist: ' + checked.join(', '));

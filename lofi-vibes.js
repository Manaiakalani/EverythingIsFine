// Enhanced lo-fi flaming vibes JavaScript
class LoFiVibes {
    constructor() {
        this.init();
        this.setupInteractivity();
        this.startAmbientEffects();
    }
    
    init() {
        // Add VHS and film grain effects to body
        const vhsEffect = document.createElement('div');
        vhsEffect.className = 'vhs-effect';
        document.body.appendChild(vhsEffect);
        
        const filmGrain = document.createElement('div');
        filmGrain.className = 'film-grain';
        document.body.appendChild(filmGrain);
    }
    
    setupInteractivity() {
        const mainImage = document.getElementById('mainImage');
        
        // Enhanced click interaction
        mainImage.addEventListener('click', (e) => {
            this.createFireBurst(e);
            this.triggerScreenEffect();
            this.createRippleEffect(e);
        });
        
        // Hover effects
        mainImage.addEventListener('mouseenter', () => {
            this.intensifyEffects();
        });
        
        mainImage.addEventListener('mouseleave', () => {
            this.normalizeEffects();
        });
        
        // Keyboard interactions
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                this.createRandomBurst();
            }
        });
    }
    
    createFireBurst(event) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createTargetedFireParticle(x, y);
            }, i * 25);
        }
    }
    
    createTargetedFireParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'fire-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.position = 'absolute';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 50 + 30;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 50;
        
        particle.style.animation = `targetedFire 2s ease-out forwards`;
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        document.querySelector('.container').appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
    
    createRippleEffect(event) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.border = '2px solid rgba(255, 140, 0, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.left = (event.clientX - 5) + 'px';
        ripple.style.top = (event.clientY - 5) + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleExpand 1s ease-out forwards';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    }
    
    triggerScreenEffect() {
        const container = document.querySelector('.container');
        container.style.filter = 'hue-rotate(10deg) brightness(1.3)';
        
        setTimeout(() => {
            container.style.filter = 'none';
        }, 200);
    }
    
    intensifyEffects() {
        document.body.style.setProperty('--effect-intensity', '1.5');
        const mainImage = document.getElementById('mainImage');
        mainImage.style.filter = 'contrast(1.2) saturate(1.4) brightness(1.2) sepia(0.15)';
    }
    
    normalizeEffects() {
        document.body.style.setProperty('--effect-intensity', '1');
        const mainImage = document.getElementById('mainImage');
        mainImage.style.filter = 'contrast(1.1) saturate(1.2) brightness(1.1) sepia(0.1)';
    }
    
    createRandomBurst() {
        const container = document.querySelector('.container');
        const rect = container.getBoundingClientRect();
        
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                const x = Math.random() * rect.width;
                const y = Math.random() * rect.height;
                this.createTargetedFireParticle(x, y);
            }, i * 20);
        }
    }
    
    startAmbientEffects() {
        // Create floating text particles
        setInterval(() => {
            this.createTextParticle();
        }, 4000);
        
        // Create color shift waves
        setInterval(() => {
            this.createColorWave();
        }, 6000);
    }
    
    createTextParticle() {
        const texts = ['♪', '♫', '~', '✧', '◆', '▲'];
        const particle = document.createElement('div');
        particle.textContent = texts[Math.floor(Math.random() * texts.length)];
        particle.style.position = 'absolute';
        particle.style.color = '#ff8c00';
        particle.style.fontSize = '20px';
        particle.style.fontWeight = 'bold';
        particle.style.pointerEvents = 'none';
        particle.style.textShadow = '0 0 10px rgba(255, 140, 0, 0.8)';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.animation = 'textFloat 8s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    createColorWave() {
        const wave = document.createElement('div');
        wave.style.position = 'fixed';
        wave.style.top = '0';
        wave.style.left = '-100%';
        wave.style.width = '200%';
        wave.style.height = '100%';
        wave.style.background = 'linear-gradient(90deg, transparent, rgba(255, 140, 0, 0.1), transparent)';
        wave.style.pointerEvents = 'none';
        wave.style.animation = 'colorSweep 3s ease-in-out forwards';
        wave.style.zIndex = '500';
        
        document.body.appendChild(wave);
        
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 3000);
    }
}

// Additional CSS animations via JavaScript
const additionalStyles = `
    @keyframes targetedFire {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--vx), var(--vy)) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes rippleExpand {
        0% {
            width: 10px;
            height: 10px;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            margin-left: -95px;
            margin-top: -95px;
            opacity: 0;
        }
    }
    
    @keyframes textFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        20% {
            opacity: 1;
        }
        80% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes colorSweep {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the lo-fi vibes
document.addEventListener('DOMContentLoaded', () => {
    new LoFiVibes();
    
    // Add loading message
    const loadingText = document.createElement('div');
    loadingText.textContent = 'Loading lo-fi vibes...';
    loadingText.style.position = 'fixed';
    loadingText.style.top = '50%';
    loadingText.style.left = '50%';
    loadingText.style.transform = 'translate(-50%, -50%)';
    loadingText.style.color = '#ff8c00';
    loadingText.style.fontSize = '1.2em';
    loadingText.style.fontFamily = 'Courier Prime, monospace';
    loadingText.style.textShadow = '0 0 10px rgba(255, 140, 0, 0.8)';
    loadingText.style.zIndex = '10000';
    loadingText.style.animation = 'textPulse 1s ease-in-out infinite';
    
    document.body.appendChild(loadingText);
    
    // Remove loading text after image loads
    const img = document.getElementById('mainImage');
    img.onload = () => {
        setTimeout(() => {
            if (loadingText.parentNode) {
                loadingText.parentNode.removeChild(loadingText);
            }
        }, 1000);
    };
});

// Add touch support for mobile
document.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const clickEvent = new MouseEvent('click', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    document.elementFromPoint(touch.clientX, touch.clientY).dispatchEvent(clickEvent);
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
let isAnimating = true;
let currentAnimation = 'matrix';

// Matrix rain variables
let columns, drops;
const FONT_SIZE = 16;
const MAX_DROPS = 100;

// Particle variables
let particles = [];
const PARTICLE_COUNT = 200;

// Colors
const COLORS = ['#00ff00', '#00ffff', '#ff00ff', '#ffff00', '#ffffff'];

function init() {
    resizeCanvas();
    createDrops();
    createParticles();
    animationLoop();
    setupHoverEffect();
    setupAnimationToggle();
    setupInstructionsClose();
}

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    columns = Math.floor(width / FONT_SIZE);
    ctx.font = FONT_SIZE + "px 'Source Code Pro'";
}

// Matrix rain functions
function createDrops() {
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * height / FONT_SIZE) * -1;
    }
}

function getRandomCharacter() {
    return String.fromCharCode(33 + Math.floor(Math.random() * 94));
}

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#00ff00";
    for (let i = 0; i < drops.length; i++) {
        const text = getRandomCharacter();
        ctx.fillText(text, i * FONT_SIZE, drops[i] * FONT_SIZE);

        if (isAnimating) {
            if (drops[i] * FONT_SIZE > height && Math.random() > 0.98) {
                drops[i] = 0;
            }
            drops[i] += 0.5;
        }
    }
}

// Particle functions
function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * width,
            radius: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        });
    }
}

function drawDiffusion() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        if (isAnimating) {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
}

function drawRadial() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        if (isAnimating) {
            const angle = Math.atan2(p.y - height / 2, p.x - width / 2);
            const distance = Math.sqrt((p.x - width / 2) ** 2 + (p.y - height / 2) ** 2);
            p.x += Math.cos(angle) * (distance * 0.01);
            p.y += Math.sin(angle) * (distance * 0.01);

            if (distance < 5) {
                p.x = Math.random() * width;
                p.y = Math.random() * height;
            }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
}

function drawVortex() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        if (isAnimating) {
            const angle = Math.atan2(p.y - height / 2, p.x - width / 2);
            const distance = Math.sqrt((p.x - width / 2) ** 2 + (p.y - height / 2) ** 2);
            p.x += Math.cos(angle + distance * 0.01) * 2;
            p.y += Math.sin(angle + distance * 0.01) * 2;

            if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
                p.x = width / 2 + (Math.random() - 0.5) * 100;
                p.y = height / 2 + (Math.random() - 0.5) * 100;
            }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
}
function drawStarfield() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        if (isAnimating) {
            p.z = p.z - 1;
            if (p.z <= 0) {
                p.z = width;
                p.x = Math.random() * width * 2 - width;
                p.y = Math.random() * height * 2 - height;
            }
        }

        const scale = width / p.z;
        const x = (p.x * scale) + width / 2;
        const y = (p.y * scale) + height / 2;

        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.5, 15 / p.z), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
}

function drawBinaryStream() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#00ff00";
    for (let i = 0; i < columns; i++) {
        const text = Math.round(Math.random()).toString();
        ctx.fillText(text, i * FONT_SIZE, drops[i] * FONT_SIZE);

        if (isAnimating) {
            drops[i] += 0.5;
            if (drops[i] * FONT_SIZE > height && Math.random() > 0.98) {
                drops[i] = 0;
            }
        }
    }
}

function animationLoop() {
    switch(currentAnimation) {
        case 'matrix':
            drawMatrix();
            break;
        case 'diffusion':
            drawDiffusion();
            break;
        case 'radial':
            drawRadial();
            break;
        case 'vortex':
            drawVortex();
            break;
        case 'starfield':
            drawStarfield();
            break;
        case 'binary':
            drawBinaryStream();
            break;
    }
    requestAnimationFrame(animationLoop);
}

function setupHoverEffect() {
    const main = document.querySelector('main');
    const mainRect = main.getBoundingClientRect();
    const centerWidth = mainRect.width;
    const centerLeft = (width - centerWidth) / 2;
    const centerRight = centerLeft + centerWidth;

    document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        isAnimating = !(mouseX >= centerLeft && mouseX <= centerRight && mouseY >= 0 && mouseY <= height);
    });
}

function setupAnimationToggle() {
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case '1':
                currentAnimation = 'matrix';
                break;
            case '2':
                currentAnimation = 'diffusion';
                break;
            case '3':
                currentAnimation = 'radial';
                break;
            case '4':
                currentAnimation = 'vortex';
                break;
            case '5':
                currentAnimation = 'starfield';
                break;
            case '6':
                currentAnimation = 'binary';
                break;
        }
    });
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createDrops();
    createParticles();
    setupHoverEffect();
});

window.addEventListener('load', init);
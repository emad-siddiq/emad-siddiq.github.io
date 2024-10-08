const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
let isAnimating = true;
let currentAnimation = 'vortex'; // Initially set to vortex

// Binary stream variables
let columns, drops;
const FONT_SIZE = 16;

// Particle variables
let particles = [];
const PARTICLE_COUNT = 200;

// Colors - Modified to remove pink and add more blue/green tones
const COLORS = ['#00ff00', '#00ffff', '#0080ff', '#40e0d0', '#ffffff'];

function init() {
    resizeCanvas();
    createDrops();
    createParticles();
    animationLoop();
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

// Binary stream functions
function createDrops() {
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * height / FONT_SIZE) * -1;
    }
}

function drawBinaryStream() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#00ff00";
    for (let i = 0; i < columns; i++) {
        const text = Math.round(Math.random()).toString();
        ctx.fillText(text, i * FONT_SIZE, drops[i] * FONT_SIZE);

        if (isAnimating) {
            drops[i] += 1; 
            if (drops[i] * FONT_SIZE > height && Math.random() > 0.99) {
                drops[i] = 0;
            }
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
            radius: Math.random() * 2 + 1,
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        });
    }
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

function animationLoop() {
    if (currentAnimation === 'binary') {
        drawBinaryStream();
    } else {
        drawVortex();
    }
    requestAnimationFrame(animationLoop);
}

function setupAnimationToggle() {
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case '1':
                currentAnimation = 'vortex';
                break;
            case '2':
                currentAnimation = 'binary';
                break;
        }
    });
}

function setupInstructionsClose() {
    const closeButton = document.getElementById('close-instructions');
    const instructionsDiv = document.getElementById('animation-instructions');

    closeButton.addEventListener('click', () => {
        instructionsDiv.style.display = 'none';
    });
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createDrops();
    createParticles();
});

window.addEventListener('load', init);
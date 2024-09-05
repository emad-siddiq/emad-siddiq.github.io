const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
let isAnimating = true;
let currentAnimation = 'vortex';

// Matrix rain variables
let columns, drops;
const FONT_SIZE = 16;
const MAX_DROPS = 100;

// Particle variables
let particles = [];
const PARTICLE_COUNT = 200;

// Colors
const COLORS = ['#00ff00', '#00ffff', '#ff00ff', '#ffff00', '#ffffff'];

// ... (rest of the unchanged code)

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
            drops[i] += 0.7; // Increased from 0.5 to 0.7
        }
    }
}

function drawDiffusion() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        if (isAnimating) {
            p.x += p.speedX * 1.2; // Increased speed by 20%
            p.y += p.speedY * 1.2; // Increased speed by 20%

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
            p.x += Math.cos(angle) * (distance * 0.012); // Increased from 0.01 to 0.012
            p.y += Math.sin(angle) * (distance * 0.012); // Increased from 0.01 to 0.012

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
            p.x += Math.cos(angle + distance * 0.012) * 2.4; // Increased from 0.01 to 0.012 and 2 to 2.4
            p.y += Math.sin(angle + distance * 0.012) * 2.4; // Increased from 0.01 to 0.012 and 2 to 2.4

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
            p.z = p.z - 1.2; // Increased from 1 to 1.2
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
            drops[i] += 0.7; // Increased from 0.5 to 0.7
            if (drops[i] * FONT_SIZE > height && Math.random() > 0.98) {
                drops[i] = 0;
            }
        }
    }
}

// ... (rest of the unchanged code)
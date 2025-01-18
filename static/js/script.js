const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
let gradient, time = 0;

function init() {
    resizeCanvas();
    animate();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createGradient();
}

function createGradient() {
    gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#cce7ff');  // Very light blue at the top
    gradient.addColorStop(0.5, '#ffffff'); // White in the middle
    gradient.addColorStop(1, '#cce7ff');  // Very light blue at the bottom
}

function drawBackground() {
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function drawWaves() {
    ctx.save();
    ctx.globalAlpha = 0.6;

    for (let i = 0; i < 3; i++) {
        const offset = time + i * Math.PI * 2 / 3;
        const amplitude = 50 + i * 20;
        const frequency = 0.002 + i * 0.001;

        ctx.beginPath();
        for (let x = 0; x < width; x++) {
            const y = height / 2 + Math.sin(x * frequency + offset) * amplitude;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        ctx.fillStyle = `rgba(0, 191, 255, ${0.3 + i * 0.2})`; // Lighter ocean color for waves
        ctx.fill();
    }

    ctx.restore();
}

function animate() {
    time += 0.001;

    drawBackground();
    drawWaves();

    requestAnimationFrame(animate);
}

init();

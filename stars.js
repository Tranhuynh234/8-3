// Hàm vẽ sao
function initStars() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Ép canvas lấy kích thước thật của cửa sổ trình duyệt
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const stars = [];
    const numStars = 250; 

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005 
        });
    }

    function draw() {
        // Luôn clear sạch nền để thấy background đen của CSS
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(s => {
            ctx.save();
            ctx.globalAlpha = s.alpha;
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            
            s.alpha += s.speed;
            if (s.alpha >= 1 || s.alpha <= 0) {
                s.speed = -s.speed;
            }
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// QUAN TRỌNG: Đợi trình duyệt tải xong hoàn toàn mới chạy vẽ sao
if (document.readyState === 'complete') {
    initStars();
} else {
    window.addEventListener('load', initStars);
}

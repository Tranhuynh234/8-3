const wishData = {
    title: "Happy Women's Day",
    baseMessage: "Gửi đến người đẹp lời chúc 8/3 chân thành nhất. Hy vọng người đẹp sẽ nhận được thật nhiều niềm vui, và luôn cảm thấy mình được yêu thương, trân trọng. Hãy cứ mãi xinh đẹp, kiêu sa và là phiên bản hạnh phúc nhất của chính mình nhe!"
};

// Đảm bảo script chạy sau khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Xử lý tên người nhận từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipient = urlParams.get('to') || "Người phụ nữ tuyệt vời";
    const subTitleEl = document.getElementById('wishSubTitle');
    if(subTitleEl) subTitleEl.innerText = `Gửi đến ${recipient}`;

    // 2. Logic chuyển từ Intro sang Main
    setTimeout(() => {
        const intro = document.getElementById('intro');
        const main = document.getElementById('main');
        
        if (intro) {
            intro.style.opacity = '0';
            setTimeout(() => {
                intro.style.display = 'none';
                if (main) {
                    main.style.opacity = '1';
                    
                    // Khởi tạo sao nền (từ stars.js)
                    if(typeof initStars === 'function') {
                        initStars();
                    } else {
                        console.error("Không tìm thấy hàm initStars trong stars.js");
                    }

                    // Hiện vườn hoa
                    const bouquet = document.getElementById('bouquet');
                    if(bouquet) {
                        setTimeout(() => bouquet.classList.add('active'), 500);
                    }

                    // Hiện lá thư
                    setTimeout(() => {
                        const env = document.getElementById('envelopeWrapper');
                        if(env) {
                            env.style.display = 'block';
                            // Ép trình duyệt render lại trước khi add class float
                            env.offsetHeight; 
                            env.classList.add('float');
                            
                            // Gán sự kiện click
                            env.onclick = () => openEnvelope(wishData.baseMessage);
                        }
                    }, 2000); 
                }
            }, 1000);
        }
    }, 3500); // Chờ loading chạy xong (3s + 0.5s bù trừ)
});

function startTyping(text) {
    let i = 0;
    const el = document.getElementById('typingText');
    if(!el) return;
    el.innerHTML = "";
    function type() {
        if(i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 35);
        }
    }
    type();
}

let isOpened = false;
function openEnvelope(msg) {
    if(isOpened) return;
    isOpened = true;

    const env = document.getElementById('envelopeWrapper');
    if(env) {
        env.classList.remove('float'); 
        env.classList.add('open');
        burstSakura();
        setTimeout(() => startTyping(msg), 1000);
    }
}

function burstSakura() {
    const canvas = document.getElementById('sakuraCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const petals = [];
    for(let i = 0; i < 100; i++) {
        petals.push({
            x: window.innerWidth / 2, 
            y: window.innerHeight / 2,
            vx: (Math.random() - 0.5) * 15, 
            vy: (Math.random() - 1) * 15 - 5, 
            size: Math.random() * 8 + 6,
            angle: Math.random() * 360,
            spin: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.6 + 0.4
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillStyle = `rgba(255, 182, 193, ${p.opacity})`;
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.bezierCurveTo(-p.size/2, -p.size/2, -p.size/2, p.size, 0, p.size);
            ctx.bezierCurveTo(p.size/2, p.size, p.size/2, -p.size/2, 0, 0);
            ctx.fill();
            ctx.restore();

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15; 
            p.angle += p.spin;
        });
        if(isOpened) requestAnimationFrame(draw);
    }
    draw();
}

function openPhoto(imgSrc, text, title){

    const modal = document.getElementById("photo-modal");
    const img = document.getElementById("modal-img");
    const modalText = document.getElementById("modal-text");
    const modalTitle = document.getElementById("modal-title");

    img.src = imgSrc;        
    modalText.innerText = text; 
    modalTitle.innerText = title; 

    modal.style.display = "flex";
}

function openPhoto(imgSrc, text, title){

    const modal = document.getElementById("photo-modal");
    const img = document.getElementById("modal-img");
    const modalText = document.getElementById("modal-text");
    const modalTitle = document.getElementById("modal-title");

    img.src = imgSrc;
    modalText.innerText = text;
    modalText.innerHTML = text;

    modal.style.display = "flex";
}

// Preloader & Play Song
const preloader = document.getElementById('preloader');
const enterBtn = document.getElementById('enter-btn');
const bgAudio = document.getElementById('bg-audio');

enterBtn.addEventListener('click', () => {
    preloader.style.opacity = '0';
    setTimeout(() => { preloader.style.display = 'none'; }, 500);

    // Play Custom Song
    bgAudio.volume = 0.6;
    bgAudio.play();

    // Trigger Effects
    fireFireworks();
    typeText();
});

// Typing Effect
const textToType = "Eid Ul Adha Mubarak!";
const typingElement = document.getElementById('typing-text');
let textIndex = 0;

function typeText() {
    if (textIndex < textToType.length) {
        typingElement.innerHTML += textToType.charAt(textIndex);
        textIndex++;
        setTimeout(typeText, 100);
    }
}

// Fireworks Background
function fireFireworks() {
    var duration = 3000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#d4af37', '#ffffff', '#144f36'] }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#d4af37', '#ffffff', '#144f36'] }));
    }, 250);
}

// Mute/Unmute Logic
const muteBtn = document.getElementById('mute-btn');
let isMuted = false;
muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    bgAudio.muted = isMuted;
    muteBtn.innerHTML = isMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
});

// Countdown (June 17, 2024 - Eid Ul Adha)
const eidDate = new Date("June 17, 2024 00:00:00").getTime();
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = eidDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "<h2 class='arabic-font' style='color:var(--gold)'>Eid is Here! Let's Celebrate!</h2>";
        return;
    }

    document.getElementById("days").innerText = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
    document.getElementById("hours").innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    document.getElementById("mins").innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    document.getElementById("secs").innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
}, 1000);

// Particles.js (Gold Dust)
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 50 },
        "color": { "value": "#d4af37" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": false },
        "move": { "enable": true, "speed": 1, "direction": "top", "out_mode": "out" }
    },
    "interactivity": { "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" } }, "modes": { "bubble": { "distance": 200, "size": 6, "duration": 2 } } },
    "retina_detect": true
});

// Photo Gallery Slider (Swiper)
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow", grabCursor: true, centeredSlides: true, slidesPerView: "auto",
    coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
    pagination: { el: ".swiper-pagination", clickable: true },
    autoplay: { delay: 2500, disableOnInteraction: false }
});

function scrollToGallery() { document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' }); }

// Share Buttons for GitHub Pages Live Link
const shareUrl = window.location.href;
const shareText = "Celebrate Eid Ul Adha! Check out this beautiful Eid greeting website ✨🌙";
function shareWhatsApp() { window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank'); }
function shareTelegram() { window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank'); }

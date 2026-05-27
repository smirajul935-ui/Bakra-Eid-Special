// --- 1. Get Name from URL & Set Both Places ---
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('name');

const greetingName = document.getElementById('greeting-name');
const preloaderName = document.getElementById('preloader-name');

if (userName) {
    greetingName.innerHTML = `✨ ${userName} Ki Taraf Se ✨`;
    preloaderName.innerHTML = `✨ ${userName} Ki Taraf Se ✨`;
} else {
    greetingName.innerHTML = `✨ Welcome ✨`;
    preloaderName.innerHTML = `✨ Welcome ✨`;
}

// --- 2. Audio & Preloader Logic ---
const preloader = document.getElementById('preloader');
const enterBtn = document.getElementById('enter-btn');
const bgAudio = document.getElementById('bg-audio');

window.addEventListener('DOMContentLoaded', () => {
    bgAudio.volume = 0.8;
    let playPromise = bgAudio.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => { console.log("Autoplay blocked. User tap required."); });
    }
});

enterBtn.addEventListener('click', () => {
    preloader.style.opacity = '0';
    preloader.style.pointerEvents = 'none'; 
    setTimeout(() => { preloader.style.display = 'none'; }, 800);
    bgAudio.volume = 0.8;
    bgAudio.play();
});

// --- 3. VIRAL DIRECT SHARE TASK LOGIC (5 SHARES) ---
let shareCount = 0;
const totalSharesNeeded = 5;

function shareWhatsAppTask() {
    const inputName = document.getElementById('user-name-input').value.trim();
    
    // Agar user ne naam nahi likha, toh pehle naam mange
    if (inputName === "") {
        alert("Pehle apna naam likhein, phir WhatsApp par bhejein!");
        document.getElementById('user-name-input').focus();
        return;
    }

    // Naya Magic Link generate karna naam ke sath
    let baseLink = window.location.href.split('?')[0];
    let customShareLink = `${baseLink}?name=${encodeURIComponent(inputName)}`;
    
    // Turant screen par uska naam update karna
    greetingName.innerHTML = `✨ ${inputName} Ki Taraf Se ✨`;

    // 1. Open WhatsApp to share
    const shareText = "Assalamu Alaikum! Yeh dekho aapke liye ek special surprise hai 🎁🌙 Link par click karein 👇\n\n";
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + customShareLink)}`, '_blank');
    
    // 2. Increase Counter
    shareCount++;
    
    // 3. Update Progress Bar
    let progressPercentage = (shareCount / totalSharesNeeded) * 100;
    if(progressPercentage > 100) progressPercentage = 100;
    
    document.getElementById('progress-bar').style.width = progressPercentage + "%";
    document.getElementById('share-status').innerText = `${shareCount} / ${totalSharesNeeded} Shared`;

    // 4. Check Conditions & Alerts
    if (shareCount < totalSharesNeeded) {
        setTimeout(() => {
            alert(`Shabaash! Abhi ${totalSharesNeeded - shareCount} share aur baaki hain.\nJaldi se bhejein aur apna reward unlock karein!`);
        }, 1500); 
    } else {
        // Task Complete! - Naam aur Share Button chupa do, Reward dikhao
        document.getElementById('share-btn').style.display = 'none';
        document.getElementById('user-name-input').style.display = 'none';
        document.getElementById('progress-box').style.display = 'none';
        document.getElementById('share-status').innerHTML = "🌟 Mission Accomplished 🌟";
        document.getElementById('reward-section').style.display = 'block';
    }
}

// --- 4. Countdown (Target: Tomorrow Midnight) ---
const now = new Date();
const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0).getTime();

const timer = setInterval(() => {
    const currentTime = new Date().getTime();
    const distance = targetDate - currentTime;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "<h2 class='gold-text'>Eid Mubarak! Celebration Time!</h2>";
        return;
    }

    document.getElementById("hours").innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    document.getElementById("mins").innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    document.getElementById("secs").innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
}, 1000);

// --- 5. Floating Background Stars & Moons ---
const elementsContainer = document.getElementById('floating-elements');
const icons = ['fa-moon', 'fa-star', 'fa-star-and-crescent'];
const colors = ['#ffdf00', '#ffffff', '#00ffcc', '#ffaa00']; 

for (let i = 0; i < 30; i++) {
    let el = document.createElement('i');
    let randomIcon = icons[Math.floor(Math.random() * icons.length)];
    el.classList.add('fa-solid', randomIcon, 'float-item');
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (Math.random() * 15 + 10) + 'px'; 
    el.style.animationDuration = (Math.random() * 5 + 6) + 's'; 
    el.style.animationDelay = Math.random() * 5 + 's';
    elementsContainer.appendChild(el);
}

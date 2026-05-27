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

// --- 3. PREMIUM GOLDEN QUOTES SLIDER ---
const quotes = [
    "May Allah's blessings be with you today, tomorrow, and always.",
    "Let this Eid be the occasion of sharing love and caring for others.",
    "May the magic of this Eid bring lots of peace and prosperity.",
    "Har dua qubool ho, har gham door ho, Eid jaisa khoobsurat har din ho.",
    "May your plate of life be always full of joy and happiness."
];

let quoteIndex = 0;
const quoteElement = document.getElementById('quote-text');

setInterval(() => {
    // Fade Out
    quoteElement.style.opacity = 0;
    
    setTimeout(() => {
        // Change Text and Fade In
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteElement.innerText = `"${quotes[quoteIndex]}"`;
        quoteElement.style.opacity = 1;
    }, 800); // Wait for fade out to complete
    
}, 4000); // Change quote every 4 seconds


// --- 4. VIRAL DIRECT SHARE TASK LOGIC (5 SHARES) ---
let shareCount = 0;
const totalSharesNeeded = 5;

function shareWhatsAppTask() {
    const inputName = document.getElementById('user-name-input').value.trim();
    
    if (inputName === "") {
        alert("Pehle apna naam likhein, phir WhatsApp par bhejein!");
        document.getElementById('user-name-input').focus();
        return;
    }

    let baseLink = window.location.href.split('?')[0];
    let customShareLink = `${baseLink}?name=${encodeURIComponent(inputName)}`;
    
    greetingName.innerHTML = `✨ ${inputName} Ki Taraf Se ✨`;

    const shareText = "Assalamu Alaikum! Yeh dekho aapke liye ek special surprise hai 🎁🌙 Link par click karein 👇\n\n";
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + customShareLink)}`, '_blank');
    
    shareCount++;
    
    let progressPercentage = (shareCount / totalSharesNeeded) * 100;
    if(progressPercentage > 100) progressPercentage = 100;
    
    document.getElementById('progress-bar').style.width = progressPercentage + "%";
    document.getElementById('share-status').innerText = `${shareCount} / ${totalSharesNeeded} Shared`;

    if (shareCount < totalSharesNeeded) {
        setTimeout(() => {
            alert(`Shabaash! Abhi ${totalSharesNeeded - shareCount} share aur baaki hain.\nJaldi se bhejein aur apna reward unlock karein!`);
        }, 1500); 
    } else {
        document.getElementById('share-content').style.display = 'none';
        document.getElementById('reward-section').style.display = 'block';
    }
}

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

// --- 1. Get Name from URL & Set Both Places ---
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('name');
let finalShareLink = window.location.href.split('?')[0]; 

// Set name inside and outside (Start Screen)
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

// Button Click Event (Hides Screen & Plays Music)
enterBtn.addEventListener('click', () => {
    preloader.style.opacity = '0';
    preloader.style.pointerEvents = 'none'; // Stop clicks
    setTimeout(() => { preloader.style.display = 'none'; }, 800);
    bgAudio.volume = 0.8;
    bgAudio.play();
});

// --- 3. Create Custom Link ---
function createCustomLink() {
    const inputName = document.getElementById('user-name-input').value.trim();
    if (inputName === "") {
        alert("Pehle apna naam likhein!");
        return;
    }
    
    // Generate new URL with Name
    finalShareLink = `${window.location.href.split('?')[0]}?name=${encodeURIComponent(inputName)}`;
    
    // Hide input form, show WhatsApp button
    document.getElementById('share-section').style.display = 'none';
    document.getElementById('social-share').style.display = 'block';
    
    // Update Name immediately inside
    greetingName.innerHTML = `✨ ${inputName} Ki Taraf Se ✨`;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 4. WhatsApp Share ---
function shareWhatsApp() {
    const shareText = "Assalamu Alaikum! Yeh dekho aapke liye ek special surprise hai 🎁🌙 Link par click karein 👇\n\n";
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + finalShareLink)}`, '_blank');
}

// --- 5. Countdown (Target: Tomorrow Midnight) ---
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

// --- 6. Floating Background Stars & Moons ---
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

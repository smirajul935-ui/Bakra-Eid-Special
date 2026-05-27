// --- 1. Preloader & Audio Play ---
const preloader = document.getElementById('preloader');
const enterBtn = document.getElementById('enter-btn');
const bgAudio = document.getElementById('bg-audio');

enterBtn.addEventListener('click', () => {
    preloader.style.opacity = '0';
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
    
    // Play audio
    bgAudio.volume = 0.8;
    bgAudio.play();
});

// --- 2. Dynamic Name from URL ---
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('name');
let finalShareLink = window.location.href.split('?')[0]; // Default link

if (userName) {
    // Agar URL me naam hai, toh display karo
    document.getElementById('greeting-name').innerHTML = `✨ ${userName} ki taraf se ✨`;
    // Share section badal do
    document.getElementById('share-section').innerHTML = `<p class="gold-text">Aap bhi apna naam likh kar bhejein 👇</p>
    <button onclick="window.location.href='${finalShareLink}'" class="premium-btn">Create Your Own</button>`;
} else {
    // Agar naam nahi hai toh welcome likho
    document.getElementById('greeting-name').innerHTML = `✨ Welcome ✨`;
}

// --- 3. Create Custom Link & Show Share Buttons ---
function createCustomLink() {
    const inputName = document.getElementById('user-name-input').value.trim();
    if (inputName === "") {
        alert("Pehle apna naam likhein!");
        return;
    }
    
    // Generate new URL
    finalShareLink = `${window.location.href.split('?')[0]}?name=${encodeURIComponent(inputName)}`;
    
    // Show Share Options
    document.getElementById('share-section').style.display = 'none';
    document.getElementById('social-share').style.display = 'block';
    
    // Update Greeting text live
    document.getElementById('greeting-name').innerHTML = `✨ ${inputName} ki taraf se ✨`;
}

// --- 4. Share Functions ---
const shareText = "Assalamu Alaikum! Yeh dekho aapke liye ek special surprise hai 🎁🌙 Link par click karein 👇\n\n";

function shareWhatsApp() {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + finalShareLink)}`, '_blank');
}

function shareTelegram() {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(finalShareLink)}&text=${encodeURIComponent(shareText)}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(finalShareLink).then(() => {
        alert("Link copied! Ab aap isse kisi ko bhi bhej sakte hain.");
    });
}

// --- 5. Countdown Timer (Target: Tomorrow Midnight) ---
// Note: Yeh code automatic hamesha kal ke liye set ho jayega (Kal Eid Hai concept)
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

// --- 6. Generate Colorful Moons & Stars (Background Magic) ---
const elementsContainer = document.getElementById('floating-elements');
const icons = ['fa-moon', 'fa-star', 'fa-star-and-crescent'];
const colors = ['#ffdf00', '#ffffff', '#00ffcc', '#ff66b2', '#66ccff']; // Gold, White, Cyan, Pink, Light Blue

for (let i = 0; i < 40; i++) {
    let el = document.createElement('i');
    
    // Random Icon selection
    let randomIcon = icons[Math.floor(Math.random() * icons.length)];
    el.classList.add('fa-solid', randomIcon, 'float-item');
    
    // Random Styling
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (Math.random() * 20 + 10) + 'px'; // 10px to 30px
    el.style.animationDuration = (Math.random() * 5 + 5) + 's'; // 5s to 10s
    el.style.animationDelay = Math.random() * 5 + 's';
    
    elementsContainer.appendChild(el);
}

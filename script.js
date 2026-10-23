/* PERSONALISE THIS FILE: the birthday messages live in index.html.
   Add your own song as birthday-song.mp3 beside index.html and keep the filename. */
document.addEventListener('DOMContentLoaded', () => {
  const pages = Array.from(document.querySelectorAll('.page'));
  let currentPage = 'home';

  function showPage(id) {
    const target = document.getElementById(id);
    if (!target) return;
    pages.forEach(page => {
      const active = page.id === id;
      page.hidden = !active;
      page.classList.toggle('active', active);
    });
    currentPage = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Try to start music after a page-button gesture. Browsers may require a first click.
    tryStartMusic();
  }
  document.querySelectorAll('.next-button').forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.next)));
  document.querySelectorAll('.prev-button').forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.prev)));

  const music = document.getElementById('birthdayMusic');
  const musicButton = document.getElementById('musicToggle');
  let userPaused = false;
  async function tryStartMusic() {
    if (!music || userPaused) return;
    try {
      await music.play();
      if (musicButton) {
        musicButton.setAttribute('aria-pressed', 'true');
        musicButton.innerHTML = '♫ <span>Music on</span>';
      }
    } catch (err) {
      // Autoplay with sound is commonly blocked until a user gesture. Button remains available.
      if (musicButton) {
        musicButton.setAttribute('aria-pressed', 'false');
        musicButton.innerHTML = '♫ <span>Tap for music</span>';
      }
    }
  }
  if (musicButton && music) {
    musicButton.addEventListener('click', async () => {
      if (music.paused) {
        userPaused = false;
        await tryStartMusic();
      } else {
        music.pause();
        userPaused = true;
        musicButton.setAttribute('aria-pressed', 'false');
        musicButton.innerHTML = '♫ <span>Music paused</span>';
      }
    });
    // Best effort autoplay. Sound autoplay may be blocked by the browser.
    tryStartMusic();
  }

  function confetti(count = 90) {
    const colors = ['#f28db6', '#d7b7ff', '#ffd879', '#a9dff3', '#b6e7d0', '#ffb4a2'];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('i');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2.4 + Math.random() * 2.6) + 's';
      piece.style.animationDelay = (Math.random() * 0.45) + 's';
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(piece);
      window.setTimeout(() => piece.remove(), 5600);
    }
  }

  const messagePanel = document.getElementById('messagePanel');
  const messageText = document.getElementById('messageText');
  const noteCards = Array.from(document.querySelectorAll('.note-card'));
  noteCards.forEach(card => card.addEventListener('click', () => {
    messageText.textContent = card.dataset.message;
    messagePanel.hidden = false;
    messagePanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    confetti(20);
  }));
  const closeMessage = document.getElementById('closeMessage');
  if (closeMessage) closeMessage.addEventListener('click', () => messagePanel.hidden = true);

  const giftResult = document.getElementById('giftResult');
  const giftTitle = document.getElementById('giftTitle');
  const giftMessage = document.getElementById('giftMessage');
  document.querySelectorAll('.gift-box').forEach(box => box.addEventListener('click', () => {
    const [title, message] = box.dataset.gift.split('|');
    giftTitle.textContent = title;
    giftMessage.textContent = message;
    giftResult.hidden = false;
    giftResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    confetti(38);
  }));
  const closeGift = document.getElementById('closeGift');
  if (closeGift) closeGift.addEventListener('click', () => giftResult.hidden = true);

  const openLetter = document.getElementById('openLetter');
  const letterContent = document.getElementById('letterContent');
  if (openLetter && letterContent) openLetter.addEventListener('click', () => {
    const open = letterContent.hidden;
    letterContent.hidden = !open;
    openLetter.setAttribute('aria-expanded', String(open));
    openLetter.querySelector('.envelope-label').textContent = open ? 'Your letter is open ♡' : 'For Joanna, with love';
    openLetter.querySelector('small').textContent = open ? 'tap to close' : 'tap to open';
    if (open) {
      confetti(60);
      letterContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  const finalConfetti = document.getElementById('finalConfetti');
  if (finalConfetti) finalConfetti.addEventListener('click', () => confetti(100));
  const finishButton = document.getElementById('finishButton');
  const endNote = document.getElementById('endNote');
  if (finishButton) finishButton.addEventListener('click', () => {
    endNote.hidden = false;
    endNote.scrollIntoView({ behavior: 'smooth', block: 'center' });
    confetti(120);
  });
});
const magicButton = document.getElementById("finalConfetti");
const magicSurprise = document.getElementById("magicSurprise");
const magicSong = document.getElementById("magicSong");

magicButton.addEventListener("click", async () => {
  // Reveal the special banner
  magicSurprise.hidden = false;

  // Change the button text after the surprise is revealed
  magicButton.textContent = "Your little surprise is here 💗";
birthdayMusic.pause();
  // Start the separate surprise song
  try {
    await magicSong.play();
  } catch (error) {
    // The audio controls remain available if playback fails
    console.log("Use the play button to start the surprise song.");
  }

  // Bring the banner into view
  magicSurprise.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});
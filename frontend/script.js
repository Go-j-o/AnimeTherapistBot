
// SPA state
const CHARACTERS = {
  Aoi: {
    name: 'Aoi',
    role: 'The Gentle Mentor',
    desc: 'Calm, warm, nurturing.Best for: Sad, lost, anxious days.',
    avatar: '<img src="aoi-portrait.png" class="character-face" alt="Aoi">',
    colorClass: 'aoi-card',
  },
  Riku: {
    name: 'Riku',
    role: 'The Blunt Motivator',
    desc: 'Direct, strong, passionate. Motivates like a big brother. Best for: Needing a push.',
    avatar: '<img src="riku-portrait.jpg" class="character-face" alt="Riku">',
    colorClass: 'riku-card',
  },
  Kuro: {
    name: 'Kuro',
    role: 'The Mysterious Philosopher',
    desc: 'Abstract, poetic, deep. Speaks in riddles. Best for: Deep thoughts.',
    avatar: '<img src="kuro.jpg" class="character-face" alt="Kuro">',
    colorClass: 'kuro-card',
  },
  Yumi: {
    name: 'Yumi',
    role: 'The Cheerful Bestie',
    desc: 'Energetic, playful, optimistic. Best for: Needing a friend.',
    avatar: '<img src="yumi.jpg" class="character-face" alt="Yumi">',
    colorClass: 'yumi-card',
  },
  Sora: {
    name: 'Sora',
    role: 'The Flirty Healer',
    desc: 'Charming, soft, playful. Best for: Needing comfort.',
    avatar: '<img src="sora.jpg" class="character-face" alt="Sora">',
    colorClass: 'sora-card',
  },
};

let selectedCharacter = null;
let chatHistory = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  renderCharacterCards();
  
  // Set up chat form submission
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    sendMessage();
  });
  
  sendBtn.addEventListener('click', function(e) {
    e.preventDefault();
    sendMessage();
  });
  
  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });
});

function renderCharacterCards() {
  const row = document.getElementById('character-select');
  row.innerHTML = '';
  Object.values(CHARACTERS).forEach(char => {
    const card = document.createElement('div');
    card.className = `character-card ${char.colorClass}`;
    card.onclick = () => selectCharacter(char.name);
    card.innerHTML = `
      <div class="chibi-avatar">${char.avatar}</div>
      <div class="character-name">${char.name}</div>
      <div class="character-desc">${char.role}</div>
      <div style="font-size:0.95rem;color:#888;margin-top:8px;">${char.desc}</div>
    `;
    row.appendChild(card);
  });
}

function selectCharacter(name) {
  selectedCharacter = CHARACTERS[name];
  chatHistory = [];
  document.getElementById('character-select').style.display = 'none';
  const chatSection = document.getElementById('chat-section');
  chatSection.style.display = 'block';
  
  // Add Aoi theme to body
  if (name === 'Aoi') {
    document.body.classList.add('aoi-theme');
  } else {
    document.body.classList.remove('aoi-theme');
  }
  
  document.querySelector('.anime-title').textContent = `${selectedCharacter.name} - ${selectedCharacter.role}`;
  document.getElementById('chat-avatar').innerHTML = selectedCharacter.avatar;
  document.getElementById('chat-name').textContent = selectedCharacter.name;
  document.getElementById('chat-role').textContent = selectedCharacter.role;
  document.getElementById('chat-box').innerHTML = '';
}

function goHome() {
  const chatSection = document.getElementById('chat-section');
  chatSection.style.display = 'none';
  document.body.classList.remove('aoi-theme');
  document.getElementById('character-select').style.display = 'grid';
  document.querySelector('.anime-title').textContent = 'Choose Your Anime Themed Therapist';
  selectedCharacter = null;
  chatHistory = [];
}

function displayMessage(sender, text) {
  const chatBox = document.getElementById('chat-box');
  const bubble = document.createElement('div');
  const isUser = sender === 'You';
  bubble.className = 'bubble' + (isUser ? ' user' : '');
  let avatar = isUser ? '🧑' : (selectedCharacter ? selectedCharacter.avatar : '🤖');
  bubble.innerHTML = `
    <span class="avatar" style="vertical-align:middle;">${avatar}</span>
    <span class="msg"><strong>${sender}:</strong> ${text}</span>
  `;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const userInput = document.getElementById('user-input');
  const message = userInput.value.trim();
  
  if (!message || !selectedCharacter) return;
  
  // Display user message
  displayMessage('You', message);
  userInput.value = '';
  
  // Show typing indicator
  displayMessage(selectedCharacter.name, '...');
  
  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        personality: selectedCharacter.name
      })
    });
    
    const data = await response.json();
    
    // Remove typing indicator
    const chatBox = document.getElementById('chat-box');
    chatBox.removeChild(chatBox.lastChild);
    
    if (data.error) {
      displayMessage('System', `Error: ${data.error}`);
    } else {
      displayMessage(selectedCharacter.name, data.reply);
    }
  } catch (error) {
    // Remove typing indicator
    const chatBox = document.getElementById('chat-box');
    chatBox.removeChild(chatBox.lastChild);
    displayMessage('System', `Connection error: ${error.message}`);
  }
}

function toggleMode() {
  document.body.classList.toggle('dark-mode');
  const toggle = document.getElementById('mode-toggle');
  toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

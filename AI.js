// ============================================
// 🔑 APNI API KEYS YAHAN DAALO
// ============================================

// Groq API Key (Fast text chat)
// Get from: https://console.groq.com
const GROQ_API_KEY = "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";

// Cloudflare API Key (For PDF + Image)
// Get from: https://dash.cloudflare.com
const CLOUDFLARE_API_KEY = "cfut_aoQc40DXxYzrXB9k0zSBw2GBXf6K9LqZScueIIxXb849995a";
const CLOUDFLARE_ACCOUNT_ID = "12437f7b8ca8e7b0a93996935fac4fc0";

// ============================================
// GLOBAL VARIABLES
// ============================================
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const fileUpload = document.getElementById('fileUpload');
const fileName = document.getElementById('fileName');
let currentFile = null;
let chatHistory = [];

// Track selected file
fileUpload.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        currentFile = e.target.files[0];
        fileName.textContent = `📎 ${currentFile.name}`;
    } else {
        currentFile = null;
        fileName.textContent = '';
    }
});

// ============================================
// MAIN FUNCTION
// ============================================
async function sendMessage() {
    const text = userInput.value.trim();

    if (!text && !currentFile) return;

    // Show user message
    if (text) {
        addMessage(text, 'user');
        chatHistory.push({ role: 'user', content: text });
    }
    if (currentFile) {
        addMessage(`📎 Uploaded: ${currentFile.name}`, 'user');
    }

    userInput.value = '';
    sendBtn.disabled = true;
    autoResizeTextarea();

    // Show typing indicator
    const typingId = showTypingIndicator();

    try {
        let response;

        // Check for YouTube link
        const youtubeUrl = extractYoutubeUrl(text);
        if (youtubeUrl) {
            response = await handleYoutubeVideo(youtubeUrl);
        }
        // Check for file upload
        else if (currentFile) {
            if (currentFile.type === 'application/pdf') {
                response = await analyzePDF(currentFile);
            } else if (currentFile.type.startsWith('image/')) {
                response = await analyzeImage(currentFile);
            } else {
                response = "❌ Unsupported file type. Please upload PDF or image.";
            }
            currentFile = null;
            fileName.textContent = '';
            fileUpload.value = '';
        }
        // Normal text chat
        else {
            response = await chatWithGroq(text);
        }

        removeTypingIndicator(typingId);
        addMessage(response, 'ai');
        chatHistory.push({ role: 'ai', content: response });
        saveChatHistory();

    } catch (error) {
        removeTypingIndicator(typingId);
        addMessage(`❌ Error: ${error.message}. Please check API keys.`, 'ai');
    } finally {
        sendBtn.disabled = false;
        userInput.focus();
    }
}

// ============================================
// GROQ API
// ============================================
async function chatWithGroq(message) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are SkillSprint AI, a helpful assistant. Be concise, friendly, and informative. Help with coding, UI/UX, design, and general questions."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.7
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

// ============================================
// CLOUDFLARE AI - PDF ANALYSIS
// ============================================
async function analyzePDF(file) {
    const base64 = await fileToBase64(file);

    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${CLOUDFLARE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: [
                {
                    role: "system",
                    content: "Analyze this PDF content. Provide a summary, key points, and main topics."
                },
                {
                    role: "user",
                    content: `Analyze this document. Please summarize and list key information.`
                }
            ]
        })
    });

    const data = await response.json();
    return `📄 **PDF Analysis:**\n\n${data.result?.response || "Could not analyze PDF properly."}`;
}

// ============================================
// CLOUDFLARE AI - IMAGE ANALYSIS
// ============================================
async function analyzeImage(file) {
    const base64 = await fileToBase64(file);

    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/llava-hf/llava-1.5-7b-hf`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${CLOUDFLARE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: "Describe this image in detail. What do you see?",
            image: base64.split(',')[1]
        })
    });

    const data = await response.json();
    return `🖼️ **Image Analysis:**\n\n${data.result?.description || "Could not analyze image."}`;
}

// ============================================
// YOUTUBE VIDEO ANALYSIS
// ============================================
async function handleYoutubeVideo(url) {
    const videoId = extractYoutubeId(url);
    if (!videoId) {
        return "❌ Invalid YouTube URL. Please check and try again.";
    }

    const transcriptUrl = `https://pipedapi.kavin.rocks/transcripts/${videoId}`;

    try {
        const transcriptRes = await fetch(transcriptUrl);
        const transcriptData = await transcriptRes.json();

        if (transcriptData.transcripts && transcriptData.transcripts.length > 0) {
            const transcript = transcriptData.transcripts[0].content;
            const analysis = await chatWithGroq(`Summarize this YouTube video transcript in 5-7 key points:\n\n${transcript.substring(0, 3000)}`);
            return `🎥 **YouTube Video Summary:**\n\n${analysis}\n\n🔗 Video URL: ${url}`;
        } else {
            return "❌ Could not fetch transcript. The video might have captions disabled.";
        }
    } catch (error) {
        return "❌ Unable to fetch video transcript. Make sure the video has captions available.";
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function extractYoutubeUrl(text) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
    ];
    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return match[0];
    }
    return null;
}

function extractYoutubeId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${sender === 'user' ? 'fa-user' : 'fa-robot'}"></i>
        </div>
        <div class="message-bubble">${formatText(text)}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatText(text) {
    return text.replace(/\n/g, '<br>');
}

function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message';
    typingDiv.id = id;
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-bubble">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) element.remove();
}

function setSuggestion(text) {
    userInput.value = text;
    autoResizeTextarea();
    sendMessage();
}

function autoResizeTextarea() {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
}

function saveChatHistory() {
    localStorage.setItem('ruixen_chat_history', JSON.stringify(chatHistory));
}

function loadChatHistory() {
    const saved = localStorage.getItem('ruixen_chat_history');
    if (saved) {
        chatHistory = JSON.parse(saved);
        chatMessages.innerHTML = '';
        chatHistory.forEach(msg => {
            addMessage(msg.content, msg.role);
        });
    }
}

function clearChat() {
    if (confirm('Clear all chat messages?')) {
        chatMessages.innerHTML = '';
        chatHistory = [];
        localStorage.removeItem('ruixen_chat_history');
        // Add welcome message
        addMessage("Hello! I'm SkillSprint AI. How can I help you today?", 'ai');
        chatHistory.push({ role: 'ai', content: "Hello! I'm SkillSprint AI. How can I help you today?" });
        saveChatHistory();
    }
}

function toggleChatHistory() {
    const modal = document.getElementById('historyModal');
    const historyList = document.getElementById('historyList');

    if (chatHistory.length === 0) {
        historyList.innerHTML = '<p>No history yet. Start a conversation!</p>';
    } else {
        historyList.innerHTML = chatHistory.slice().reverse().map(msg => `
            <div class="history-item" onclick="loadHistoryMessage('${escapeHtml(msg.content)}')">
                <strong>${msg.role === 'user' ? '👤 You' : '🤖 AI'}:</strong>
                <span>${msg.content.substring(0, 80)}${msg.content.length > 80 ? '...' : ''}</span>
            </div>
        `).join('');
    }

    modal.classList.add('show');
}

function closeHistoryModal() {
    document.getElementById('historyModal').classList.remove('show');
}

function loadHistoryMessage(content) {
    userInput.value = content;
    autoResizeTextarea();
    closeHistoryModal();
    sendMessage();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Enter key to send
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

userInput.addEventListener('input', autoResizeTextarea);

// Load saved history on start
loadChatHistory();

// Replace "SkillSprint AI" with "SkillSprint" everywhere
function replaceRuixenWithSkillSprint() {
    // Change page title
    document.title = document.title.replace(/SkillSprint AI/g, 'SkillSprint AI');

    // Change all text content in the page
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function (node) {
                if (node.parentElement?.tagName === 'SCRIPT') return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const nodesToUpdate = [];
    while (walker.nextNode()) {
        if (walker.currentNode.textContent.includes('SkillSprint AI')) {
            nodesToUpdate.push(walker.currentNode);
        }
    }

    nodesToUpdate.forEach(node => {
        node.textContent = node.textContent.replace(/SkillSprint AI/g, 'SkillSprint AI');
    });
}

// Run it when page loads
setTimeout(replaceRuixenWithSkillSprint, 100);
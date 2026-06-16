// ========== TEACHER PORTAL - COMPLETE JS ==========
console.log("🚀 Teacher Portal Loading...");

// ========== DATA ==========
let currentTeacher = {
    id: 1, name: "Dr. Anil Sharma", email: "teacher@skillsprint.com",
    expertise: "Web Development", experience: "12 years", firstLetter: "A",
    bio: "Experienced Web Development teacher passionate about teaching."
};

let studentsList = [
    { id: 1, name: "Aarav Sharma", email: "aarav@student.com", xp: 4500, firstLetter: "A" },
    { id: 2, name: "Vihaan Kumar", email: "vihaan@student.com", xp: 3800, firstLetter: "V" },
    { id: 3, name: "Ananya Singh", email: "ananya@student.com", xp: 5200, firstLetter: "A" },
    { id: 4, name: "Diya Mehta", email: "diya@student.com", xp: 3100, firstLetter: "D" },
    { id: 5, name: "Advik Reddy", email: "advik@student.com", xp: 2900, firstLetter: "A" }
];

let allClasses = [
    { id: 1, name: "Web Development Bootcamp", schedule: "Mon/Wed 10AM", students: 12, room: "Lab 101" },
    { id: 2, name: "React Complete Guide", schedule: "Tue/Thu 11AM", students: 8, room: "Room 205" },
    { id: 3, name: "Node.js Backend", schedule: "Fri 2PM", students: 6, room: "Online" }
];

let materials = [
    { id: 1, className: "Web Development", title: "HTML/CSS Basics", type: "PDF", size: "2.4 MB", date: "2024-03-01" },
    { id: 2, className: "Web Development", title: "JavaScript Fundamentals", type: "Video", size: "45 MB", date: "2024-03-05" }
];

let announcements = [
    { id: 1, title: "Exam Schedule", content: "Mid-term exams from next Monday.", date: "2024-03-10" },
    { id: 2, title: "Holiday Notice", content: "School closed on Friday.", date: "2024-03-08" }
];

let teacherFeeds = [
    { id: 1, userName: "Dr. Anil Sharma", userFirstLetter: "A", content: "New study materials uploaded!", time: new Date().toISOString() },
    { id: 2, userName: "Aarav Sharma", userFirstLetter: "A", content: "Completed my project! 🎉", time: new Date().toISOString() }
];

let chatMessages = [];
let currentChatUser = null;

// ========== RENDER FUNCTIONS ==========
function renderDashboard() {
    let container = document.getElementById('dashboardContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card"><div class="stat-number">${allClasses.length}</div><div>My Classes</div></div>
            <div class="stat-card"><div class="stat-number">${studentsList.length}</div><div>Students</div></div>
            <div class="stat-card"><div class="stat-number">${materials.length}</div><div>Materials</div></div>
            <div class="stat-card"><div class="stat-number">${chatMessages.length}</div><div>Messages</div></div>
        </div>
        <div class="course-card">
            <h3>📊 Welcome, ${currentTeacher.name}!</h3>
            <p>🎓 ${currentTeacher.expertise} | 📅 ${currentTeacher.experience}</p>
            <p>📚 Teaching ${allClasses.length} classes with ${studentsList.length} students.</p>
        </div>
    `;
}

function renderClasses() {
    let container = document.getElementById('classesContainer');
    if (!container) return;
    let html = '';
    for (let c of allClasses) {
        html += `
            <div class="course-card">
                <h3>📚 ${c.name}</h3>
                <p>🕒 ${c.schedule} | 📍 ${c.room}</p>
                <p>👥 ${c.students} Students</p>
                <div style="display:flex;gap:10px;margin-top:10px;">
                    <button onclick="takeAttendance(${c.id}, '${c.name}')" style="background:#2196f3;border:none;padding:8px 16px;border-radius:8px;color:white;cursor:pointer;">✅ Take Attendance</button>
                    <button onclick="viewAttendanceReport(${c.id}, '${c.name}')" style="background:#4caf50;border:none;padding:8px 16px;border-radius:8px;color:white;cursor:pointer;">📊 View Report</button>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

function renderStudents() {
    let container = document.getElementById('studentsContainer');
    if (!container) return;
    let html = '';
    for (let s of studentsList) {
        html += `<div class="course-card flex-between"><div><h3>${s.name}</h3><p>📧 ${s.email} | ⭐ ${s.xp} XP</p></div><button class="btn-primary" onclick="startChat(${s.id}, '${s.name}')">💬 Message</button></div>`;
    }
    container.innerHTML = html;
}

function renderMaterials() {
    let container = document.getElementById('materialsContainer');
    if (!container) return;
    let html = '';
    for (let m of materials) {
        html += `<div class="course-card"><h3>📄 ${m.title}</h3><p>📚 ${m.className} | ${m.type} | ${m.size}</p><small>📅 ${m.date}</small></div>`;
    }
    container.innerHTML = html;
}

function renderAnnouncements() {
    let container = document.getElementById('announcementsContainer');
    if (!container) return;
    let html = `<div class="course-card"><div class="flex-between"><input type="text" id="annTitle" placeholder="Title"><textarea id="annContent" rows="2" placeholder="Content"></textarea><button class="btn-primary" onclick="createAnnouncement()">Post</button></div></div>`;
    for (let a of announcements) {
        html += `<div class="course-card"><h3>📢 ${a.title}</h3><p>${a.content}</p><small>${a.date}</small></div>`;
    }
    container.innerHTML = html;
}

function createAnnouncement() {
    let title = document.getElementById('annTitle')?.value;
    let content = document.getElementById('annContent')?.value;
    if (!title || !content) return alert("Fill both fields!");
    announcements.unshift({ id: Date.now(), title, content, date: new Date().toISOString().split('T')[0] });
    renderAnnouncements();
    alert("✅ Posted!");
}

function renderFeed() {
    let container = document.getElementById('feedContainer');
    if (!container) return;
    let html = `<div class="course-card"><div class="flex-between"><input type="text" id="postInput" placeholder="Share an update..."><button class="btn-primary" onclick="addPost()">Post</button></div></div>`;
    for (let p of teacherFeeds) {
        html += `<div class="course-card"><div class="flex-between"><div class="avatar" style="width:40px;height:40px;">${p.userFirstLetter}</div><div style="flex:1"><b>${p.userName}</b><p>${p.content}</p><small>${new Date(p.time).toLocaleString()}</small></div></div></div>`;
    }
    container.innerHTML = html;
}

function addPost() {
    let content = document.getElementById('postInput')?.value;
    if (!content) return alert("Write something!");
    teacherFeeds.unshift({ id: Date.now(), userName: currentTeacher.name, userFirstLetter: currentTeacher.firstLetter, content, time: new Date().toISOString() });
    renderFeed();
    document.getElementById('postInput').value = '';
    alert("✅ Posted!");
}

function renderChat() {
    let container = document.getElementById('chatContainer');
    if (!container) return;
    let html = `<div class="chat-container"><div class="chat-users"><h4 style="padding:10px">Students</h4>${studentsList.map(s => `<div class="chat-user ${currentChatUser?.id === s.id ? 'active' : ''}" onclick="selectChat(${s.id}, '${s.name}')">💬 ${s.name}</div>`).join('')}</div><div class="chat-area"><div class="chat-header" id="chatHeader">${currentChatUser ? `Chat with ${currentChatUser.name}` : "Select a student"}</div><div class="chat-messages" id="chatMessagesList">${getChatMessagesHtml()}</div><div class="chat-input"><input type="text" id="chatInput" placeholder="Type message..."><button class="btn-primary" onclick="sendMessage()">Send</button></div></div></div>`;
    container.innerHTML = html;
}

function getChatMessagesHtml() {
    if (!currentChatUser) return '<div style="text-align:center;padding:20px;">Select a student</div>';
    let msgs = chatMessages.filter(m => m.studentId === currentChatUser.id);
    return msgs.map(m => `<div class="message ${m.fromTeacher ? 'sent' : 'received'}">${m.text}<br><small>${new Date(m.time).toLocaleTimeString()}</small></div>`).join('');
}

function selectChat(studentId, studentName) {
    currentChatUser = { id: studentId, name: studentName };
    renderChat();
}

function sendMessage() {
    let input = document.getElementById('chatInput');
    let text = input?.value.trim();
    if (!text || !currentChatUser) return;
    chatMessages.push({ studentId: currentChatUser.id, text, fromTeacher: true, time: new Date() });
    input.value = '';
    renderChat();
}

function startChat(id, name) {
    selectChat(id, name);
    showPanel('chat');
}

function renderLeaderboard() {
    let container = document.getElementById('leaderboardContainer');
    if (!container) return;
    let sorted = [...studentsList].sort((a, b) => b.xp - a.xp);
    let html = '';
    for (let i = 0; i < sorted.length; i++) {
        html += `<div class="course-card"><div class="flex-between"><div style="font-size:24px;font-weight:bold;">#${i + 1}</div><div><b>${sorted[i].name}</b><br>⭐ ${sorted[i].xp} XP</div></div></div>`;
    }
    container.innerHTML = html;
}

function renderProfile() {
    let container = document.getElementById('profileContainer');
    if (!container) return;
    container.innerHTML = `<div class="course-card" style="text-align:center;"><div style="width:80px;height:80px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 15px;">${currentTeacher.firstLetter}</div><h2>${currentTeacher.name}</h2><p>📧 ${currentTeacher.email}</p><p>🎓 ${currentTeacher.expertise}</p><p>📅 ${currentTeacher.experience}</p><p>${currentTeacher.bio}</p></div>`;
}

function renderAIAssistant() {
    let container = document.getElementById('aiAssistantContainer');
    if (!container) return;
    container.innerHTML = `<div class="course-card"><h2>🤖 AI Assistant</h2><div style="height:400px;overflow-y:auto;margin-bottom:15px;padding:15px;background:#1a1a1a;border-radius:15px;" id="aiMessages"><div class="ai-msg">🤖 Hello! I'm your AI teaching assistant. Ask me anything!</div></div><div class="flex-between"><input type="text" id="aiInput" placeholder="Ask something..."><button class="btn-primary" onclick="sendAIMessage()">Send</button><button class="btn-primary" onclick="clearAIChat()" style="background:#555;">Clear</button></div></div>`;
}

async function sendAIMessage() {
    let input = document.getElementById('aiInput');
    let text = input?.value.trim();
    if (!text) return;
    let container = document.getElementById('aiMessages');
    container.innerHTML += `<div class="user-msg">🧑 ${text}</div>`;
    input.value = '';
    let typing = document.createElement('div'); typing.className = 'typing-indicator'; typing.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(typing); container.scrollTop = container.scrollHeight;
    setTimeout(() => {
        typing.remove();
        let responses = { lesson: "Start with objectives, then activities, then assessment.", grade: "Use rubrics with clear criteria.", engage: "Try polls, group work, and real examples.", default: "Great question! I'm here to help with teaching." };
        let reply = responses.lesson;
        if (text.includes('grade')) reply = responses.grade;
        else if (text.includes('engage')) reply = responses.engage;
        else if (!text.includes('lesson')) reply = responses.default;
        container.innerHTML += `<div class="ai-msg">🤖 ${reply}</div>`;
        container.scrollTop = container.scrollHeight;
    }, 800);
}

function clearAIChat() {
    let container = document.getElementById('aiMessages');
    if (container) container.innerHTML = `<div class="ai-msg">🤖 Hello! I'm your AI teaching assistant. Ask me anything!</div>`;
}

// ========== NAVIGATION ==========
function showPanel(panelName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    let panel = document.getElementById(`${panelName}Page`);
    if (panel) panel.classList.add('active-page');
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.querySelectorAll(`.nav-item[data-page="${panelName}"]`).forEach(nav => nav.classList.add('active'));
    if (panelName === 'dashboard') renderDashboard();
    if (panelName === 'classes') renderClasses();
    if (panelName === 'students') renderStudents();
    if (panelName === 'materials') renderMaterials();
    if (panelName === 'announcements') renderAnnouncements();
    if (panelName === 'feed') renderFeed();
    if (panelName === 'chat') renderChat();
    if (panelName === 'leaderboard') renderLeaderboard();
    if (panelName === 'profile') renderProfile();
    if (panelName === 'aiassistant') renderAIAssistant();
}

// ========== INIT ==========
function init() {
    document.getElementById('navName').innerText = currentTeacher.name;
    document.getElementById('navAvatar').innerText = currentTeacher.firstLetter;
    renderDashboard();
    // Navigation clicks
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.addEventListener('click', () => showPanel(nav.getAttribute('data-page')));
    });
    // Settings modal
    document.getElementById('settingsBtn').onclick = () => document.getElementById('settingsModal').style.display = 'flex';
    document.getElementById('closeSettings').onclick = () => document.getElementById('settingsModal').style.display = 'none';
    document.getElementById('darkModeSetting').onchange = (e) => {
        document.body.style.background = e.target.checked ? '#1a1a1a' : '#0a0a0a';
        localStorage.setItem('darkMode', e.target.checked);
    };
    console.log("✅ Teacher Portal Ready!");
}

window.showPanel = showPanel;
window.createAnnouncement = createAnnouncement;
window.addPost = addPost;
window.selectChat = selectChat;
window.sendMessage = sendMessage;
window.startChat = startChat;
window.sendAIMessage = sendAIMessage;
window.clearAIChat = clearAIChat;

init();


// ========== FAKE POSTS ADD KARNE KA CODE ==========

// Yeh function 10 fake posts add karega feed mein
function addFakePosts() {
    let fakePosts = [
        { name: "Dr. Anil Sharma", letter: "A", content: "📢 New assignment uploaded for Web Development students! Deadline: Friday", time: "2 hours ago" },
        { name: "Prof. Meera Gupta", letter: "M", content: "🎉 Congratulations to all students who scored above 90% in Python test!", time: "5 hours ago" },
        { name: "Aarav Sharma", letter: "A", content: "🚀 Just completed my React project! Feeling proud 😊", time: "1 day ago" },
        { name: "Ananya Singh", letter: "A", content: "💡 Can anyone explain useState hook in React? Need help!", time: "1 day ago" },
        { name: "Dr. Rajesh Kumar", letter: "R", content: "📚 New study materials for DSA course uploaded in Materials section", time: "2 days ago" },
        { name: "Vihaan Kumar", letter: "V", content: "🔥 Finally understood JavaScript closures! Thanks SkillSprint!", time: "2 days ago" },
        { name: "Prof. Sunita Verma", letter: "S", content: "🏆 Leaderboard updated! Check your rankings", time: "3 days ago" },
        { name: "Diya Mehta", letter: "D", content: "📝 Tips for coding interviews? My first interview next week!", time: "3 days ago" },
        { name: "Dr. Vikram Singh", letter: "V", content: "🎯 Weekend hackathon registration open! Join now", time: "4 days ago" },
        { name: "Advik Reddy", letter: "A", content: "✅ Completed HTML/CSS module! Moving to JavaScript", time: "4 days ago" },
        { name: "Prof. Pooja Reddy", letter: "P", content: "📢 Reminder: Parent-Teacher meeting on Saturday", time: "5 days ago" },
        { name: "Ishaan Gupta", letter: "I", content: "💻 My first portfolio website is live! Check it out", time: "5 days ago" },
        { name: "Dr. Alok Yadav", letter: "A", content: "🎓 Scholarship applications are now open for meritorious students", time: "6 days ago" },
        { name: "Myra Nair", letter: "M", content: "📖 Loving the Data Science course! Highly recommend", time: "6 days ago" },
        { name: "Prof. Kavita Jha", letter: "K", content: "🌟 Student of the Month: Aarav Sharma! Keep it up", time: "1 week ago" }
    ];

    for (let i = 0; i < fakePosts.length; i++) {
        let p = fakePosts[i];
        teacherFeeds.unshift({
            id: Date.now() + i,
            userName: p.name,
            userFirstLetter: p.letter,
            content: p.content,
            time: new Date(Date.now() - i * 2 * 60 * 60 * 1000).toISOString(),
            likes: Math.floor(Math.random() * 50),
            comments: []
        });
    }
    renderFeed();
    console.log("✅ " + fakePosts.length + " fake posts added to feed!");
}

// Yeh function sirf 5 fake posts add karega
function add5FakePosts() {
    let fakePosts = [
        { name: "Dr. Anil Sharma", letter: "A", content: "📢 Kal test hai, sab prepare ho jao!" },
        { name: "Aarav Sharma", letter: "A", content: "🎉 Mera project approve ho gaya!" },
        { name: "Ananya Singh", letter: "A", content: "💡 Kisi ko JavaScript mein help chahiye?" },
        { name: "Prof. Meera Gupta", letter: "M", content: "📚 New video lectures uploaded!" },
        { name: "Vihaan Kumar", letter: "V", content: "🔥 Placement preparation group join karo!" }
    ];

    for (let i = 0; i < fakePosts.length; i++) {
        let p = fakePosts[i];
        teacherFeeds.unshift({
            id: Date.now() + i,
            userName: p.name,
            userFirstLetter: p.letter,
            content: p.content,
            time: new Date().toISOString(),
            likes: 0,
            comments: []
        });
    }
    renderFeed();
    alert("✅ 5 fake posts added!");
}

// Auto add fake posts when page loads
setTimeout(() => {
    if (teacherFeeds.length < 5) {
        addFakePosts();
    }
}, 1000);


// ========== 250 FAKE POSTS ADD KARNE KA CODE ==========

function add250FakePosts() {
    let names = [
        "Dr. Anil Sharma", "Prof. Meera Gupta", "Dr. Rajesh Kumar", "Prof. Sunita Verma",
        "Dr. Vikram Singh", "Prof. Pooja Reddy", "Dr. Alok Yadav", "Prof. Kavita Jha",
        "Aarav Sharma", "Vihaan Kumar", "Ananya Singh", "Diya Mehta", "Advik Reddy",
        "Ishaan Gupta", "Myra Nair", "Rohan Verma", "Sneha Patel", "Kunal Joshi",
        "Priya Singh", "Rahul Mehta", "Neha Kapoor", "Amit Shah", "Swati Gupta"
    ];

    let letters = ["A", "M", "R", "S", "V", "P", "A", "K", "A", "V", "A", "D", "A", "I", "M", "R", "S", "K", "P", "R", "N", "A", "S"];

    let contents = [
        "📢 New assignment uploaded! Deadline: This Friday",
        "🎉 Congratulations to all top performers!",
        "📚 Study materials for final exam now available",
        "💻 Coding workshop this weekend! Register now",
        "🔥 Just completed my JavaScript project!",
        "📝 Need help with React Hooks?",
        "🏆 Leaderboard updated! Check your rank",
        "✅ Assignment submitted successfully!",
        "💡 Tip: Practice daily for better results",
        "🎯 Goal: Complete 2 modules this week",
        "📖 Loving the new course structure!",
        "🚀 Placement preparation session tomorrow",
        "🌟 Student of the Month announced!",
        "📢 Holiday on Monday, no classes",
        "🎓 Scholarship applications open!",
        "💬 Group study session at 6 PM",
        "🔔 Reminder: Quiz tomorrow at 10 AM",
        "📊 Grades updated in gradebook",
        "👥 Join the new Discord community",
        "🎥 New video lecture uploaded",
        "📝 Project submission deadline extended",
        "💡 Interview tips from industry experts",
        "🔥 50% off on advanced courses!",
        "📢 Important announcement for all students",
        "🎉 Hackathon registrations are open!",
        "📚 E-books now available in library",
        "💻 Practice problems for DSA uploaded",
        "🏆 Top 10 students get certificates",
        "✅ Attendance marked for today",
        "💬 Any doubts? Ask in discussion forum"
    ];

    let existingCount = teacherFeeds.length;

    for (let i = 1; i <= 250; i++) {
        let randomName = names[Math.floor(Math.random() * names.length)];
        let randomLetter = letters[Math.floor(Math.random() * letters.length)];
        let randomContent = contents[Math.floor(Math.random() * contents.length)];

        teacherFeeds.unshift({
            id: Date.now() + i,
            userName: randomName,
            userFirstLetter: randomLetter,
            content: randomContent + ` (Post #${i})`,
            time: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
            likes: Math.floor(Math.random() * 100),
            comments: []
        });
    }

    renderFeed();
    console.log(`✅ ${teacherFeeds.length - existingCount} fake posts added! Total posts: ${teacherFeeds.length}`);
    alert(`🎉 ${teacherFeeds.length - existingCount} posts added successfully!\nTotal posts now: ${teacherFeeds.length}`);
}

// Page load pe automatically 250 posts add karne ke liye
setTimeout(() => {
    if (teacherFeeds.length < 10) {
        add250FakePosts();
    }
}, 500);

// Manual call ke liye console mein likhna: add250FakePosts()

// ========== 50+ FAKE STUDENTS ADD KARNE KA CODE ==========

function addFakeStudents() {
    let firstNames = [
        "Aarav", "Vihaan", "Ananya", "Diya", "Advik", "Ishaan", "Myra", "Rohan", "Sneha", "Kunal",
        "Priya", "Rahul", "Neha", "Amit", "Swati", "Manish", "Deepa", "Sanjay", "Monika", "Alok",
        "Rekha", "Vijay", "Anjali", "Pankaj", "Ritu", "Saurabh", "Jyoti", "Naveen", "Shikha", "Manoj",
        "Divya", "Tarun", "Karishma", "Sunil", "Anita", "Deepak", "Nidhi", "Rajesh", "Shweta", "Avinash",
        "Madhuri", "Gaurav", "Pooja", "Vikram", "Kavita", "Raj", "Simran", "Ankit", "Swati", "Mohit"
    ];

    let lastNames = ["Kumar", "Sharma", "Verma", "Singh", "Gupta", "Patel", "Reddy", "Yadav", "Jha", "Malhotra", "Mehta", "Kapoor", "Khanna", "Saxena", "Choudhary"];

    let existingCount = studentsList.length;
    let startId = studentsList.length + 1;

    for (let i = 0; i < 50; i++) {
        let firstName = firstNames[(existingCount + i) % firstNames.length];
        let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        let name = firstName + " " + lastName;
        let email = firstName.toLowerCase() + "." + lastName.toLowerCase() + (existingCount + i) + "@student.com";
        let xp = Math.floor(Math.random() * 5000) + 500;

        studentsList.push({
            id: startId + i,
            name: name,
            email: email,
            xp: xp,
            firstLetter: firstName.charAt(0),
            status: Math.random() > 0.3 ? "active" : "inactive"
        });
    }

    renderStudents();
    console.log(`✅ ${studentsList.length - existingCount} fake students added! Total students: ${studentsList.length}`);
    alert(`🎉 ${studentsList.length - existingCount} students added successfully!\nTotal students now: ${studentsList.length}`);
}

// Page load pe automatically students add karne ke liye
setTimeout(() => {
    if (studentsList.length < 20) {
        addFakeStudents();
    }
}, 500);

// Manual call ke liye console mein likhna: addFakeStudents()


// ========== 50 UNIQUE FAKE CLASSES ADD KARNE KA CODE ==========

function addUniqueFakeClasses() {
    let courseNames = [
        "Web Development Bootcamp", "Full Stack JavaScript", "Python Programming Masterclass",
        "Data Science & Analytics", "Machine Learning A-Z", "Deep Learning Fundamentals",
        "Artificial Intelligence", "Cyber Security Essentials", "Ethical Hacking Course",
        "Cloud Computing with AWS", "DevOps Engineering", "Kubernetes & Docker",
        "React Complete Guide", "Angular Framework", "Vue.js Development",
        "Node.js Backend Development", "Express.js API Course", "MongoDB Database",
        "SQL & PostgreSQL", "Firebase Development", "Flutter Mobile App",
        "React Native iOS/Android", "Swift iOS Development", "Kotlin Android",
        "Java Programming", "C++ Data Structures", "C# .NET Development",
        "PHP Laravel Framework", "WordPress Development", "UI/UX Design Course",
        "Figma Masterclass", "Adobe XD Design", "Graphic Design with Photoshop",
        "Video Editing with Premiere", "Digital Marketing Course", "SEO Optimization",
        "Social Media Marketing", "Google Analytics", "Content Writing Course",
        "Business Communication", "Leadership & Management", "Project Management",
        "Agile Scrum Master", "Product Management", "Financial Accounting",
        "Stock Market Trading", "Cryptocurrency Basics", "Blockchain Development",
        "Game Development Unity", "AR/VR Development", "Robotics Course"
    ];

    let schedules = [
        "Mon/Wed 9AM", "Mon/Wed 10AM", "Mon/Wed 11AM", "Mon/Wed 2PM", "Mon/Wed 3PM",
        "Tue/Thu 9AM", "Tue/Thu 10AM", "Tue/Thu 11AM", "Tue/Thu 2PM", "Tue/Thu 3PM",
        "Fri 9AM", "Fri 10AM", "Fri 11AM", "Fri 2PM", "Sat 9AM", "Sat 10AM", "Sat 11AM"
    ];

    let rooms = [
        "Lab 101", "Lab 102", "Lab 103", "Lab 104", "Lab 105",
        "Room 201", "Room 202", "Room 203", "Room 204", "Room 205",
        "Online-Zoom A", "Online-Zoom B", "Online-Google Meet", "Hybrid Hall", "Seminar Hall"
    ];

    let existingCount = allClasses.length;
    let startId = allClasses.length + 1;

    for (let i = 0; i < 50; i++) {
        let uniqueName = courseNames[i % courseNames.length];
        if (i >= courseNames.length) {
            uniqueName = courseNames[i % courseNames.length] + ` (Batch ${Math.floor(i / courseNames.length) + 1})`;
        }

        allClasses.push({
            id: startId + i,
            teacherId: currentTeacher.id,
            name: uniqueName,
            schedule: schedules[i % schedules.length],
            students: Math.floor(Math.random() * 30) + 5,
            room: rooms[i % rooms.length],
            status: "Active"
        });
    }

    renderClasses();
    console.log(`✅ ${allClasses.length - existingCount} unique classes added! Total classes: ${allClasses.length}`);
    alert(`🎉 ${allClasses.length - existingCount} classes added successfully!\nTotal classes now: ${allClasses.length}`);
}

// Auto add classes on page load
setTimeout(() => {
    if (allClasses.length < 10) {
        addUniqueFakeClasses();
    }
}, 500);

// Manual call: addUniqueFakeClasses()


// ========== ATTENDANCE SYSTEM ==========

let attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || {};

// Today's date in YYYY-MM-DD format
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

// Mark attendance for a class
function markAttendance(classId, studentId, status) {
    let today = getTodayDate();
    let key = `${classId}_${studentId}_${today}`;

    attendanceRecords[key] = {
        classId: classId,
        studentId: studentId,
        date: today,
        status: status, // 'present', 'absent', 'late'
        markedAt: new Date().toISOString()
    };

    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
    console.log(`✅ Attendance marked: Student ${studentId} - ${status}`);
}

// Get attendance for a student in a class
function getStudentAttendance(classId, studentId) {
    let records = [];
    for (let key in attendanceRecords) {
        let rec = attendanceRecords[key];
        if (rec.classId === classId && rec.studentId === studentId) {
            records.push(rec);
        }
    }
    return records;
}

// Get attendance percentage for a student in a class
function getAttendancePercentage(classId, studentId) {
    let records = getStudentAttendance(classId, studentId);
    if (records.length === 0) return 0;

    let presentCount = records.filter(r => r.status === 'present').length;
    return Math.floor((presentCount / records.length) * 100);
}

// Get today's attendance for a class
function getTodayAttendance(classId) {
    let today = getTodayDate();
    let todayRecords = [];

    for (let key in attendanceRecords) {
        let rec = attendanceRecords[key];
        if (rec.classId === classId && rec.date === today) {
            todayRecords.push(rec);
        }
    }
    return todayRecords;
}

// Render attendance UI for a class
function showAttendanceUI(classId, className) {
    let students = getClassStudents(classId);
    let todayAttendance = getTodayAttendance(classId);

    let modalHtml = `
        <div id="attendanceModal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;overflow:auto;">
            <div style="background:#1a1a1a;margin:30px auto;width:90%;max-width:800px;border-radius:15px;">
                <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:15px;display:flex;justify-content:space-between;">
                    <h3>✅ Attendance: ${className}</h3>
                    <button onclick="closeAttendanceModal()" style="background:none;border:none;font-size:24px;cursor:pointer;color:white;">&times;</button>
                </div>
                <div style="padding:20px;">
                    <div style="margin-bottom:15px;display:flex;gap:10px;">
                        <button class="btn-primary" onclick="markAllPresent(${classId})">✅ Mark All Present</button>
                        <button class="btn-primary" onclick="submitAttendance(${classId})" style="background:#4caf50;">💾 Save & Submit</button>
                    </div>
                    <div style="max-height:500px;overflow-y:auto;">
                        <table style="width:100%;border-collapse:collapse;">
                            <thead>
                                <tr style="background:#2a2a2a;">
                                    <th style="padding:10px;text-align:left;">Student</th>
                                    <th style="padding:10px;">Status</th>
                                    <th style="padding:10px;">Attendance %</th>
                                </tr>
                            </thead>
                            <tbody>
    `;

    for (let s of students) {
        let todayRecord = todayAttendance.find(r => r.studentId === s.id);
        let currentStatus = todayRecord ? todayRecord.status : 'present';
        let percentage = getAttendancePercentage(classId, s.id);

        modalHtml += `
            <tr style="border-bottom:1px solid #333;">
                <td style="padding:10px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="width:35px;height:35px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:50%;display:flex;align-items:center;justify-content:center;">${s.firstLetter}</div>
                        <div><b>${s.name}</b><br><small>${s.email}</small></div>
                    </div>
                </td>
                <td style="padding:10px;text-align:center;">
                    <select id="attendance_${classId}_${s.id}" style="background:#2a2a2a;border:1px solid #333;color:white;padding:5px 10px;border-radius:5px;">
                        <option value="present" ${currentStatus === 'present' ? 'selected' : ''}>✅ Present</option>
                        <option value="absent" ${currentStatus === 'absent' ? 'selected' : ''}>❌ Absent</option>
                        <option value="late" ${currentStatus === 'late' ? 'selected' : ''}>⏰ Late</option>
                    </select>
                </td>
                <td style="padding:10px;text-align:center;">
                    <span style="background:${percentage >= 75 ? '#4caf50' : percentage >= 50 ? '#ff9800' : '#f44336'};padding:3px 10px;border-radius:15px;font-size:12px;">${percentage}%</span>
                </td>
            </tr>
        `;
    }

    modalHtml += `
                            </tbody>
                        </table>
                    </div>
                    <div style="margin-top:20px;text-align:center;">
                        <button onclick="submitAttendance(${classId})" class="btn-primary" style="background:#4caf50;padding:10px 30px;">💾 Save Attendance</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    let existing = document.getElementById('attendanceModal');
    if (existing) existing.remove();
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Submit attendance for a class
function submitAttendance(classId) {
    let students = getClassStudents(classId);
    let count = { present: 0, absent: 0, late: 0 };

    for (let s of students) {
        let select = document.getElementById(`attendance_${classId}_${s.id}`);
        if (select) {
            let status = select.value;
            markAttendance(classId, s.id, status);
            count[status]++;
        }
    }

    closeAttendanceModal();
    alert(`✅ Attendance saved!\n\nPresent: ${count.present}\nAbsent: ${count.absent}\nLate: ${count.late}`);
    renderClasses(); // Refresh classes view
}

// Mark all students present
function markAllPresent(classId) {
    let students = getClassStudents(classId);
    for (let s of students) {
        let select = document.getElementById(`attendance_${classId}_${s.id}`);
        if (select) {
            select.value = 'present';
        }
    }
}

// Close attendance modal
function closeAttendanceModal() {
    let modal = document.getElementById('attendanceModal');
    if (modal) modal.remove();
}

// Add attendance button to each class card (modify renderClasses function)
// Add this line in renderClasses function where buttons are
// <button class="btn-primary" onclick="showAttendanceUI(${c.id}, '${c.name}')" style="margin-top:10px;background:#2196f3;">✅ Take Attendance</button>




// Make attendance functions global
window.showAttendanceUI = showAttendanceUI;
window.submitAttendance = submitAttendance;
window.markAllPresent = markAllPresent;
window.closeAttendanceModal = closeAttendanceModal;


// ========== LIGHTWEIGHT ATTENDANCE SYSTEM WITH REPORT ==========

let attData = JSON.parse(localStorage.getItem('attendance')) || {};

// Take Attendance Function
function takeAttendance(classId, className) {
    let students = studentsList;
    let today = new Date().toISOString().split('T')[0];
    let saved = attData[`${classId}_${today}`] || {};

    let html = `
        <div id="attModal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:9999;">
            <div style="background:#1a1a1a;margin:50px auto;width:90%;max-width:550px;border-radius:15px;">
                <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:15px;display:flex;justify-content:space-between;">
                    <b>✅ Take Attendance - ${className}</b>
                    <button onclick="closeAtt()" style="background:none;border:none;color:white;font-size:22px;cursor:pointer;">✕</button>
                </div>
                <div style="padding:15px;max-height:400px;overflow:auto;">
                    <p><strong>Date:</strong> ${today}</p>
                    <button onclick="markAllPresent()" style="background:#4caf50;border:none;padding:5px 10px;border-radius:5px;color:white;cursor:pointer;margin-bottom:10px;">✅ Mark All Present</button>
                    ${students.map(s => `
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid #333;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="width:35px;height:35px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:50%;display:flex;align-items:center;justify-content:center;">${s.firstLetter}</div>
                                <span><b>${s.name}</b></span>
                            </div>
                            <select id="att_${s.id}" style="background:#2a2a2a;border:1px solid #555;color:white;padding:5px 10px;border-radius:5px;">
                                <option value="present" ${saved[s.id] === 'present' ? 'selected' : ''}>✅ Present</option>
                                <option value="absent" ${saved[s.id] === 'absent' ? 'selected' : ''}>❌ Absent</option>
                                <option value="late" ${saved[s.id] === 'late' ? 'selected' : ''}>⏰ Late</option>
                            </select>
                        </div>
                    `).join('')}
                    <button onclick="saveAttendance(${classId})" style="background:#4caf50;border:none;padding:10px;margin-top:15px;width:100%;border-radius:8px;color:white;cursor:pointer;">💾 Save Attendance</button>
                </div>
            </div>
        </div>
    `;

    let existing = document.getElementById('attModal');
    if (existing) existing.remove();
    document.body.insertAdjacentHTML('beforeend', html);
}

function markAllPresent() {
    let selects = document.querySelectorAll('select[id^="att_"]');
    selects.forEach(select => select.value = 'present');
}

function saveAttendance(classId) {
    let today = new Date().toISOString().split('T')[0];
    let key = `${classId}_${today}`;
    attData[key] = {};

    for (let s of studentsList) {
        let select = document.getElementById(`att_${s.id}`);
        if (select) attData[key][s.id] = select.value;
    }
    localStorage.setItem('attendance', JSON.stringify(attData));
    closeAtt();
    alert("✅ Attendance saved successfully!");
}

function closeAtt() {
    let modal = document.getElementById('attModal');
    if (modal) modal.remove();
}

// ========== VIEW ATTENDANCE REPORT ==========
function viewAttendanceReport(classId, className) {
    let students = studentsList;
    let reportHtml = `
        <div id="reportModal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:9999;">
            <div style="background:#1a1a1a;margin:50px auto;width:90%;max-width:600px;border-radius:15px;">
                <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:15px;display:flex;justify-content:space-between;">
                    <b>📊 Attendance Report - ${className}</b>
                    <button onclick="closeReport()" style="background:none;border:none;color:white;font-size:22px;cursor:pointer;">✕</button>
                </div>
                <div style="padding:15px;max-height:450px;overflow:auto;">
                    <table style="width:100%;border-collapse:collapse;">
                        <thead>
                            <tr style="background:#2a2a2a;">
                                <th style="padding:10px;text-align:left;">Student</th>
                                <th style="padding:10px;">Present</th>
                                <th style="padding:10px;">Total</th>
                                <th style="padding:10px;">%</th>
                            </tr>
                        </thead>
                        <tbody>
    `;

    for (let s of students) {
        let total = 0;
        let present = 0;

        for (let key in attData) {
            if (key.startsWith(classId + '_')) {
                total++;
                if (attData[key][s.id] === 'present') present++;
            }
        }

        let percentage = total > 0 ? Math.floor((present / total) * 100) : 0;
        let color = percentage >= 75 ? '#4caf50' : (percentage >= 50 ? '#ff9800' : '#f44336');

        reportHtml += `
            <tr style="border-bottom:1px solid #333;">
                <td style="padding:10px;"><b>${s.name}</b></td>
                <td style="padding:10px;text-align:center;">${present}</td>
                <td style="padding:10px;text-align:center;">${total}</td>
                <td style="padding:10px;text-align:center;"><span style="background:${color};padding:3px 10px;border-radius:15px;">${percentage}%</span></td>
            </tr>
        `;
    }

    reportHtml += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    let existing = document.getElementById('reportModal');
    if (existing) existing.remove();
    document.body.insertAdjacentHTML('beforeend', reportHtml);
}

function closeReport() {
    let modal = document.getElementById('reportModal');
    if (modal) modal.remove();
}

// Make functions global
window.takeAttendance = takeAttendance;
window.saveAttendance = saveAttendance;
window.closeAtt = closeAtt;
window.markAllPresent = markAllPresent;
window.viewAttendanceReport = viewAttendanceReport;
window.closeReport = closeReport;


// ========== REAL AI SYSTEM WITH GROQ API ==========
// 🔑 YAHAN APNI GROQ API KEY DALO
// API Key lene ke liye: https://console.groq.com (Free, No Card)
const GROQ_API_KEY = "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";

// Replace existing sendAIMessage with real API version
window.sendAIMessage = async function () {
    let input = document.getElementById('aiInput');
    let text = input?.value.trim();
    if (!text) return;

    let container = document.getElementById('aiMessages');
    if (!container) return;

    container.innerHTML += `<div class="user-msg">🧑 ${text}</div>`;
    input.value = '';

    let typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;

    try {
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
                        content: "You are a helpful AI teaching assistant for SkillSprint. Help teachers with lesson planning, grading suggestions, student engagement ideas, and classroom management. Be concise and professional."
                    },
                    { role: "user", content: text }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        typing.remove();

        let reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again.";
        container.innerHTML += `<div class="ai-msg">🤖 ${reply}</div>`;
        container.scrollTop = container.scrollHeight;

    } catch (error) {
        typing.remove();
        container.innerHTML += `<div class="ai-msg">🤖 Error: ${error.message}. Please check API key.</div>`;
        container.scrollTop = container.scrollHeight;
    }
};

// Update clearAIChat to work with new system
window.clearAIChat = function () {
    let container = document.getElementById('aiMessages');
    if (container) {
        container.innerHTML = `<div class="ai-msg">🤖 Hello! I'm your AI teaching assistant. Ask me anything about teaching, lesson planning, or student engagement!</div>`;
    }
};

console.log("✅ Real AI System Ready! Add your Groq API key to use it.");


// ========== DISABLE ALL POPUPS/ALERTS ==========
// Override alert function to do nothing
window.alert = function () { };

// Override confirm function to always return true
window.confirm = function () { return true; };

// Override prompt function to return empty string
window.prompt = function () { return ""; };

console.log("✅ All popups disabled!");
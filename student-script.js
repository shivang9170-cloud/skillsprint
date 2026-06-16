// ========== SKILLSPRINT - COMPLETE WORKING PLATFORM ==========
console.log("🚀 Script Starting...");

// ========== GENERATE ALL DATA ==========

// 150 COURSES
let courses = [];
for (let i = 1; i <= 150; i++) {
    let levels = ["Beginner", "Intermediate", "Advanced"];
    let icons = ["🌐", "🐍", "📊", "🔒", "⚛️", "🟢", "🍃", "🚀", "🅰️", "🖖"];
    courses.push({
        id: i,
        name: `Course ${i}: ${["Web Dev", "Python", "Data Science", "Cyber Security", "React", "Node.js", "MongoDB", "AI", "ML", "Cloud"][i % 10]} ${Math.floor(i / 10) + 1}`,
        icon: icons[i % 10],
        duration: ["2 Months", "3 Months", "4 Months", "5 Months", "6 Months"][i % 5],
        level: levels[i % 3],
        description: `Learn ${["Web Dev", "Python", "Data Science", "Cyber Security", "React", "Node.js", "MongoDB", "AI", "ML", "Cloud"][i % 10]} with hands-on projects and expert guidance.`,
        enrolled: Math.floor(Math.random() * 500) + 10,
        rating: (Math.random() * 2 + 3).toFixed(1),
        modules: generateModules(i)
    });
}
localStorage.setItem('skill_courses', JSON.stringify(courses));

// Generate modules for each course
function generateModules(courseId) {
    let modules = [];
    let moduleCount = Math.floor(Math.random() * 8) + 5;
    let topics = ["Introduction", "Basics", "Core Concepts", "Advanced Topics", "Practical Applications", "Projects", "Review", "Assessment"];

    for (let i = 1; i <= moduleCount; i++) {
        modules.push({
            id: i,
            title: `Module ${i}: ${topics[i % topics.length]}`,
            completed: false,
            duration: `${Math.floor(Math.random() * 30) + 10} min`,
            content: `This module covers ${topics[i % topics.length]} in detail. You will learn through examples and hands-on exercises.`,
            quiz: {
                questions: [
                    { question: `What is the main topic of ${topics[i % topics.length]}?`, options: ["Option A", "Option B", "Option C", "Option D"], correct: 0 },
                    { question: "Which concept is most important?", options: ["Concept 1", "Concept 2", "Concept 3", "Concept 4"], correct: 1 }
                ]
            }
        });
    }
    return modules;
}

// 50 TEACHERS
let teachers = [];
let teacherNames = ["Dr. Anil Sharma", "Prof. Meera Gupta", "Dr. Rajesh Kumar", "Prof. Sunita Verma", "Dr. Vikram Singh", "Prof. Pooja Reddy", "Dr. Alok Yadav", "Prof. Kavita Jha", "Dr. Sanjay Malhotra", "Prof. Rakesh Mehta", "Dr. Anita Choudhary", "Prof. Deepak Thakur", "Dr. Nidhi Mishra", "Prof. Tarun Tiwari", "Dr. Karishma Dubey", "Prof. Sunil Pandey", "Dr. Anjali Tripathi", "Prof. Gaurav Joshi", "Dr. Madhuri Khan", "Prof. Pradeep Singh", "Dr. Shalini Gupta", "Prof. Mukesh Verma", "Dr. Sonal Sharma", "Prof. Rakesh Kumar", "Dr. Neelam Reddy"];
let expertise = ["Web Development", "Python", "Data Science", "Cyber Security", "React", "Node.js", "Machine Learning", "AI", "Flutter", "Java", "C++", "PHP", "Blockchain", "UI/UX", "Cloud Computing", "DevOps"];

for (let i = 1; i <= 50; i++) {
    teachers.push({
        id: i,
        name: teacherNames[(i - 1) % teacherNames.length] + (i > teacherNames.length ? ` ${Math.floor((i - 1) / teacherNames.length) + 1}` : ""),
        email: `teacher${i}@skillsprint.com`,
        expertise: expertise[(i - 1) % expertise.length],
        experience: Math.floor(Math.random() * 20) + 2 + " years",
        firstLetter: teacherNames[(i - 1) % teacherNames.length].charAt(0),
        status: Math.random() > 0.2 ? "online" : "offline"
    });
}
localStorage.setItem('skill_teachers', JSON.stringify(teachers));

// 200 STUDENTS
let students = [];
let firstNames = ["Ram", "Sita", "Amit", "Priya", "Rahul", "Neha", "Vikas", "Pooja", "Raj", "Simran", "Rohan", "Kavita", "Ankit", "Swati", "Manish", "Deepa", "Sanjay", "Monika", "Alok", "Rekha", "Vijay", "Anjali", "Pankaj", "Ritu", "Saurabh", "Jyoti", "Naveen", "Shikha", "Manoj", "Divya", "Tarun", "Karishma", "Sunil", "Anita", "Deepak", "Nidhi", "Rajesh", "Shweta", "Avinash", "Madhuri"];
let lastNames = ["Kumar", "Sharma", "Verma", "Singh", "Gupta", "Patel", "Reddy", "Yadav", "Jha", "Malhotra"];

for (let i = 1; i <= 200; i++) {
    let firstName = firstNames[(i - 1) % firstNames.length];
    let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    let name = firstName + " " + lastName;
    if (i > firstNames.length) name = firstName + " " + lastName + " " + (Math.floor((i - 1) / firstNames.length) + 1);
    students.push({
        id: i,
        name: name,
        email: firstName.toLowerCase() + "." + lastName.toLowerCase() + i + "@student.com",
        progress: Math.floor(Math.random() * 101),
        xp: Math.floor(Math.random() * 5000),
        bio: `Learning enthusiast | Completed ${Math.floor(Math.random() * 20) + 1} courses`,
        firstLetter: firstName.charAt(0),
        status: Math.random() > 0.3 ? "active" : "inactive"
    });
}
localStorage.setItem('skill_students', JSON.stringify(students));

// 30 NOTICES
let notices = [];
let noticeTitles = [
    "Welcome to SkillSprint!", "New Course Added", "Holiday Announcement", "Exam Schedule", "Result Declared",
    "Workshop Alert", "Scholarship News", "Placement Drive", "Guest Lecture", "Coding Competition",
    "Hackathon 2024", "Tech Fest", "Alumni Meet", "Career Fair", "Internship Opportunities",
    "Project Submission Deadline", "Fee Payment Due", "Library Timings Changed", "New Faculty Joined",
    "Campus Recruitment", "Study Material Available", "Online Quiz", "Webinar Series", "Industry Visit",
    "Certificate Distribution", "Annual Day", "Sports Meet", "Cultural Fest", "Blood Donation Camp", "New Year Celebration"
];
let noticeContents = [
    "All students are requested to check the notice board regularly for important updates.",
    "This is to inform all students about the upcoming events and deadlines. Please stay updated.",
    "Important announcement for all faculty and students. Kindly read the details carefully.",
    "We are excited to announce new opportunities for students. Register before the deadline.",
    "Due to upcoming events, the schedule has been changed. Please check the revised timeline."
];

for (let i = 1; i <= 30; i++) {
    notices.push({
        id: i,
        title: noticeTitles[i - 1],
        content: noticeContents[Math.floor(Math.random() * noticeContents.length)],
        date: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
        author: ["Admin", "Principal", "HOD", "Dean"][Math.floor(Math.random() * 4)],
        important: i <= 5
    });
}
localStorage.setItem('skill_notices', JSON.stringify(notices));

// 200 FEEDS
let feeds = [];
let feedTexts = [
    "Just completed my React course! 🎉", "Learning Python is amazing! 🐍", "Data Science is the future! 📊",
    "Check out my new project!", "Thanks to my teacher for guidance!", "Finally understood JavaScript closures!",
    "Built my first website! 🚀", "Machine Learning is fascinating!", "Cyber security workshop was great!",
    "Love the new course structure!", "Made some new friends here!", "The assignments are challenging but fun!",
    "Can't wait for the hackathon!", "My progress is improving day by day!", "Best learning platform ever!",
    "Just got a job offer! Thank you SkillSprint!", "The community is so supportive!", "Learning never stops!"
];

for (let i = 1; i <= 200; i++) {
    let student = students[Math.floor(Math.random() * students.length)];
    let commentCount = Math.floor(Math.random() * 8);
    let comments = [];
    for (let c = 0; c < commentCount; c++) {
        let commenter = students[Math.floor(Math.random() * students.length)];
        comments.push({
            id: c,
            userId: commenter.id,
            userName: commenter.name,
            userFirstLetter: commenter.firstLetter,
            text: ["Great post!", "Thanks for sharing!", "Keep it up!", "Awesome!", "I agree!", "Well said!"][Math.floor(Math.random() * 6)],
            time: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    feeds.push({
        id: i,
        userId: student.id,
        userName: student.name,
        userFirstLetter: student.firstLetter,
        content: feedTexts[Math.floor(Math.random() * feedTexts.length)],
        likes: Math.floor(Math.random() * 150),
        likedBy: [],
        comments: comments,
        time: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        shares: Math.floor(Math.random() * 30)
    });
}
feeds.sort((a, b) => new Date(b.time) - new Date(a.time));
localStorage.setItem('skill_feeds', JSON.stringify(feeds));

// Load data from localStorage
courses = JSON.parse(localStorage.getItem('skill_courses'));
teachers = JSON.parse(localStorage.getItem('skill_teachers'));
students = JSON.parse(localStorage.getItem('skill_students'));
notices = JSON.parse(localStorage.getItem('skill_notices'));
feeds = JSON.parse(localStorage.getItem('skill_feeds'));
let enrollments = JSON.parse(localStorage.getItem('skill_enrollments')) || [];
let messages = JSON.parse(localStorage.getItem('skill_messages')) || [];
let learningProgress = JSON.parse(localStorage.getItem('skill_learning_progress')) || {};

let currentStudent = students[0];
let currentChatUser = null;

function saveAll() {
    localStorage.setItem('skill_enrollments', JSON.stringify(enrollments));
    localStorage.setItem('skill_messages', JSON.stringify(messages));
    localStorage.setItem('skill_learning_progress', JSON.stringify(learningProgress));
}

function getEnrolledCourses() {
    let myEnrollments = enrollments.filter(e => e.studentId === currentStudent.id);
    return myEnrollments.map(e => {
        let course = courses.find(c => c.id === e.courseId);
        let progress = learningProgress[`${currentStudent.id}_${e.courseId}`] || 0;
        return { ...course, progress: progress, enrollment: e };
    }).filter(c => c);
}

function isEnrolled(courseId) {
    return enrollments.some(e => e.studentId === currentStudent.id && e.courseId === courseId);
}

function enrollCourse(courseId, courseName) {
    if (isEnrolled(courseId)) {
        alert(`✅ Already enrolled in ${courseName}!`);
        return;
    }
    enrollments.push({
        id: Date.now(),
        studentId: currentStudent.id,
        courseId: courseId,
        enrolledAt: new Date().toISOString()
    });
    learningProgress[`${currentStudent.id}_${courseId}`] = 0;
    let course = courses.find(c => c.id === courseId);
    if (course) course.enrolled = (course.enrolled || 0) + 1;
    saveAll();
    alert(`🎉 Successfully enrolled in ${courseName}!`);
    renderAllCourses();
    renderMyCourses();
    updateStats();
}

// LEARNING MODULE FUNCTION - FIXED
function openLearning(courseId, courseName) {
    let course = courses.find(c => c.id === courseId);
    if (!course) return;

    let courseProgress = learningProgress[`${currentStudent.id}_${courseId}`] || 0;

    let modalHtml = `
        <div id="learningModal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;overflow:auto;">
            <div style="background:white;margin:50px auto;width:90%;max-width:1200px;border-radius:15px;overflow:hidden;">
                <div style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;padding:20px;display:flex;justify-content:space-between;align-items:center;">
                    <h2>${course.icon} ${course.name}</h2>
                    <button onclick="closeLearning()" style="background:none;border:none;font-size:30px;cursor:pointer;color:white;">&times;</button>
                </div>
                <div style="display:flex;height:70vh;">
                    <div style="width:300px;background:#f7f9fc;border-right:1px solid #e1e8ed;overflow-y:auto;padding:20px;">
                        <h3>Course Modules</h3>
                        <div id="modulesList"></div>
                        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e1e8ed;">
                            <div style="background:#e1e8ed;border-radius:10px;overflow:hidden;">
                                <div style="width:${courseProgress}%;height:10px;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
                            </div>
                            <p style="margin-top:10px;text-align:center;">${courseProgress}% Complete</p>
                        </div>
                    </div>
                    <div style="flex:1;padding:30px;overflow-y:auto;" id="learningContent">
                        <div style="text-align:center;padding:50px;">
                            <h3>Welcome to ${course.name}!</h3>
                            <p>${course.description}</p>
                            <p>Click on any module from the left to start learning.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    let existingModal = document.getElementById('learningModal');
    if (existingModal) existingModal.remove();

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    renderModulesList(courseId);
}

function renderModulesList(courseId) {
    let course = courses.find(c => c.id === courseId);
    if (!course) return;

    let savedProgress = learningProgress[`${currentStudent.id}_${courseId}`] || {};
    let modulesHtml = '';

    for (let i = 0; i < course.modules.length; i++) {
        let module = course.modules[i];
        let isCompleted = savedProgress[module.id] || false;
        let statusIcon = isCompleted ? '✅' : '📚';

        modulesHtml += `
            <div onclick="loadModule(${courseId}, ${module.id})" style="padding:12px;margin-bottom:8px;background:white;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:10px;">
                <div style="font-size:20px;">${statusIcon}</div>
                <div style="flex:1;">
                    <strong style="display:block;font-size:14px;">${module.title}</strong>
                    <small style="font-size:11px;color:#666;">${module.duration}</small>
                </div>
            </div>
        `;
    }

    let modulesDiv = document.getElementById('modulesList');
    if (modulesDiv) modulesDiv.innerHTML = modulesHtml;
}

function loadModule(courseId, moduleId) {
    let course = courses.find(c => c.id === courseId);
    let module = course.modules.find(m => m.id === moduleId);

    let savedProgress = learningProgress[`${currentStudent.id}_${courseId}`] || {};
    let isCompleted = savedProgress[moduleId] || false;

    let contentHtml = `
        <div>
            <h2>${module.title}</h2>
            <div style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;padding:60px;text-align:center;border-radius:10px;margin:20px 0;">
                <i class="fas fa-play-circle" style="font-size:64px;"></i>
                <p style="margin-top:20px;">Video: ${module.title}</p>
                <small>Duration: ${module.duration}</small>
            </div>
            <div style="background:#f7f9fc;padding:20px;border-radius:10px;margin:20px 0;">
                <h3>Module Overview</h3>
                <p>${module.content}</p>
            </div>
            <div style="background:#fff3e0;padding:20px;border-radius:10px;margin:20px 0;">
                <h3>Quick Quiz</h3>
                ${generateQuizHtml(module.quiz)}
            </div>
            <div style="margin-top:20px;">
                ${!isCompleted ? `<button onclick="markModuleComplete(${courseId}, ${moduleId})" style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;border:none;padding:12px 24px;border-radius:8px;cursor:pointer;">Mark as Complete ✅</button>` : '<div style="background:#4caf50;color:white;padding:10px 20px;border-radius:8px;display:inline-block;">✓ Module Completed</div>'}
                <button onclick="closeLearning()" style="background:#f44336;color:white;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;margin-left:10px;">Close</button>
            </div>
        </div>
    `;

    let contentDiv = document.getElementById('learningContent');
    if (contentDiv) contentDiv.innerHTML = contentHtml;
}

function generateQuizHtml(quiz) {
    if (!quiz || !quiz.questions) return '<p>Quiz will be available soon!</p>';

    let quizHtml = '<div>';
    for (let i = 0; i < quiz.questions.length; i++) {
        let q = quiz.questions[i];
        quizHtml += `
            <div style="margin-bottom:20px;padding:15px;background:white;border-radius:8px;">
                <p><strong>Q${i + 1}: ${q.question}</strong></p>
                <div style="margin-top:10px;">
                    ${q.options.map((opt, idx) => `
                        <label style="display:block;margin:8px 0;">
                            <input type="radio" name="q${i}" value="${idx}"> ${opt}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    }
    quizHtml += `<button onclick="alert('Quiz submitted! Great job!')" style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;">Submit Answers</button></div>`;
    return quizHtml;
}

function markModuleComplete(courseId, moduleId) {
    if (!learningProgress[`${currentStudent.id}_${courseId}`]) {
        learningProgress[`${currentStudent.id}_${courseId}`] = {};
    }

    learningProgress[`${currentStudent.id}_${courseId}`][moduleId] = true;

    let course = courses.find(c => c.id === courseId);
    let completedModules = Object.keys(learningProgress[`${currentStudent.id}_${courseId}`]).filter(key => key !== 'overall').length;
    let totalModules = course.modules.length;
    let progress = Math.floor((completedModules / totalModules) * 100);

    learningProgress[`${currentStudent.id}_${courseId}`].overall = progress;

    saveAll();

    // Update XP
    currentStudent.xp += 50;
    let studentIndex = students.findIndex(s => s.id === currentStudent.id);
    students[studentIndex].xp = currentStudent.xp;
    localStorage.setItem('skill_students', JSON.stringify(students));

    alert("✅ Module completed! +50 XP");

    // Refresh
    renderModulesList(courseId);
    loadModule(courseId, moduleId);
    renderMyCourses();
    updateStats();
}

function closeLearning() {
    let modal = document.getElementById('learningModal');
    if (modal) modal.remove();
    renderMyCourses();
}

function addPost() {
    let content = document.getElementById('postInput')?.value;
    if (!content) return alert("Write something!");

    let newPost = {
        id: Date.now(),
        userId: currentStudent.id,
        userName: currentStudent.name,
        userFirstLetter: currentStudent.firstLetter,
        content: content,
        likes: 0,
        likedBy: [],
        comments: [],
        time: new Date().toISOString(),
        shares: 0
    };
    feeds.unshift(newPost);
    localStorage.setItem('skill_feeds', JSON.stringify(feeds));
    document.getElementById('postInput').value = '';
    renderFeed();
    alert("✅ Post shared!");
}

function likePost(postId) {
    let post = feeds.find(p => p.id === postId);
    if (post) {
        if (post.likedBy.includes(currentStudent.id)) {
            post.likedBy = post.likedBy.filter(id => id !== currentStudent.id);
            post.likes--;
        } else {
            post.likedBy.push(currentStudent.id);
            post.likes++;
        }
        localStorage.setItem('skill_feeds', JSON.stringify(feeds));
        renderFeed();
    }
}

function addComment(postId) {
    let input = document.getElementById(`comment-${postId}`);
    let text = input?.value;
    if (!text) return;

    let post = feeds.find(p => p.id === postId);
    if (post) {
        post.comments.push({
            id: Date.now(),
            userId: currentStudent.id,
            userName: currentStudent.name,
            userFirstLetter: currentStudent.firstLetter,
            text: text,
            time: new Date().toISOString()
        });
        localStorage.setItem('skill_feeds', JSON.stringify(feeds));
        input.value = '';
        renderFeed();
    }
}

function sharePost(postId) {
    let post = feeds.find(p => p.id === postId);
    if (post) {
        post.shares++;
        let sharedPost = {
            id: Date.now(),
            userId: currentStudent.id,
            userName: currentStudent.name,
            userFirstLetter: currentStudent.firstLetter,
            content: `Shared: ${post.content.substring(0, 100)}`,
            likes: 0,
            likedBy: [],
            comments: [],
            time: new Date().toISOString(),
            shares: 0,
            originalPost: { userName: post.userName, content: post.content }
        };
        feeds.unshift(sharedPost);
        localStorage.setItem('skill_feeds', JSON.stringify(feeds));
        renderFeed();
        alert("📤 Post shared!");
    }
}

function updateStats() {
    let myCourses = getEnrolledCourses();
    let totalProgress = myCourses.length > 0 ? Math.floor(myCourses.reduce((s, c) => s + (c.progress || 0), 0) / myCourses.length) : 0;
    let statsDiv = document.getElementById('stats');
    if (statsDiv) {
        statsDiv.innerHTML = `
            <div class="stat-card"><div class="stat-number">${courses.length}</div><div>Courses</div></div>
            <div class="stat-card"><div class="stat-number">${myCourses.length}</div><div>Enrolled</div></div>
            <div class="stat-card"><div class="stat-number">${teachers.length}</div><div>Teachers</div></div>
            <div class="stat-card"><div class="stat-number">${totalProgress}%</div><div>Progress</div></div>
        `;
    }
}

function renderFeed() {
    let feedDiv = document.getElementById('feed');
    if (!feedDiv) return;

    let feedHtml = '';
    for (let i = 0; i < feeds.length; i++) {
        let post = feeds[i];
        feedHtml += `
            <div class="feed-post">
                <div class="feed-header">
                    <div class="avatar-circle-sm">${post.userFirstLetter}</div>
                    <div>
                        <b>${post.userName}</b>
                        <small>${new Date(post.time).toLocaleString()}</small>
                    </div>
                </div>
                <div class="feed-content">
                    <p>${post.content}</p>
                    ${post.originalPost ? `<div class="shared-post"><i class="fas fa-retweet"></i> ${post.originalPost.userName}: ${post.originalPost.content}</div>` : ''}
                </div>
                <div class="feed-actions">
                    <button onclick="likePost(${post.id})"><i class="fas fa-heart ${post.likedBy.includes(currentStudent.id) ? 'liked' : ''}"></i> ${post.likes}</button>
                    <button onclick="toggleComments(${post.id})"><i class="fas fa-comment"></i> ${post.comments.length}</button>
                    <button onclick="sharePost(${post.id})"><i class="fas fa-share"></i> ${post.shares}</button>
                </div>
                <div id="comments-${post.id}" class="comments-section" style="display:none;">
                    <div class="comment-input">
                        <input type="text" id="comment-${post.id}" placeholder="Write a comment...">
                        <button onclick="addComment(${post.id})">Post</button>
                    </div>
                    ${post.comments.slice(-5).map(c => `
                        <div class="comment">
                            <div class="avatar-circle-xs">${c.userFirstLetter}</div>
                            <div><b>${c.userName}</b> ${c.text}<br><small>${new Date(c.time).toLocaleString()}</small></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    feedDiv.innerHTML = feedHtml;
}

function toggleComments(postId) {
    let div = document.getElementById(`comments-${postId}`);
    if (div) div.style.display = div.style.display === 'none' ? 'block' : 'none';
}

function renderAllCourses() {
    let search = document.getElementById('courseSearch')?.value.toLowerCase() || '';
    let filter = document.getElementById('courseFilter')?.value || 'All';

    let filtered = courses.filter(c => {
        let matchSearch = c.name.toLowerCase().includes(search);
        let matchFilter = filter === 'All' || c.level === filter;
        return matchSearch && matchFilter;
    });

    let html = '';
    for (let i = 0; i < filtered.length; i++) {
        let c = filtered[i];
        html += `
            <div class="course-card">
                <div>
                    <h4>${c.icon} ${c.name}</h4>
                    <p class="course-meta">${c.duration} • ${c.level} • ⭐ ${c.rating}</p>
                    <p class="course-desc">${c.description.substring(0, 80)}...</p>
                    <p class="course-stats">👥 ${c.enrolled} students enrolled</p>
                </div>
                ${isEnrolled(c.id) ?
                `<button class="enrolled-btn" onclick="openLearning(${c.id}, '${c.name.replace(/'/g, "\\'")}')">Continue Learning →</button>` :
                `<button class="enroll-btn" onclick="enrollCourse(${c.id}, '${c.name.replace(/'/g, "\\'")}')">Enroll Now →</button>`
            }
            </div>
        `;
    }
    let allCoursesDiv = document.getElementById('allCoursesList');
    if (allCoursesDiv) allCoursesDiv.innerHTML = html;
}

function searchCourses() {
    renderAllCourses();
}

function renderMyCourses() {
    let myCourses = getEnrolledCourses();
    let myCoursesDiv = document.getElementById('myCoursesList');
    if (!myCoursesDiv) return;

    if (myCourses.length === 0) {
        myCoursesDiv.innerHTML = '<div class="card">📚 You haven\'t enrolled in any course yet. Go to "Courses" tab and enroll!</div>';
        return;
    }
    let html = '';
    for (let i = 0; i < myCourses.length; i++) {
        let c = myCourses[i];
        let progress = c.progress || 0;
        html += `
            <div class="course-card">
                <div>
                    <h4>${c.icon} ${c.name}</h4>
                    <div class="progress-container">
                        <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
                        <span>${progress}% Complete</span>
                    </div>
                    <p class="course-stats">📅 Enrolled: ${new Date(c.enrollment?.enrolledAt).toLocaleDateString()}</p>
                </div>
                <button onclick="openLearning(${c.id}, '${c.name.replace(/'/g, "\\'")}')" class="continue-btn">Continue Learning →</button>
            </div>
        `;
    }
    myCoursesDiv.innerHTML = html;
}

function renderTeachers() {
    let html = '';
    for (let i = 0; i < teachers.length; i++) {
        let t = teachers[i];
        html += `
            <div class="teacher-card">
                <div class="avatar-circle-lg">${t.firstLetter}</div>
                <h4>${t.name}</h4>
                <p>${t.expertise}</p>
                <p class="small">${t.experience}</p>
                <button onclick="startChat(${t.id}, '${t.name}', 'teacher')"><i class="fas fa-comment"></i> Message</button>
            </div>
        `;
    }
    let teachersDiv = document.getElementById('teachersList');
    if (teachersDiv) teachersDiv.innerHTML = html;
}

function renderStudents() {
    let html = '';
    for (let i = 0; i < students.length; i++) {
        let s = students[i];
        html += `
            <div class="student-card">
                <div class="avatar-circle-md">${s.firstLetter}</div>
                <div>
                    <h4>${s.name}</h4>
                    <p class="small">⭐ ${s.xp} XP • ${s.progress}% progress</p>
                    <p class="small">${s.bio.substring(0, 50)}</p>
                </div>
                <button onclick="startChat(${s.id}, '${s.name}', 'student')"><i class="fas fa-comment"></i> Chat</button>
            </div>
        `;
    }
    let studentsDiv = document.getElementById('studentsList');
    if (studentsDiv) studentsDiv.innerHTML = html;
}

function renderChatUsers() {
    let allUsers = [];
    for (let i = 0; i < teachers.length; i++) {
        allUsers.push({ ...teachers[i], type: 'teacher', chatId: `t${teachers[i].id}` });
    }
    for (let i = 0; i < students.length; i++) {
        if (students[i].id !== currentStudent.id) {
            allUsers.push({ ...students[i], type: 'student', chatId: `s${students[i].id}` });
        }
    }

    let html = '';
    for (let i = 0; i < allUsers.length; i++) {
        let u = allUsers[i];
        html += `
            <div class="chat-user ${currentChatUser?.chatId === u.chatId ? 'active' : ''}" onclick="selectChatUser('${u.chatId}', ${u.id}, '${u.name}', '${u.type}', '${u.firstLetter}')">
                <div class="avatar-circle-xs">${u.firstLetter}</div>
                <div>
                    <strong>${u.name}</strong>
                    <br><small>${u.type === 'teacher' ? '👨‍🏫 Teacher' : '👤 Student'}</small>
                </div>
                <span class="status ${u.status === 'online' ? 'online' : 'offline'}"></span>
            </div>
        `;
    }
    let chatUsersDiv = document.getElementById('chatUsers');
    if (chatUsersDiv) chatUsersDiv.innerHTML = html;
}

function selectChatUser(chatId, id, name, type, firstLetter) {
    currentChatUser = { chatId, id, name, type, firstLetter };
    let chatHeader = document.getElementById('chatHeader');
    if (chatHeader) chatHeader.innerHTML = `<div class="avatar-circle-xs">${firstLetter}</div> Chat with ${name}`;
    loadMessages();
    renderChatUsers();
}

function loadMessages() {
    if (!currentChatUser) return;
    let chatMessages = messages.filter(m =>
        (m.from === currentStudent.id && m.to === currentChatUser.id && m.fromType === 'student' && m.toType === currentChatUser.type) ||
        (m.from === currentChatUser.id && m.to === currentStudent.id && m.fromType === currentChatUser.type && m.toType === 'student')
    );
    let html = '';
    for (let i = 0; i < chatMessages.length; i++) {
        let m = chatMessages[i];
        html += `
            <div class="message ${m.from === currentStudent.id ? 'sent' : 'received'}">
                <div>${m.text}</div>
                <div class="message-time">${new Date(m.time).toLocaleTimeString()}</div>
            </div>
        `;
    }
    let chatMessagesDiv = document.getElementById('chatMessages');
    if (chatMessagesDiv) {
        chatMessagesDiv.innerHTML = html;
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    }
}

function sendMessage() {
    let input = document.getElementById('messageInput');
    let text = input?.value.trim();
    if (!text || !currentChatUser) return;
    messages.push({
        id: Date.now(),
        from: currentStudent.id,
        fromType: 'student',
        to: currentChatUser.id,
        toType: currentChatUser.type,
        text: text,
        time: new Date().toISOString()
    });
    saveAll();
    if (input) input.value = '';
    loadMessages();
}

function startChat(id, name, type) {
    let chatId = type === 'teacher' ? `t${id}` : `s${id}`;
    let firstLetter = type === 'teacher' ? teachers.find(t => t.id === id)?.firstLetter : students.find(s => s.id === id)?.firstLetter;
    selectChatUser(chatId, id, name, type, firstLetter);
    showPanel('chat');
}

function renderLeaderboard() {
    let sorted = [...students].sort((a, b) => b.xp - a.xp).slice(0, 10);
    let html = '<div class="leaderboard-card">';
    for (let i = 0; i < sorted.length; i++) {
        let s = sorted[i];
        let rankClass = '';
        if (i === 0) rankClass = 'rank-1';
        else if (i === 1) rankClass = 'rank-2';
        else if (i === 2) rankClass = 'rank-3';
        html += `
            <div class="leader-item ${rankClass}">
                <div class="rank">#${i + 1}</div>
                <div class="avatar-circle-sm">${s.firstLetter}</div>
                <div class="leader-info">
                    <strong>${s.name}</strong>
                    <span>⭐ ${s.xp} XP</span>
                </div>
                <div class="leader-progress">${s.progress}%</div>
            </div>
        `;
    }
    html += '</div>';
    let leaderboardDiv = document.getElementById('leaderboardList');
    if (leaderboardDiv) leaderboardDiv.innerHTML = html;
}

function renderNotices() {
    let html = '';
    for (let i = 0; i < notices.length; i++) {
        let n = notices[i];
        html += `
            <div class="notice-card ${n.important ? 'important' : ''}">
                <div class="notice-header">
                    <h4>📢 ${n.title}</h4>
                    <span class="notice-date">${new Date(n.date).toLocaleDateString()}</span>
                </div>
                <p>${n.content}</p>
                <small>by ${n.author}</small>
            </div>
        `;
    }
    let noticesDiv = document.getElementById('noticesList');
    if (noticesDiv) noticesDiv.innerHTML = html;
}

function renderProfile() {
    let myCourses = getEnrolledCourses();
    let totalProgress = myCourses.length > 0 ? Math.floor(myCourses.reduce((s, c) => s + (c.progress || 0), 0) / myCourses.length) : 0;

    let profileInfo = document.getElementById('profileInfo');
    if (profileInfo) {
        profileInfo.innerHTML = `
            <div class="profile-card">
                <div class="avatar-circle-lg" style="width:100px;height:100px;font-size:40px;margin:0 auto 15px;">${currentStudent.firstLetter}</div>
                <h2>${currentStudent.name}</h2>
                <p>${currentStudent.email}</p>
                <p class="bio">${currentStudent.bio}</p>
                <div class="profile-stats">
                    <div><div class="stat">${myCourses.length}</div><span>Courses</span></div>
                    <div><div class="stat">${totalProgress}%</div><span>Progress</span></div>
                    <div><div class="stat">${currentStudent.xp}</div><span>XP</span></div>
                </div>
            </div>
        `;
    }

    let editName = document.getElementById('editName');
    let editBio = document.getElementById('editBio');
    if (editName) editName.value = currentStudent.name;
    if (editBio) editBio.value = currentStudent.bio || '';
}

function updateProfile() {
    let newName = document.getElementById('editName')?.value;
    let newBio = document.getElementById('editBio')?.value;
    if (newName) {
        currentStudent.name = newName;
        currentStudent.firstLetter = newName.charAt(0);
    }
    if (newBio) currentStudent.bio = newBio;

    let index = students.findIndex(s => s.id === currentStudent.id);
    if (index !== -1) students[index] = currentStudent;

    localStorage.setItem('skill_students', JSON.stringify(students));
    renderProfile();
    renderFeed();

    let avatarCircle = document.getElementById('currentUserAvatarCircle');
    if (avatarCircle) avatarCircle.innerText = currentStudent.firstLetter;

    alert("✅ Profile updated!");
}

function renderStories() {
    let topStudents = students.slice(0, 8);
    let html = `
        <div class="story" onclick="showPanel('profile')">
            <div class="story-circle">${currentStudent.firstLetter}</div>
            <span>You</span>
        </div>
    `;
    for (let i = 0; i < topStudents.length; i++) {
        let s = topStudents[i];
        html += `
            <div class="story" onclick="viewStudentProfile(${s.id})">
                <div class="story-circle">${s.firstLetter}</div>
                <span>${s.name.split(' ')[0]}</span>
            </div>
        `;
    }
    let storiesDiv = document.getElementById('stories');
    if (storiesDiv) storiesDiv.innerHTML = html;
}

function renderProfileMini() {
    let profileMini = document.getElementById('profileMini');
    if (profileMini) {
        profileMini.innerHTML = `
            <div class="profile-mini-card">
                <div class="avatar-circle-sm">${currentStudent.firstLetter}</div>
                <div>
                    <strong>${currentStudent.name}</strong>
                    <p>⭐ ${currentStudent.xp} XP</p>
                </div>
            </div>
        `;
    }

    let avatarCircle = document.getElementById('currentUserAvatarCircle');
    if (avatarCircle) avatarCircle.innerText = currentStudent.firstLetter;
}

function viewStudentProfile(studentId) {
    let student = students.find(s => s.id === studentId);
    if (student) alert(`👤 ${student.name}\n📧 ${student.email}\n⭐ ${student.xp} XP\n📊 ${student.progress}% progress`);
}

function showPanel(panelName) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    let panel = document.getElementById(`${panelName}Panel`);
    if (panel) panel.classList.add('active');

    if (panelName === 'home') { updateStats(); renderFeed(); }
    if (panelName === 'courses') { renderAllCourses(); }
    if (panelName === 'mycourses') renderMyCourses();
    if (panelName === 'teachers') renderTeachers();
    if (panelName === 'students') renderStudents();
    if (panelName === 'chat') { renderChatUsers(); loadMessages(); }
    if (panelName === 'leaderboard') renderLeaderboard();
    if (panelName === 'notices') renderNotices();
    if (panelName === 'profile') renderProfile();
}

// Initialize
renderProfileMini();
renderStories();
updateStats();
renderFeed();
renderAllCourses();
renderMyCourses();
renderTeachers();
renderStudents();
renderLeaderboard();
renderNotices();
renderProfile();

console.log("✅ SkillSprint Ready!");
console.log(`📚 ${courses.length} Courses | 👨‍🏫 ${teachers.length} Teachers | 👥 ${students.length} Students`);

// ============================================
// AI ASSISTANT FUNCTIONS - Last mein add karo
// ============================================

// 🔑 GROQ API Key (Free signup: console.groq.com)
const GROQ_API_KEY = "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";

const aiChatMessages = document.getElementById('aiChatMessages');

async function sendAIMessage() {
    const input = document.getElementById('aiUserInput');
    const userText = input.value.trim();

    if (!userText) return;

    // Add user message
    aiChatMessages.innerHTML += `<div class="user-msg">🧑 ${userText}</div>`;
    input.value = '';

    // Add typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    aiChatMessages.appendChild(typingDiv);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

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
                        content: "You are a helpful AI assistant for SkillSprint, a learning platform. Help students with courses, programming doubts, career guidance, and study tips. Be friendly and concise."
                    },
                    { role: "user", content: userText }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();

        // Remove typing indicator
        aiChatMessages.removeChild(typingDiv);

        // Add AI response
        const aiReply = data.choices[0].message.content;
        aiChatMessages.innerHTML += `<div class="ai-msg">🤖 ${aiReply}</div>`;
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

    } catch (error) {
        aiChatMessages.removeChild(typingDiv);
        aiChatMessages.innerHTML += `<div class="ai-msg">🤖 ❌ Error: ${error.message}. Please check API key.</div>`;
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }
}

function clearAIChat() {
    aiChatMessages.innerHTML = '<div class="ai-msg">🤖 Hello! I\'m your AI learning assistant. Ask me anything about courses, programming, doubts, or career guidance!</div>';
}

function sendSuggestion(text) {
    document.getElementById('aiUserInput').value = text;
    sendAIMessage();
}

// Make sure showPanel function handles aiassistant panel
const originalShowPanel = window.showPanel;
window.showPanel = function (panelId) {
    if (originalShowPanel) originalShowPanel(panelId);
    if (panelId === 'aiassistant') {
        document.getElementById('aiChatMessages').scrollTop = document.getElementById('aiChatMessages').scrollHeight;
    }
};
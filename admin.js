// ============================================
// 🚀 ULTIMATE ADMIN PANEL - UNIQUE DATA
// ============================================

console.log("🚀 Admin Panel Loading...");

// ========== UNIQUE DATA GENERATION ==========

// 50 UNIQUE COURSES
let courses = JSON.parse(localStorage.getItem('unique_courses')) || (() => {
    let courseList = [
        "Web Development Bootcamp", "Python Mastery", "Data Science Pro", "Cyber Security Expert",
        "React.js Complete", "Node.js Backend", "MongoDB Database", "UI/UX Design Master",
        "Machine Learning A-Z", "Cloud Computing AWS", "DevOps Engineering", "Digital Marketing",
        "Flutter Mobile Apps", "Java Programming", "C++ DSA", "PHP with Laravel",
        "Blockchain Development", "Artificial Intelligence", "Game Development Unity", "iOS App Development",
        "Android Development", "Kotlin Programming", "Swift Programming", "Rust Programming",
        "Go Language", "TypeScript Master", "Angular Framework", "Vue.js Framework",
        "Tailwind CSS", "Bootstrap 5", "SQL Database", "PostgreSQL Advanced",
        "Redis Cache", "Docker Containers", "Kubernetes Orchestration", "Jenkins CI/CD",
        "Git & GitHub", "Agile Methodology", "Scrum Master", "Project Management",
        "Business Analytics", "Excel Advanced", "Tableau Visualization", "Power BI",
        "Salesforce Admin", "SAP FICO", "Oracle Database", "IBM Mainframe",
        "R Programming", "Julia Computing", "MATLAB Programming"
    ];
    return courseList.map((name, i) => ({
        id: i + 1,
        name: name,
        description: `Complete ${name} course with hands-on projects and real-world examples.`,
        icon: ["🌐", "🐍", "📊", "🔒", "⚛️", "🟢", "🍃", "🎨", "🤖", "☁️", "⚙️", "📢", "📱", "☕", "⚡", "🐘", "⛓️", "🧠", "🎮", "📲", "🤖", "🎯", "🚀", "🦀", "🐹", "📘", "🅰️", "🖖", "🎨", "🎯", "🗄️", "🐘", "⚡", "🐳", "☸️", "🔧", "📝", "📋", "📊", "📈", "📉", "📊", "🔷", "🔶", "💛", "💜", "💚", "💙", "❤️", "🧡"][i % 50],
        duration: Math.floor(Math.random() * 6) + 2 + " months",
        level: ["Beginner", "Intermediate", "Advanced"][i % 3],
        status: "active",
        price: Math.floor(Math.random() * 5000) + 999,
        enrolled: Math.floor(Math.random() * 200) + 10,
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    }));
})();

// 50 UNIQUE STUDENTS with real Indian names
let students = JSON.parse(localStorage.getItem('unique_students')) || (() => {
    let firstNames = ["Ram", "Sita", "Amit", "Priya", "Rahul", "Neha", "Vikas", "Pooja", "Raj", "Simran", "Rohan", "Kavita", "Ankit", "Swati", "Manish", "Deepa", "Sanjay", "Monika", "Alok", "Rekha", "Vijay", "Anjali", "Pankaj", "Ritu", "Saurabh", "Jyoti", "Naveen", "Shikha", "Manoj", "Divya", "Tarun", "Karishma", "Sunil", "Anita", "Deepak", "Nidhi", "Rajesh", "Shweta", "Avinash", "Madhuri", "Gaurav", "Komal", "Pradeep", "Shalini", "Mukesh", "Sonal", "Rakesh", "Neelam", "Ajay", "Rani"];
    let lastNames = ["Kumar", "Sharma", "Verma", "Singh", "Gupta", "Patel", "Reddy", "Yadav", "Jha", "Malhotra", "Mehta", "Choudhary", "Thakur", "Mishra", "Tiwari", "Dubey", "Pandey", "Tripathi", "Joshi", "Khan"];

    return firstNames.map((first, i) => {
        let lastName = lastNames[i % lastNames.length];
        let name = first + " " + lastName;
        return {
            id: i + 1,
            name: name,
            email: first.toLowerCase() + "." + lastName.toLowerCase() + i + "@student.com",
            phone: "98765" + (10000 + i),
            courseId: (i % 50) + 1,
            progress: Math.floor(Math.random() * 101),
            status: i % 7 === 0 ? "inactive" : "active",
            enrolledAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
            lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        };
    });
})();

// 30 UNIQUE TEACHERS
let teachers = JSON.parse(localStorage.getItem('unique_teachers')) || (() => {
    let teacherNames = [
        "Dr. Anil Sharma", "Prof. Meera Gupta", "Dr. Rajesh Kumar", "Prof. Sunita Verma",
        "Dr. Vikram Singh", "Prof. Neeraj Patel", "Dr. Pooja Reddy", "Prof. Alok Yadav",
        "Dr. Kavita Jha", "Prof. Sanjay Malhotra", "Dr. Rakesh Mehta", "Prof. Anita Choudhary",
        "Dr. Deepak Thakur", "Prof. Nidhi Mishra", "Dr. Tarun Tiwari", "Prof. Karishma Dubey",
        "Dr. Sunil Pandey", "Prof. Anjali Tripathi", "Dr. Gaurav Joshi", "Prof. Madhuri Khan",
        "Dr. Pradeep Singh", "Prof. Shalini Gupta", "Dr. Mukesh Verma", "Prof. Sonal Sharma",
        "Dr. Rakesh Kumar", "Prof. Neelam Reddy", "Dr. Ajay Yadav", "Prof. Rani Jha",
        "Dr. Manoj Malhotra", "Prof. Divya Mehta"
    ];
    let expertise = [
        "Web Development", "Python Programming", "Data Science", "Cyber Security",
        "React.js", "Node.js", "MongoDB", "UI/UX Design", "Machine Learning",
        "Cloud Computing", "DevOps", "Digital Marketing", "Flutter", "Java",
        "C++", "PHP", "Blockchain", "AI", "Game Development", "Mobile Apps"
    ];

    return teacherNames.map((name, i) => ({
        id: i + 1,
        name: name,
        email: name.toLowerCase().replace(/ /g, ".").replace("dr.", "").replace("prof.", "") + "@dss.edu",
        phone: "99887" + (50000 + i),
        expertise: expertise[i % expertise.length],
        qualification: ["Ph.D", "M.Tech", "M.Sc", "B.Tech + MBA"][i % 4],
        experience: Math.floor(Math.random() * 15) + 2 + " years",
        status: "active",
        joinedAt: new Date(Date.now() - Math.random() * 730 * 24 * 60 * 60 * 1000).toISOString()
    }));
})();

// 100 UNIQUE MODULES
let modules = JSON.parse(localStorage.getItem('unique_modules')) || (() => {
    let modulePrefixes = [
        "Introduction to", "Fundamentals of", "Advanced", "Professional", "Mastering",
        "Complete Guide to", "Hands-on with", "Practical", "Real-world", "Industry"
    ];
    let moduleTopics = [
        "HTML/CSS", "JavaScript", "React", "Node.js", "Python Basics", "OOP Concepts",
        "Data Structures", "Algorithms", "Database Design", "API Development",
        "Frontend", "Backend", "Full Stack", "DevOps Tools", "Cloud Services"
    ];
    let modules = [];
    for (let i = 1; i <= 100; i++) {
        let courseId = (i % 50) + 1;
        let prefix = modulePrefixes[i % modulePrefixes.length];
        let topic = moduleTopics[i % moduleTopics.length];
        modules.push({
            id: i,
            courseId: courseId,
            name: `${prefix} ${topic} - Module ${Math.floor(i / 5) + 1}`,
            description: `Comprehensive module covering ${topic} with practical examples and exercises.`,
            order: i,
            status: "active",
            createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    return modules;
})();

// 150 UNIQUE LESSONS
let lessons = JSON.parse(localStorage.getItem('unique_lessons')) || (() => {
    let lessonTitles = [
        "Getting Started", "Setup & Installation", "Core Concepts", "Basic Syntax",
        "Working with Data", "Functions & Methods", "Error Handling", "Best Practices",
        "Project Setup", "Building Features", "Testing & Debugging", "Deployment",
        "Performance Optimization", "Security Basics", "Advanced Techniques"
    ];
    let lessons = [];
    for (let i = 1; i <= 150; i++) {
        let moduleId = (i % 100) + 1;
        lessons.push({
            id: i,
            moduleId: moduleId,
            title: lessonTitles[i % lessonTitles.length] + " - Lesson " + Math.floor(i / 10) + 1,
            content: `This lesson covers important concepts about ${lessonTitles[i % lessonTitles.length]}. Students will learn through examples and hands-on practice.`,
            videoUrl: "",
            duration: Math.floor(Math.random() * 30) + 5 + " minutes",
            order: i,
            status: "active",
            createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    return lessons;
})();

// 100 ENROLLMENTS
let enrollments = JSON.parse(localStorage.getItem('unique_enrollments')) || (() => {
    let enrollments = [];
    let used = new Set();
    for (let i = 1; i <= 100; i++) {
        let studentId = (i % 50) + 1;
        let courseId = (i % 50) + 1;
        let key = studentId + "_" + courseId;
        if (!used.has(key)) {
            used.add(key);
            enrollments.push({
                id: i,
                studentId: studentId,
                courseId: courseId,
                progress: Math.floor(Math.random() * 101),
                status: "active",
                enrolledAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString()
            });
        }
    }
    return enrollments;
})();

// 50 UNIQUE NOTICES
let notices = JSON.parse(localStorage.getItem('unique_notices')) || (() => {
    let noticeTitles = [
        "Welcome to New Semester", "Exam Schedule Announced", "Holiday Notice", "Workshop Registration Open",
        "Guest Lecture Series", "Placement Drive", "Scholarship Applications", "Project Submission Deadline",
        "Internship Opportunities", "Codeathon Event", "Hackathon 2024", "Tech Fest Celebration",
        "Parent-Teacher Meeting", "Fee Payment Deadline", "Library Timings Changed", "New Course Launch",
        "Faculty Development Program", "Research Paper Call", "Alumni Meet", "Sports Day Announcement",
        "Cultural Fest", "Annual Day Celebration", "Industry Visit", "Certificate Distribution",
        "Result Declaration", "Admission Open", "Scholarship Test", "Career Counseling Session"
    ];
    let contents = [
        "All students are requested to check the schedule. Important updates regarding academics.",
        "This is to inform all students about upcoming events and deadlines. Please stay updated.",
        "Important announcement for all faculty and students. Kindly read the details carefully.",
        "We are excited to announce new opportunities for students. Register before deadline.",
        "Due to upcoming events, schedule has been changed. Check the notice board regularly."
    ];
    return noticeTitles.map((title, i) => ({
        id: i + 1,
        title: title + " " + (new Date().getFullYear()),
        content: contents[i % contents.length] + " For more details, contact admin office.",
        target: ["all", "students", "teachers"][i % 3],
        date: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
        author: ["Admin", "Principal", "HOD"][i % 3],
        important: i % 5 === 0
    }));
})();

// Save all data
function saveAllData() {
    localStorage.setItem('unique_courses', JSON.stringify(courses));
    localStorage.setItem('unique_students', JSON.stringify(students));
    localStorage.setItem('unique_teachers', JSON.stringify(teachers));
    localStorage.setItem('unique_modules', JSON.stringify(modules));
    localStorage.setItem('unique_lessons', JSON.stringify(lessons));
    localStorage.setItem('unique_enrollments', JSON.stringify(enrollments));
    localStorage.setItem('unique_notices', JSON.stringify(notices));
    console.log("✅ All data saved!");
}

// Helper functions
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function (m) {
        return m === '&' ? '&amp;' : (m === '<' ? '&lt;' : '&gt;');
    });
}

function formatDate(date) {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN');
}

// ========== RENDER FUNCTIONS ==========

function renderDashboard() {
    let totalRevenue = courses.reduce((sum, c) => sum + (c.price * c.enrolled), 0);
    let avgProgress = Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length);

    document.getElementById('contentArea').innerHTML = `
        <style>
            .stat-card { background: linear-gradient(135deg, #1e293b, #0f172a); padding: 25px; border-radius: 15px; text-align: center; border: 1px solid #334155; transition: all 0.3s; }
            .stat-card:hover { transform: translateY(-5px); border-color: #3b82f6; }
            .stat-value { font-size: 36px; font-weight: bold; color: #3b82f6; margin: 10px 0; }
            .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px; }
            .quick-btn { background: #3b82f6; padding: 12px 24px; border: none; border-radius: 8px; color: white; cursor: pointer; margin: 5px; transition: all 0.2s; }
            .quick-btn:hover { background: #2563eb; transform: scale(1.02); }
        </style>
        
        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div class="stat-card"><h3>📚 Total Courses</h3><div class="stat-value">${courses.length}</div><small>Active: ${courses.filter(c => c.status === 'active').length}</small></div>
            <div class="stat-card"><h3>👥 Total Students</h3><div class="stat-value">${students.length}</div><small>Active: ${students.filter(s => s.status === 'active').length}</small></div>
            <div class="stat-card"><h3>👨‍🏫 Teachers</h3><div class="stat-value">${teachers.length}</div><small>Expert faculty</small></div>
            <div class="stat-card"><h3>📖 Lessons</h3><div class="stat-value">${lessons.length}</div><small>+${modules.length} modules</small></div>
            <div class="stat-card"><h3>📈 Avg Progress</h3><div class="stat-value">${avgProgress}%</div><small>Students completion rate</small></div>
            <div class="stat-card"><h3>💰 Total Revenue</h3><div class="stat-value">₹${totalRevenue.toLocaleString()}</div><small>From ${enrollments.length} enrollments</small></div>
        </div>
        
        <div class="dashboard-grid">
            <div class="stat-card" style="text-align:left;">
                <h3>🏆 Top Performing Courses</h3>
                ${courses.sort((a, b) => b.enrolled - a.enrolled).slice(0, 5).map(c => `
                    <div style="margin: 10px 0;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>${c.icon} ${c.name.substring(0, 30)}</span>
                            <span>${c.enrolled} students</span>
                        </div>
                        <div style="background:#334155; border-radius:10px; height:6px; margin-top:5px;">
                            <div style="background:#3b82f6; width:${(c.enrolled / Math.max(...courses.map(c2 => c2.enrolled))) * 100}%; height:6px; border-radius:10px;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="stat-card" style="text-align:left;">
                <h3>📢 Recent Notices</h3>
                ${notices.slice(0, 5).map(n => `
                    <div style="border-bottom:1px solid #334155; padding:10px 0;">
                        <strong>${escapeHtml(n.title)}</strong>
                        <small style="color:#94a3b8; display:block;">${formatDate(n.date)}</small>
                        <p style="font-size:13px; margin-top:5px;">${escapeHtml(n.content.substring(0, 80))}...</p>
                    </div>
                `).join('')}
                ${notices.length === 0 ? '<p>No notices yet.</p>' : ''}
            </div>
        </div>
        
        <div class="stat-card">
            <h3>⚡ Quick Actions</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 15px;">
                <button onclick="showTab('courses')" class="quick-btn"><i class="fas fa-plus"></i> Add Course</button>
                <button onclick="showTab('students')" class="quick-btn"><i class="fas fa-user-plus"></i> Add Student</button>
                <button onclick="showTab('teachers')" class="quick-btn"><i class="fas fa-chalkboard-user"></i> Add Teacher</button>
                <button onclick="showTab('notices')" class="quick-btn"><i class="fas fa-bullhorn"></i> Post Notice</button>
                <button onclick="exportData()" class="quick-btn" style="background:#10b981;"><i class="fas fa-download"></i> Export Data</button>
                <button onclick="resetData()" class="quick-btn" style="background:#ef4444;"><i class="fas fa-refresh"></i> Reset Data</button>
            </div>
        </div>
    `;
}

function renderCourses() {
    let html = `
        <div style="background:#1e293b; padding:20px; border-radius:15px; margin-bottom:20px;">
            <h3>➕ Add New Course</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin:15px 0;">
                <input type="text" id="courseName" placeholder="Course Name" style="padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
                <input type="text" id="courseIcon" placeholder="Icon Emoji" style="padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                <select id="courseLevel" style="padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
                    <option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option>
                </select>
                <input type="text" id="courseDuration" placeholder="Duration (e.g., 3 months)" style="padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
            </div>
            <textarea id="courseDesc" rows="2" placeholder="Description" style="width:100%; padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white; margin-bottom:15px;"></textarea>
            <button onclick="addCourse()" style="background:#3b82f6; padding:12px 24px; border:none; border-radius:8px; color:white; cursor:pointer;">➕ Add Course</button>
        </div>
        
        <div style="background:#1e293b; padding:20px; border-radius:15px;">
            <h3>📚 All Courses (${courses.length})</h3>
            <div style="overflow-x:auto; margin-top:15px;">
                <table style="width:100%; border-collapse:collapse;">
                    <thead><tr style="border-bottom:2px solid #334155;">
                        <th style="padding:12px; text-align:left;">Icon</th><th style="padding:12px; text-align:left;">Course Name</th>
                        <th style="padding:12px; text-align:left;">Level</th><th style="padding:12px; text-align:left;">Duration</th>
                        <th style="padding:12px; text-align:left;">Students</th><th style="padding:12px; text-align:left;">Actions</th>
                    </tr></thead>
                    <tbody>
                        ${courses.map(c => `
                            <tr style="border-bottom:1px solid #334155;">
                                <td style="padding:12px;">${c.icon}</td>
                                <td style="padding:12px;"><strong>${escapeHtml(c.name)}</strong><br><small>${escapeHtml(c.description.substring(0, 50))}...</small></td>
                                <td style="padding:12px;"><span style="background:${c.level === 'Advanced' ? '#ef444420' : c.level === 'Intermediate' ? '#f59e0b20' : '#22c55e20'}; color:${c.level === 'Advanced' ? '#ef4444' : c.level === 'Intermediate' ? '#f59e0b' : '#22c55e'}; padding:4px 8px; border-radius:12px;">${c.level}</span></td>
                                <td style="padding:12px;">${c.duration}</td>
                                <td style="padding:12px;">${c.enrolled || 0}</td>
                                <td style="padding:12px;"><button onclick="deleteCourse(${c.id})" style="background:#ef4444; padding:6px 12px; border:none; border-radius:5px; color:white; cursor:pointer;">🗑️ Delete</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = html;
}

function renderStudents() {
    let html = `
        <div style="background:#1e293b; padding:20px; border-radius:15px; margin-bottom:20px;">
            <h3>👤 Add New Student</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin:15px 0;">
                <input type="text" id="studentName" placeholder="Full Name" style="padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
                <input type="email" id="studentEmail" placeholder="Email" style="padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                <input type="text" id="studentPhone" placeholder="Phone" style="padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
                <select id="studentCourseId" style="padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
                    ${courses.map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join('')}
                </select>
            </div>
            <button onclick="addStudent()" style="background:#3b82f6; padding:12px 24px; border:none; border-radius:8px; color:white; cursor:pointer;">➕ Add Student</button>
        </div>
        
        <div style="background:#1e293b; padding:20px; border-radius:15px;">
            <h3>👥 All Students (${students.length})</h3>
            <div style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse;">
                    <thead><tr style="border-bottom:2px solid #334155;">
                        <th style="padding:12px; text-align:left;">Name</th><th style="padding:12px; text-align:left;">Email</th>
                        <th style="padding:12px; text-align:left;">Course</th><th style="padding:12px; text-align:left;">Progress</th>
                        <th style="padding:12px; text-align:left;">Status</th><th style="padding:12px; text-align:left;">Actions</th>
                    </tr></thead>
                    <tbody>
                        ${students.map(s => {
        let course = courses.find(c => c.id === s.courseId);
        return `<tr style="border-bottom:1px solid #334155;">
                                <td style="padding:12px;"><strong>${escapeHtml(s.name)}</strong></td>
                                <td style="padding:12px;">${escapeHtml(s.email)}</td>
                                <td style="padding:12px;">${course ? course.icon + " " + course.name : '-'}</td>
                                <td style="padding:12px;">
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <div style="background:#334155; border-radius:10px; width:80px;"><div style="background:#3b82f6; width:${s.progress}%; height:6px; border-radius:10px;"></div></div>
                                        <span>${s.progress}%</span>
                                    </div>
                                </td>
                                <td style="padding:12px;"><span style="background:${s.status === 'active' ? '#22c55e20' : '#ef444420'}; color:${s.status === 'active' ? '#22c55e' : '#ef4444'}; padding:4px 8px; border-radius:12px;">${s.status}</span></td>
                                <td style="padding:12px;"><button onclick="deleteStudent(${s.id})" style="background:#ef4444; padding:6px 12px; border:none; border-radius:5px; color:white; cursor:pointer;">🗑️ Delete</button></td>
                             </tr>`;
    }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = html;
}

function renderTeachers() {
    let html = `
        <div style="background:#1e293b; padding:20px; border-radius:15px; margin-bottom:20px;">
            <h3>👨‍🏫 Add New Teacher</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin:15px 0;">
                <input type="text" id="teacherName" placeholder="Full Name" style="padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
                <input type="email" id="teacherEmail" placeholder="Email" style="padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                <input type="text" id="teacherPhone" placeholder="Phone" style="padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
                <input type="text" id="teacherExpertise" placeholder="Expertise" style="padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
            </div>
            <button onclick="addTeacher()" style="background:#3b82f6; padding:12px 24px; border:none; border-radius:8px; color:white; cursor:pointer;">➕ Add Teacher</button>
        </div>
        
        <div style="background:#1e293b; padding:20px; border-radius:15px;">
            <h3>👨‍🏫 All Teachers (${teachers.length})</h3>
            <div style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse;">
                    <thead><tr style="border-bottom:2px solid #334155;">
                        <th style="padding:12px; text-align:left;">Name</th><th style="padding:12px; text-align:left;">Email</th>
                        <th style="padding:12px; text-align:left;">Expertise</th><th style="padding:12px; text-align:left;">Experience</th>
                        <th style="padding:12px; text-align:left;">Actions</th>
                    </tr></thead>
                    <tbody>
                        ${teachers.map(t => `
                            <tr style="border-bottom:1px solid #334155;">
                                <td style="padding:12px;"><strong>${escapeHtml(t.name)}</strong><br><small>${t.qualification || ''}</small></td>
                                <td style="padding:12px;">${escapeHtml(t.email)}</td>
                                <td style="padding:12px;"><span style="background:#3b82f620; color:#3b82f6; padding:4px 8px; border-radius:12px;">${t.expertise}</span></td>
                                <td style="padding:12px;">${t.experience || 'N/A'}</td>
                                <td style="padding:12px;"><button onclick="deleteTeacher(${t.id})" style="background:#ef4444; padding:6px 12px; border:none; border-radius:5px; color:white; cursor:pointer;">🗑️ Delete</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = html;
}

function renderNotices() {
    let html = `
        <div style="background:#1e293b; padding:20px; border-radius:15px; margin-bottom:20px;">
            <h3>📢 Post New Notice</h3>
            <input type="text" id="noticeTitle" placeholder="Notice Title" style="width:100%; padding:12px; margin:10px 0; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white;">
            <textarea id="noticeContent" rows="3" placeholder="Notice Content" style="width:100%; padding:12px; border-radius:8px; background:#0f172a; border:1px solid #334155; color:white; margin-bottom:15px;"></textarea>
            <button onclick="addNotice()" style="background:#3b82f6; padding:12px 24px; border:none; border-radius:8px; color:white; cursor:pointer;">📢 Post Notice</button>
        </div>
        
        <div style="background:#1e293b; padding:20px; border-radius:15px;">
            <h3>📢 All Notices (${notices.length})</h3>
            ${notices.slice(0, 30).map(n => `
                <div style="border-bottom:1px solid #334155; padding:15px 0;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <strong>${escapeHtml(n.title)}</strong>
                        <small style="color:#94a3b8;">${formatDate(n.date)}</small>
                    </div>
                    <p style="margin-top:8px;">${escapeHtml(n.content)}</p>
                    <button onclick="deleteNotice(${n.id})" style="background:#ef4444; padding:5px 10px; border:none; border-radius:5px; color:white; cursor:pointer; margin-top:8px;">🗑️ Delete</button>
                </div>
            `).join('')}
            ${notices.length > 30 ? `<p style="margin-top:10px;">Showing 30 of ${notices.length} notices</p>` : ''}
        </div>
    `;
    document.getElementById('contentArea').innerHTML = html;
}

// ========== CRUD OPERATIONS ==========

function addCourse() {
    let name = document.getElementById('courseName')?.value;
    if (!name) return alert("❌ Course name required!");

    courses.push({
        id: Date.now(),
        name: name,
        description: document.getElementById('courseDesc')?.value || '',
        icon: document.getElementById('courseIcon')?.value || '📚',
        duration: document.getElementById('courseDuration')?.value || '3 months',
        level: document.getElementById('courseLevel')?.value || 'Beginner',
        status: 'active',
        price: Math.floor(Math.random() * 5000) + 999,
        enrolled: 0,
        createdAt: new Date().toISOString()
    });
    saveAllData();
    alert(`✅ Course "${name}" added successfully!`);
    renderCourses();
}

function deleteCourse(id) {
    if (!confirm("⚠️ Delete this course? All related data will be lost!")) return;
    courses = courses.filter(c => c.id !== id);
    saveAllData();
    alert("✅ Course deleted!");
    renderCourses();
}

function addStudent() {
    let name = document.getElementById('studentName')?.value;
    let email = document.getElementById('studentEmail')?.value;
    if (!name || !email) return alert("❌ Name and email required!");

    students.push({
        id: Date.now(),
        name: name,
        email: email,
        phone: document.getElementById('studentPhone')?.value || '',
        courseId: parseInt(document.getElementById('studentCourseId')?.value),
        progress: 0,
        status: 'active',
        enrolledAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
    });
    saveAllData();
    alert(`✅ Student "${name}" added successfully!`);
    renderStudents();
}

function deleteStudent(id) {
    if (!confirm("⚠️ Delete this student?")) return;
    students = students.filter(s => s.id !== id);
    saveAllData();
    alert("✅ Student deleted!");
    renderStudents();
}

function addTeacher() {
    let name = document.getElementById('teacherName')?.value;
    let email = document.getElementById('teacherEmail')?.value;
    if (!name || !email) return alert("❌ Name and email required!");

    teachers.push({
        id: Date.now(),
        name: name,
        email: email,
        phone: document.getElementById('teacherPhone')?.value || '',
        expertise: document.getElementById('teacherExpertise')?.value || 'General',
        qualification: "M.Tech",
        experience: "5+ years",
        status: 'active',
        joinedAt: new Date().toISOString()
    });
    saveAllData();
    alert(`✅ Teacher "${name}" added successfully!`);
    renderTeachers();
}

function deleteTeacher(id) {
    if (!confirm("⚠️ Delete this teacher?")) return;
    teachers = teachers.filter(t => t.id !== id);
    saveAllData();
    alert("✅ Teacher deleted!");
    renderTeachers();
}

function addNotice() {
    let title = document.getElementById('noticeTitle')?.value;
    let content = document.getElementById('noticeContent')?.value;
    if (!title || !content) return alert("❌ Title and content required!");

    notices.unshift({
        id: Date.now(),
        title: title,
        content: content,
        target: "all",
        date: new Date().toISOString(),
        author: "Admin"
    });
    saveAllData();
    alert(`✅ Notice "${title}" posted!`);
    renderNotices();
}

function deleteNotice(id) {
    notices = notices.filter(n => n.id !== id);
    saveAllData();
    renderNotices();
}

// ========== UTILITIES ==========

function exportData() {
    let exportData = {
        courses: courses,
        students: students,
        teachers: teachers,
        modules: modules,
        lessons: lessons,
        notices: notices,
        exportDate: new Date().toISOString()
    };
    let dataStr = JSON.stringify(exportData, null, 2);
    let blob = new Blob([dataStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = `dss_backup_${new Date().toISOString().slice(0, 19)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert("✅ Data exported successfully!");
}

function resetData() {
    if (confirm("⚠️ WARNING: This will reset ALL data to default! Are you sure?")) {
        localStorage.clear();
        location.reload();
    }
}

// ========== TAB NAVIGATION ==========

function showTab(tab) {
    console.log("Showing tab:", tab);
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    let activeItem = document.querySelector(`[data-tab="${tab}"]`);
    if (activeItem) activeItem.classList.add('active');
    document.getElementById('pageTitle').innerText = tab.charAt(0).toUpperCase() + tab.slice(1);

    if (tab === 'dashboard') renderDashboard();
    else if (tab === 'courses') renderCourses();
    else if (tab === 'students') renderStudents();
    else if (tab === 'teachers') renderTeachers();
    else if (tab === 'notices') renderNotices();
    else renderDashboard();
}

// ========== INITIALIZE ==========

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM loaded, initializing...");

    // Setup navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            let tab = this.getAttribute('data-tab');
            if (tab) showTab(tab);
        });
    });

    // Setup buttons
    let refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            let active = document.querySelector('.nav-item.active');
            if (active) showTab(active.getAttribute('data-tab'));
        });
    }

    let logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
    }

    // Start with dashboard
    showTab('dashboard');
    console.log("✅ Admin panel ready! Data counts - Courses:", courses.length, "Students:", students.length, "Teachers:", teachers.length);
});

console.log("Script loaded successfully!");
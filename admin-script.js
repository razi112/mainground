// Load and display all submissions
function loadSubmissions() {
    const submissions = JSON.parse(localStorage.getItem('teamSubmissions') || '[]');
    const container = document.getElementById('submissionsContainer');
    
    // Update stats
    updateStats(submissions);
    
    if (submissions.length === 0) {
        container.innerHTML = '<p class="no-data">No submissions yet. Waiting for team data...</p>';
        return;
    }
    
    // Display submissions in reverse order (newest first)
    container.innerHTML = '';
    submissions.reverse().forEach((submission, index) => {
        const card = createSubmissionCard(submission, submissions.length - index);
        container.appendChild(card);
    });
}

// Create submission card element
function createSubmissionCard(submission, submissionNumber) {
    const card = document.createElement('div');
    card.className = 'submission-card';
    
    const header = document.createElement('div');
    header.className = 'submission-header';
    
    const info = document.createElement('div');
    info.className = 'submission-info';
    
    const idSpan = document.createElement('span');
    idSpan.className = 'submission-id';
    idSpan.textContent = `Submission #${submissionNumber}`;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'submission-time';
    timeSpan.textContent = new Date(submission.timestamp).toLocaleString();
    
    info.appendChild(idSpan);
    info.appendChild(timeSpan);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteSubmission(submission.id);
    
    header.appendChild(info);
    header.appendChild(deleteBtn);
    
    const studentsGrid = document.createElement('div');
    studentsGrid.className = 'students-grid';
    
    submission.teamData.forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.className = 'student-item';
        
        studentItem.innerHTML = `
            <div class="student-number">Student ${student.studentNumber}</div>
            <div class="student-detail"><strong>Name:</strong> ${student.studentName}</div>
            <div class="student-detail"><strong>Father:</strong> ${student.fatherName}</div>
        `;
        
        studentsGrid.appendChild(studentItem);
    });
    
    card.appendChild(header);
    card.appendChild(studentsGrid);
    
    return card;
}

// Update statistics
function updateStats(submissions) {
    const totalSubmissions = submissions.length;
    const totalStudents = totalSubmissions * 10;
    
    document.getElementById('totalSubmissions').textContent = totalSubmissions;
    document.getElementById('totalStudents').textContent = totalStudents;
    
    if (submissions.length > 0) {
        const latest = new Date(submissions[submissions.length - 1].timestamp);
        document.getElementById('latestSubmission').textContent = latest.toLocaleDateString();
    } else {
        document.getElementById('latestSubmission').textContent = '-';
    }
}

// Delete a specific submission
function deleteSubmission(id) {
    if (!confirm('Are you sure you want to delete this submission?')) {
        return;
    }
    
    let submissions = JSON.parse(localStorage.getItem('teamSubmissions') || '[]');
    submissions = submissions.filter(sub => sub.id !== id);
    localStorage.setItem('teamSubmissions', JSON.stringify(submissions));
    loadSubmissions();
}

// Clear all data
function clearAllData() {
    if (!confirm('Are you sure you want to delete ALL submissions? This cannot be undone!')) {
        return;
    }
    
    localStorage.removeItem('teamSubmissions');
    loadSubmissions();
    alert('All data has been cleared.');
}

// Export data as JSON
function exportData() {
    const submissions = JSON.parse(localStorage.getItem('teamSubmissions') || '[]');
    
    if (submissions.length === 0) {
        alert('No data to export.');
        return;
    }
    
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `football-team-submissions-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Admin credentials (in production, use backend authentication)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Check if admin is logged in on page load
window.onload = function() {
    checkAdminLogin();
};

// Check admin login status
function checkAdminLogin() {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    const adminUsername = localStorage.getItem('adminUsername');
    
    if (adminLoggedIn === 'true' && adminUsername) {
        showDashboard(adminUsername);
    } else {
        showLoginForm();
    }
}

// Show login form
function showLoginForm() {
    document.getElementById('adminLoginSection').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

// Show dashboard
function showDashboard(username) {
    document.getElementById('adminLoginSection').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    document.getElementById('adminUserName').textContent = `Welcome, ${username}`;
    
    // Load submissions
    loadSubmissions();
    
    // Auto-refresh every 5 seconds
    if (!window.adminRefreshInterval) {
        window.adminRefreshInterval = setInterval(loadSubmissions, 5000);
    }
}

// Handle admin login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('adminLoginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;
            
            // Validate credentials
            if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                // Store login status
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminUsername', username);
                
                // Show dashboard
                showDashboard(username);
                
                // Clear form
                loginForm.reset();
            } else {
                alert('Invalid username or password!\n\nPlease use:\nUsername: admin\nPassword: admin123');
            }
        });
    }
});

// Admin logout
function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        
        // Clear refresh interval
        if (window.adminRefreshInterval) {
            clearInterval(window.adminRefreshInterval);
            window.adminRefreshInterval = null;
        }
        
        showLoginForm();
    }
}

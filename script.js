// Get form sections
const loginSection = document.getElementById('loginSection');
const signupSection = document.getElementById('signupSection');
const adminLoginSection = document.getElementById('adminLoginSection');
const teamFormSection = document.getElementById('teamFormSection');

// Get forms
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const adminLoginForm = document.getElementById('adminLoginForm');
const teamForm = document.getElementById('teamForm');

// Admin credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Show signup form
function showSignup() {
    loginSection.style.display = 'none';
    signupSection.style.display = 'block';
    adminLoginSection.style.display = 'none';
}

// Show login form
function showLogin() {
    signupSection.style.display = 'none';
    loginSection.style.display = 'block';
    adminLoginSection.style.display = 'none';
}

// Show admin login form
function showAdminLogin() {
    loginSection.style.display = 'none';
    signupSection.style.display = 'none';
    adminLoginSection.style.display = 'block';
}

// Initialize Google Sign-In when page loads
window.onload = function() {
    // Wait for Google library to load
    setTimeout(initGoogleSignIn, 500);
};

// Initialize Google Sign-In
function initGoogleSignIn() {
    // Check if Google library is loaded
    if (typeof google === 'undefined' || !google.accounts) {
        console.warn('Google Sign-In library not loaded yet. Retrying...');
        setTimeout(initGoogleSignIn, 500);
        return;
    }
    
    // Check if config is loaded
    if (typeof GOOGLE_CONFIG === 'undefined' || !GOOGLE_CONFIG.clientId) {
        console.warn('Google Client ID not configured. Please update config.js');
        showConfigWarning();
        return;
    }
    
    // Check if client ID is still the default placeholder
    if (GOOGLE_CONFIG.clientId.includes('YOUR_GOOGLE_CLIENT_ID')) {
        console.warn('Please replace the placeholder Client ID in config.js with your actual Google OAuth Client ID');
        showConfigWarning();
        return;
    }
    
    // Set the client ID in the g_id_onload div
    const gIdOnload = document.getElementById('g_id_onload');
    if (gIdOnload) {
        gIdOnload.setAttribute('data-client_id', GOOGLE_CONFIG.clientId);
    }
    
    // Initialize Google Identity Services
    google.accounts.id.initialize({
        client_id: GOOGLE_CONFIG.clientId,
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: true
    });
    
    // Render Google Sign-In buttons
    renderGoogleButtons();
}

// Render Google Sign-In buttons in both login and signup sections
function renderGoogleButtons() {
    const loginButton = document.getElementById('googleButtonLogin');
    const signupButton = document.getElementById('googleButtonSignup');
    
    if (loginButton) {
        google.accounts.id.renderButton(
            loginButton,
            { 
                theme: 'outline', 
                size: 'large', 
                text: 'continue_with',
                width: loginButton.parentElement.offsetWidth || 400
            }
        );
    }
    
    if (signupButton) {
        google.accounts.id.renderButton(
            signupButton,
            { 
                theme: 'outline', 
                size: 'large', 
                text: 'continue_with',
                width: signupButton.parentElement.offsetWidth || 400
            }
        );
    }
}

// Show configuration warning in the button containers
function showConfigWarning() {
    const loginButton = document.getElementById('googleButtonLogin');
    const signupButton = document.getElementById('googleButtonSignup');
    
    const warningHTML = `
        <div style="padding: 12px; background: #fff3cd; border: 2px solid #ffc107; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>Google Sign-In Not Configured</strong><br>
                Please update config.js with your Google Client ID<br>
                <a href="SETUP-GOOGLE-AUTH.md" target="_blank" style="color: #667eea;">View Setup Guide</a>
            </p>
        </div>
    `;
    
    if (loginButton) loginButton.innerHTML = warningHTML;
    if (signupButton) signupButton.innerHTML = warningHTML;
}

// Handle Google Sign-In response
function handleGoogleSignIn(response) {
    try {
        // Decode the JWT credential to get user info
        const userInfo = parseJwt(response.credential);
        
        const googleUser = {
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
            sub: userInfo.sub // Google user ID
        };
        
        // Store user info
        localStorage.setItem('currentUser', JSON.stringify(googleUser));
        
        // Show success message
        alert(`Welcome ${googleUser.name}!\n\nYou are now signed in with your Google account.\n\nEmail: ${googleUser.email}`);
        
        // Proceed to team form
        showTeamForm();
        
    } catch (error) {
        console.error('Error processing Google Sign-In:', error);
        alert('Failed to process Google Sign-In. Please try again.');
    }
}

// Parse JWT token to extract user information
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT:', error);
        return null;
    }
}

// Show team form after successful login/signup
function showTeamForm() {
    loginSection.style.display = 'none';
    signupSection.style.display = 'none';
    teamFormSection.style.display = 'block';
    
    // Show user info if available
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
        document.getElementById('userInfo').style.display = 'flex';
        document.getElementById('userName').textContent = `Logged in as: ${currentUser.name || currentUser.email}`;
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        location.reload();
    }
}

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulate login validation
    if (email && password) {
        // Store user info
        const user = {
            email: email,
            name: email.split('@')[0]
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        alert('Login successful!');
        showTeamForm();
    } else {
        alert('Please enter valid credentials.');
    }
});

// Handle signup form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Simulate signup validation
    if (name && email && password) {
        // Store user info
        const user = {
            name: name,
            email: email
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        alert('Account created successfully!');
        showTeamForm();
    } else {
        alert('Please fill in all fields.');
    }
});

// Handle admin login form submission
adminLoginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Validate admin credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Store admin login status
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        
        // Redirect to admin dashboard
        alert('Admin login successful!\n\nRedirecting to Admin Dashboard...');
        window.location.href = 'admin.html';
    } else {
        alert('Invalid admin credentials!\n\nPlease use:\nUsername: admin\nPassword: admin123');
    }
});

// Handle team form submission
teamForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect all student data
    const teamData = [];
    for (let i = 1; i <= 10; i++) {
        const studentName = document.getElementById(`student${i}`).value;
        const fatherName = document.getElementById(`father${i}`).value;
        
        teamData.push({
            studentNumber: i,
            studentName: studentName,
            fatherName: fatherName
        });
    }
    
    // Save to localStorage for admin dashboard
    const submission = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        teamData: teamData
    };
    
    const submissions = JSON.parse(localStorage.getItem('teamSubmissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('teamSubmissions', JSON.stringify(submissions));
    
    // Display the collected data
    console.log('Team Data:', teamData);
    
    // Create a summary message
    let summary = 'Football Team List Submitted Successfully!\n\n';
    summary += 'Your submission has been recorded.\n';
    summary += 'Admin can view it in the dashboard.\n\n';
    teamData.forEach(student => {
        summary += `Student ${student.studentNumber}: ${student.studentName}\n`;
        summary += `Father: ${student.fatherName}\n\n`;
    });
    
    alert(summary);
    
    // Reset form
    teamForm.reset();
    
    // You can send this data to a server here
    // Example: fetch('/api/submit-team', { method: 'POST', body: JSON.stringify(teamData) })
});

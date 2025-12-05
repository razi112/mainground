# Google Authentication Setup Guide

## Current Implementation
The current "Continue with Google" button uses a simulated authentication flow for demonstration purposes. It shows a loading state and simulates a successful Google login after 1.5 seconds.

## To Implement Real Google OAuth 2.0

### Step 1: Get Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure the OAuth consent screen
6. Add authorized JavaScript origins (e.g., `http://localhost:3000`)
7. Copy your Client ID

### Step 2: Add Google Sign-In Library
Add this script tag to your `index.html` before the closing `</body>` tag:

```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

Or use the older Google Platform Library:
```html
<script src="https://apis.google.com/js/platform.js" async defer></script>
```

### Step 3: Update the HTML
Replace the Google button in `index.html` with:

```html
<div id="g_id_onload"
     data-client_id="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
     data-callback="handleGoogleSignIn">
</div>
<div class="g_id_signin" data-type="standard"></div>
```

### Step 4: Update JavaScript
Replace the `continueWithGoogle()` function in `script.js` with:

```javascript
function handleGoogleSignIn(response) {
    // Decode the JWT token
    const userObject = parseJwt(response.credential);
    
    const googleUser = {
        name: userObject.name,
        email: userObject.email,
        picture: userObject.picture
    };
    
    // Store user info
    localStorage.setItem('currentUser', JSON.stringify(googleUser));
    
    // Show success message
    alert(`Welcome ${googleUser.name}!\nGoogle Sign-In Successful.\n\nEmail: ${googleUser.email}`);
    
    // Proceed to team form
    showTeamForm();
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
```

### Step 5: Security Considerations
- Never expose your Client Secret in frontend code
- Validate the token on your backend server
- Use HTTPS in production
- Implement proper session management
- Add CSRF protection

### Alternative: Firebase Authentication
For easier implementation, consider using Firebase Authentication:

1. Install Firebase: `npm install firebase`
2. Initialize Firebase in your project
3. Use Firebase Auth with Google provider:

```javascript
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    // Handle successful login
  })
  .catch((error) => {
    console.error(error);
  });
```

## Current Demo Features
- Loading state during authentication
- Simulated 1.5 second delay
- Mock user data stored in localStorage
- Success message with user details
- Automatic redirect to team form

## Testing the Current Demo
1. Open `index.html` in your browser
2. Click "Continue with Google"
3. Wait for the simulated authentication
4. You'll be logged in as a demo Google user
5. The team form will appear

# Google Authentication Setup Guide

## Quick Start - Get Your Google Client ID

### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### Step 2: Create or Select a Project
1. Click on the project dropdown at the top
2. Click "New Project" or select an existing one
3. Give it a name like "Football Team List"

### Step 3: Enable Google Sign-In
1. In the left sidebar, go to **APIs & Services** > **Credentials**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth 2.0 Client ID"**

### Step 4: Configure OAuth Consent Screen (if prompted)
1. Click "Configure Consent Screen"
2. Select **"External"** (unless you have a Google Workspace)
3. Fill in required fields:
   - App name: "Football Team List"
   - User support email: Your email
   - Developer contact: Your email
4. Click "Save and Continue"
5. Skip "Scopes" (click "Save and Continue")
6. Skip "Test users" (click "Save and Continue")
7. Click "Back to Dashboard"

### Step 5: Create OAuth Client ID
1. Go back to **Credentials** > **"+ CREATE CREDENTIALS"** > **"OAuth 2.0 Client ID"**
2. Select **"Web application"** as Application type
3. Give it a name: "Football Team Web Client"
4. Under **"Authorized JavaScript origins"**, click **"+ ADD URI"** and add:
   ```
   http://localhost
   http://localhost:8080
   http://127.0.0.1
   http://localhost:5500
   ```
   (Add your production domain when deploying)

5. You can leave "Authorized redirect URIs" empty for now
6. Click **"CREATE"**

### Step 6: Copy Your Client ID
1. A popup will show your Client ID - **COPY IT**
2. It looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
3. You can also find it later in the Credentials page

### Step 7: Update config.js
1. Open `config.js` in your project
2. Replace this line:
   ```javascript
   clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
   ```
   With your actual Client ID:
   ```javascript
   clientId: '123456789-abcdefghijklmnop.apps.googleusercontent.com',
   ```
3. Save the file

### Step 8: Test It!
1. Open `index.html` in your browser
2. Click "Continue with Google"
3. You should see the Google Sign-In popup
4. Select your Google account
5. You'll be logged in with your real Google account!

## Important Notes

### For Local Testing
- Use a local web server (not just opening the file)
- Options:
  - VS Code: Install "Live Server" extension and click "Go Live"
  - Python: `python -m http.server 8080`
  - Node.js: `npx http-server`
  - PHP: `php -S localhost:8080`

### Security
- **NEVER** commit your Client ID to public repositories if it's for production
- The Client ID is safe to use in frontend code for development
- For production, add only your actual domain to authorized origins
- Consider using environment variables for production

### Troubleshooting

**Error: "Not a valid origin for the client"**
- Make sure you added your URL to "Authorized JavaScript origins"
- Check that you're using http:// or https:// (not file://)
- Wait a few minutes after adding origins (can take time to propagate)

**Error: "popup_closed_by_user"**
- User closed the popup - this is normal
- Just click "Continue with Google" again

**Google Sign-In popup doesn't appear**
- Check browser console for errors
- Make sure you updated config.js with your Client ID
- Verify you're using a web server (not file://)
- Check that popup blockers are disabled

**"Google Sign-In is not configured yet" alert**
- You haven't updated config.js yet
- Follow Step 7 above

## What Happens When User Clicks "Continue with Google"

1. Google Sign-In popup opens
2. User selects their Google account
3. User grants permission (first time only)
4. Google returns user information:
   - Full name
   - Email address
   - Profile picture
5. User is logged in and redirected to the team form
6. User info is displayed at the top
7. User can submit team data

## User Data Received

When a user signs in with Google, you receive:
```javascript
{
    name: "John Doe",
    email: "john.doe@gmail.com",
    picture: "https://lh3.googleusercontent.com/...",
    sub: "1234567890" // Unique Google user ID
}
```

This is the REAL user's Google account information!

## Next Steps

After setting up Google authentication:
1. Test with multiple Google accounts
2. Add error handling for failed sign-ins
3. Implement backend verification of the JWT token
4. Add user session management
5. Deploy to production with HTTPS

## Production Deployment

When deploying to production:
1. Add your production domain to "Authorized JavaScript origins"
2. Use HTTPS (required by Google)
3. Verify JWT tokens on your backend server
4. Implement proper session management
5. Add security headers
6. Consider using Firebase Authentication for easier backend integration

## Need Help?

- Google Identity Services Documentation: https://developers.google.com/identity/gsi/web
- Google Cloud Console: https://console.cloud.google.com/
- OAuth 2.0 Guide: https://developers.google.com/identity/protocols/oauth2

# Football Team List - Submission Form

A web application for submitting football team lists with Google authentication and an admin dashboard.

## Features

- **Multiple Login Options:**
  - Email/Password login
  - Sign up for new users
  - **Google Sign-In** (real Google OAuth authentication)

- **Team Submission Form:**
  - Enter 10 students' names
  - Enter each student's father's name
  - Submit to admin dashboard

- **Admin Dashboard:**
  - View all submissions
  - See statistics (total submissions, students, latest submission)
  - Delete individual submissions
  - Export data as JSON
  - Auto-refreshes every 5 seconds

## Quick Start

### 1. Set Up Google Authentication

To enable real Google Sign-In:

1. **Get Google Client ID:**
   - Go to https://console.cloud.google.com/
   - Create a new project
   - Go to "APIs & Services" > "Credentials"
   - Create "OAuth 2.0 Client ID"
   - Add authorized JavaScript origins:
     - `http://localhost`
     - `http://localhost:8080`
     - `http://127.0.0.1`
   - Copy your Client ID

2. **Update config.js:**
   ```javascript
   const GOOGLE_CONFIG = {
       clientId: 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com',
   };
   ```

3. **Detailed instructions:** See `SETUP-GOOGLE-AUTH.md`

### 2. Run the Application

You **must** use a local web server (not just open the HTML file):

**Option 1: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` > "Open with Live Server"

**Option 2: Python**
```bash
python -m http.server 8080
```
Then open: http://localhost:8080

**Option 3: Node.js**
```bash
npx http-server
```

**Option 4: PHP**
```bash
php -S localhost:8080
```

### 3. Access the Application

- **Main Form:** Open `index.html` in your browser
- **Admin Dashboard:** Open `admin.html` in your browser

## Files Structure

```
├── index.html              # Main submission form
├── admin.html              # Admin dashboard
├── styles.css              # Main form styles
├── admin-styles.css        # Admin dashboard styles
├── script.js               # Main form logic
├── admin-script.js         # Admin dashboard logic
├── config.js               # Google OAuth configuration
├── SETUP-GOOGLE-AUTH.md    # Detailed Google setup guide
└── README.md               # This file
```

## How It Works

### User Flow:
1. User opens `index.html`
2. Chooses login method:
   - Email/Password
   - Sign Up
   - **Continue with Google** (opens real Google login)
3. After authentication, team form appears
4. User enters 10 students and their fathers' names
5. Submits the form
6. Data is saved to localStorage

### Admin Flow:
1. Admin opens `admin.html`
2. Views all submissions with:
   - Submission number and timestamp
   - All 10 students and fathers' names
3. Can delete individual submissions
4. Can export all data as JSON
5. Dashboard auto-refreshes every 5 seconds

## Google Sign-In

The application uses **real Google OAuth 2.0** authentication:

- Opens actual Google login popup
- User logs in with their real Google account
- Retrieves user's actual name and email
- Secure JWT token validation
- No mock data - real authentication!

**Before Configuration:**
- Shows a warning message with setup instructions

**After Configuration:**
- Shows official Google "Continue with Google" button
- Clicking opens Google's login popup
- User selects their Google account
- User is authenticated and logged in

## Important Notes

### Security
- Client ID is safe to use in frontend code
- For production, verify JWT tokens on backend
- Use HTTPS in production
- Add only your domain to authorized origins

### Browser Compatibility
- Works in all modern browsers
- Requires JavaScript enabled
- Cookies/localStorage must be enabled

### Troubleshooting

**"Not a valid origin" error:**
- Add your URL to authorized JavaScript origins in Google Cloud Console
- Use a web server (not file://)

**Google button doesn't appear:**
- Check config.js has your Client ID
- Check browser console for errors
- Make sure you're using a web server

**Data not appearing in admin dashboard:**
- Make sure you're using the same browser
- Check localStorage is enabled
- Try refreshing the admin page

## Development

To modify the application:

1. **Add more students:** Edit `index.html` and add more student entries
2. **Change styling:** Edit `styles.css` or `admin-styles.css`
3. **Modify logic:** Edit `script.js` or `admin-script.js`
4. **Backend integration:** Add API calls in the form submission handler

## Production Deployment

1. Get a proper Google Client ID for your domain
2. Add your production domain to authorized origins
3. Use HTTPS (required by Google)
4. Implement backend JWT verification
5. Replace localStorage with a real database
6. Add proper session management
7. Implement CSRF protection

## Support

For detailed Google authentication setup, see:
- `SETUP-GOOGLE-AUTH.md` - Complete setup guide
- https://developers.google.com/identity/gsi/web - Official documentation

## License

Free to use and modify for your needs.

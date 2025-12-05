# Troubleshooting "Invalid ID" Error

## Common Causes and Solutions

### 1. Authorized JavaScript Origins Not Set

This is the **most common** cause. You need to add your website URL to Google Cloud Console.

#### Steps to Fix:

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/apis/credentials

2. **Find Your OAuth 2.0 Client ID:**
   - Look for: `1065919081964-kjvafiv806rkmdhprg7c6po09120fp6a`
   - Click on it to edit

3. **Add Authorized JavaScript Origins:**
   - Scroll down to "Authorized JavaScript origins"
   - Click "+ ADD URI"
   - Add these URIs one by one:
     ```
     http://localhost
     http://localhost:8080
     http://localhost:5500
     http://127.0.0.1
     http://127.0.0.1:8080
     ```
   - If you're using a different port, add that too

4. **Save Changes:**
   - Click "SAVE" at the bottom
   - Wait 5-10 minutes for changes to take effect

### 2. Using file:// Protocol

**Problem:** Opening HTML file directly (double-clicking)

**Solution:** Use a web server instead

#### How to Run with Web Server:

**Option A: VS Code Live Server (Easiest)**
```
1. Install "Live Server" extension in VS Code
2. Right-click index.html
3. Click "Open with Live Server"
4. It will open at http://127.0.0.1:5500 or http://localhost:5500
```

**Option B: Python**
```bash
# In your project folder, run:
python -m http.server 8080

# Then open: http://localhost:8080
```

**Option C: Node.js**
```bash
# Install http-server globally (one time):
npm install -g http-server

# Run in your project folder:
http-server

# Then open: http://localhost:8080
```

**Option D: PHP**
```bash
php -S localhost:8080

# Then open: http://localhost:8080
```

### 3. Wrong Client ID

**Check:** Make sure config.js has the correct Client ID:
```javascript
clientId: '1065919081964-kjvafiv806rkmdhprg7c6po09120fp6a.apps.googleusercontent.com'
```

### 4. Browser Cache

**Solution:** Clear browser cache or try incognito mode
```
1. Open browser in Incognito/Private mode
2. Try the application again
```

### 5. OAuth Consent Screen Not Configured

**Steps:**
1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Fill in required fields:
   - App name
   - User support email
   - Developer contact email
3. Save and continue through all steps

## Step-by-Step Checklist

- [ ] Client ID is correct in config.js
- [ ] Using a web server (not file://)
- [ ] Added authorized JavaScript origins in Google Cloud Console
- [ ] Waited 5-10 minutes after adding origins
- [ ] OAuth consent screen is configured
- [ ] Tried in incognito mode
- [ ] Checked browser console for specific error messages

## How to Check Your Current URL

1. Open the application in your browser
2. Look at the address bar
3. The URL should start with `http://` or `https://`
4. Note the exact URL (including port number)
5. Make sure this EXACT URL is in authorized origins

### Examples:

✅ **Correct URLs:**
- `http://localhost:8080`
- `http://127.0.0.1:5500`
- `http://localhost`

❌ **Wrong URLs:**
- `file:///C:/Users/...` (won't work - need web server)
- `https://localhost` (if you added http://)

## Still Not Working?

### Check Browser Console:

1. Open browser Developer Tools (F12)
2. Go to "Console" tab
3. Look for error messages
4. Common errors:

**"Not a valid origin for the client"**
- Solution: Add your URL to authorized origins

**"popup_closed_by_user"**
- Solution: User closed popup - just try again

**"idpiframe_initialization_failed"**
- Solution: Cookies are blocked - enable cookies

## Quick Test

Run this in your browser console to check your current origin:
```javascript
console.log(window.location.origin);
```

Make sure this exact value is in your authorized JavaScript origins!

## Need More Help?

1. Check what URL you're accessing (address bar)
2. Verify that exact URL is in authorized origins
3. Wait 5-10 minutes after adding origins
4. Try incognito mode
5. Check browser console for specific errors

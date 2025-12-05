# Fix "Access blocked: Authorization Error - no registered origin"

## The Problem

You're seeing this error because Google doesn't recognize your website URL. You need to tell Google which URLs are allowed to use your Client ID.

## Solution: Add Authorized JavaScript Origins

### Step 1: Go to Google Cloud Console

1. Open your browser
2. Go to: **https://console.cloud.google.com/apis/credentials**
3. Sign in with your Google account if needed

### Step 2: Find Your OAuth Client ID

1. You'll see a list of credentials
2. Look for **"OAuth 2.0 Client IDs"** section
3. Find the one with ID: `1065919081964-kjvafiv806rkmdhprg7c6po09120fp6a`
4. **Click on the name** to edit it

### Step 3: Add Authorized JavaScript Origins

1. Scroll down to find **"Authorized JavaScript origins"** section
2. Click the **"+ ADD URI"** button
3. Add these URLs **one by one**:

```
http://localhost
```
Click "+ ADD URI" again and add:
```
http://localhost:8080
```
Click "+ ADD URI" again and add:
```
http://localhost:5500
```
Click "+ ADD URI" again and add:
```
http://127.0.0.1
```
Click "+ ADD URI" again and add:
```
http://127.0.0.1:8080
```
Click "+ ADD URI" again and add:
```
http://127.0.0.1:5500
```

### Step 4: Save Changes

1. Scroll to the bottom of the page
2. Click the **"SAVE"** button
3. You should see a success message

### Step 5: Wait

**IMPORTANT:** Changes can take 5-10 minutes to take effect. Be patient!

### Step 6: Run Your Application with a Web Server

You **MUST** use a web server. Here are your options:

#### Option A: VS Code Live Server (Recommended - Easiest)

1. Open VS Code
2. Install "Live Server" extension:
   - Click Extensions icon (or press Ctrl+Shift+X)
   - Search for "Live Server"
   - Click Install
3. Right-click on `index.html`
4. Select **"Open with Live Server"**
5. Your browser will open automatically at `http://127.0.0.1:5500` or `http://localhost:5500`

#### Option B: Python (If you have Python installed)

1. Open Command Prompt or Terminal
2. Navigate to your project folder:
   ```bash
   cd path/to/your/project
   ```
3. Run:
   ```bash
   python -m http.server 8080
   ```
4. Open browser and go to: `http://localhost:8080`

#### Option C: Node.js (If you have Node.js installed)

1. Open Command Prompt or Terminal
2. Navigate to your project folder
3. Run:
   ```bash
   npx http-server -p 8080
   ```
4. Open browser and go to: `http://localhost:8080`

### Step 7: Test Google Sign-In

1. After waiting 5-10 minutes from Step 4
2. Open your application using one of the web server methods above
3. Click "Continue with Google"
4. It should now work!

## Checklist

Before testing, make sure:

- [ ] Added all 6 authorized origins in Google Cloud Console
- [ ] Clicked SAVE in Google Cloud Console
- [ ] Waited at least 5-10 minutes
- [ ] Using a web server (not opening HTML file directly)
- [ ] Browser URL starts with `http://` (not `file://`)
- [ ] The URL in browser matches one of the authorized origins

## Common Mistakes

### ❌ Mistake 1: Opening HTML file directly
**Wrong:** Double-clicking `index.html` → URL shows `file:///C:/Users/...`
**Right:** Using web server → URL shows `http://localhost:8080`

### ❌ Mistake 2: Not waiting
**Wrong:** Testing immediately after saving
**Right:** Wait 5-10 minutes after saving in Google Cloud Console

### ❌ Mistake 3: Wrong URL
**Wrong:** Browser shows `http://localhost:3000` but you only added `http://localhost:8080`
**Right:** Make sure the exact URL in your browser is in authorized origins

### ❌ Mistake 4: Using HTTPS instead of HTTP
**Wrong:** Adding `https://localhost`
**Right:** Adding `http://localhost` (no 's')

## Still Not Working?

### Check Your Current URL

1. Open the application in your browser
2. Look at the address bar
3. Copy the EXACT URL (including port number if any)
4. Make sure this EXACT URL is in your authorized origins

Example:
- If browser shows: `http://127.0.0.1:5500/index.html`
- You need to add: `http://127.0.0.1:5500` (without the /index.html part)

### Try Incognito Mode

1. Close all browser windows
2. Open browser in Incognito/Private mode
3. Access your application
4. Try Google Sign-In again

### Clear Browser Cache

1. Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
2. Select "Cached images and files"
3. Click "Clear data"
4. Try again

## What URL Should I Use?

The URL depends on how you're running the web server:

| Method | URL to Use | Origin to Add |
|--------|-----------|---------------|
| VS Code Live Server | `http://127.0.0.1:5500` | `http://127.0.0.1:5500` |
| Python http.server | `http://localhost:8080` | `http://localhost:8080` |
| Node.js http-server | `http://localhost:8080` | `http://localhost:8080` |

## Need More Help?

If you're still having issues:

1. Take a screenshot of:
   - Your browser's address bar (showing the URL)
   - The Google Cloud Console authorized origins section
   - The error message

2. Check that:
   - You saved the changes in Google Cloud Console
   - You waited at least 10 minutes
   - You're using a web server
   - The URL matches exactly

## Quick Test Command

Open your browser's Developer Console (F12) and run:
```javascript
console.log(window.location.origin);
```

The output should match one of your authorized origins exactly!

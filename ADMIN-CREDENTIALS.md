# Admin Dashboard Credentials

## Default Login Credentials

**Username:** `admin`  
**Password:** `admin123`

## How to Change Admin Credentials

### Option 1: Edit admin-script.js

1. Open `admin-script.js`
2. Find this section at the top:
```javascript
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};
```
3. Change the username and password:
```javascript
const ADMIN_CREDENTIALS = {
    username: 'yourusername',
    password: 'yourpassword'
};
```
4. Save the file

### Option 2: Add Multiple Admin Users

You can modify the code to support multiple admins:

```javascript
const ADMIN_CREDENTIALS = [
    { username: 'admin', password: 'admin123' },
    { username: 'manager', password: 'manager456' },
    { username: 'coach', password: 'coach789' }
];
```

Then update the validation logic in the login form handler.

## Security Notes

⚠️ **IMPORTANT:** This is a basic authentication system for demonstration purposes.

### Current Limitations:
- Credentials are stored in JavaScript (visible to anyone)
- No encryption
- No password hashing
- Not suitable for production use

### For Production Use:

1. **Use Backend Authentication:**
   - Store credentials in a database
   - Hash passwords (bcrypt, argon2)
   - Use JWT tokens or sessions
   - Implement rate limiting

2. **Add HTTPS:**
   - Never send passwords over HTTP
   - Use SSL/TLS certificates

3. **Implement Security Features:**
   - Password strength requirements
   - Account lockout after failed attempts
   - Two-factor authentication (2FA)
   - Session timeout
   - CSRF protection

4. **Use Environment Variables:**
   - Don't hardcode credentials
   - Use .env files (not committed to git)

## Recommended Production Solutions

### Option A: Firebase Authentication
```javascript
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Admin logged in
  });
```

### Option B: Backend API
```javascript
fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
})
.then(response => response.json())
.then(data => {
    if (data.token) {
        // Store JWT token
        localStorage.setItem('adminToken', data.token);
    }
});
```

### Option C: Auth0, Okta, or Similar Services
Use professional authentication services for enterprise-grade security.

## Current Features

✅ Login form with username/password  
✅ Session persistence (stays logged in)  
✅ Logout functionality  
✅ Protected dashboard access  
✅ User-friendly error messages  

## Access Control

Currently, anyone with the credentials can access the admin dashboard. To add role-based access:

1. Add roles to user objects
2. Check roles before allowing actions
3. Restrict sensitive operations (delete, export) to specific roles

## Testing

To test the admin login:
1. Open `admin.html`
2. Enter username: `admin`
3. Enter password: `admin123`
4. Click "Login as Admin"
5. You should see the dashboard

## Logout

To logout:
1. Click the "Logout" button in the header
2. You'll be redirected to the login page
3. Session data is cleared

## Session Management

- Login status is stored in `localStorage`
- Persists across page refreshes
- Cleared on logout
- No automatic timeout (add if needed)

## Future Enhancements

Consider adding:
- [ ] Password reset functionality
- [ ] Remember me option
- [ ] Session timeout
- [ ] Activity logging
- [ ] IP-based restrictions
- [ ] Email verification
- [ ] Two-factor authentication

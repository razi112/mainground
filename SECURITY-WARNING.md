# ⚠️ SECURITY WARNING - IMPORTANT!

## DO NOT USE CLIENT SECRET IN FRONTEND CODE!

The credential you provided: `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`

This is a **Client Secret**, NOT a Client ID!

### Why This Is Dangerous:

1. **Client Secrets must be kept private** - They should NEVER be in frontend code
2. **Anyone can see frontend code** - Including malicious users
3. **Security breach** - Someone could impersonate your application
4. **Google will detect this** - And may disable your credentials

### What You Need Instead:

For Google Sign-In in web browsers, you need the **Client ID**, which looks like:
```
123456789-abcdefghijklmnop.apps.googleusercontent.com
```

### How to Find Your Client ID:

1. Go to https://console.cloud.google.com/
2. Select your project
3. Go to "APIs & Services" > "Credentials"
4. Find your OAuth 2.0 Client ID
5. You'll see TWO values:
   - **Client ID** ✅ (ends with .apps.googleusercontent.com) - USE THIS
   - **Client Secret** ❌ (starts with GOCSPX-) - NEVER USE IN FRONTEND

### Immediate Action Required:

Since you've shared your Client Secret, you should:

1. **Regenerate your Client Secret immediately:**
   - Go to Google Cloud Console
   - Go to Credentials
   - Click on your OAuth 2.0 Client ID
   - Click "Reset Secret"
   - This will invalidate the old secret

2. **Never share the new secret**

3. **Use only the Client ID in this application**

### Client Secret vs Client ID:

| Type | Format | Usage | Visibility |
|------|--------|-------|------------|
| **Client ID** | `123...apps.googleusercontent.com` | Frontend (browser) | ✅ Public - Safe to expose |
| **Client Secret** | `GOCSPX-...` | Backend (server) only | ❌ Private - NEVER expose |

### For This Application:

This is a **frontend-only** application that runs in the browser. You only need:
- ✅ Client ID (safe to use)
- ❌ NOT Client Secret (never use in frontend)

### What to Do Now:

1. Go to Google Cloud Console
2. Find your OAuth 2.0 Client ID (not the secret)
3. Copy the Client ID (the one ending in .apps.googleusercontent.com)
4. Update config.js with the Client ID
5. Reset your Client Secret to invalidate the exposed one

## Example:

**CORRECT (Client ID):**
```javascript
const GOOGLE_CONFIG = {
    clientId: '123456789-abc123def456.apps.googleusercontent.com',
};
```

**WRONG (Client Secret):**
```javascript
const GOOGLE_CONFIG = {
    clientId: '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', // ❌ NEVER DO THIS!
};
```

## Need Help?

If you're having trouble finding your Client ID, please:
1. Check the Google Cloud Console Credentials page
2. Look for the value that ends with `.apps.googleusercontent.com`
3. That's your Client ID - use that one!

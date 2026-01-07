# Gmail Authentication Setup Guide

## Overview
Your Planner app now includes Gmail authentication! Users can log in with their Gmail account, and monthly task summaries will be sent to their registered Gmail address.

## Setup Instructions

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown and select "NEW PROJECT"
3. Enter a project name (e.g., "Planner App")
4. Click "CREATE"

### Step 2: Enable Google+ API
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and press "ENABLE"

### Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "CREATE CREDENTIALS" > "OAuth client ID"
3. If prompted, click "CONFIGURE CONSENT SCREEN"
   - Choose "External" for user type
   - Fill in the required fields (App name, User support email, etc.)
   - Add scopes: `email`, `profile`
   - Add test users (your Gmail account)
   - Save and continue
4. Back to Credentials, click "CREATE CREDENTIALS" > "OAuth client ID"
5. Select "Web application"
6. Add Authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - Your production domain (e.g., `https://yourdomain.com`)
7. Add Authorized redirect URIs:
   - `http://localhost:3000/` (for development)
   - Your production URL
8. Click "CREATE"
9. Copy your **Client ID**

### Step 4: Update Your App with Client ID
1. Open `src/components/Login.js`
2. Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Client ID:
   ```javascript
   <GoogleOAuthProvider clientId="591829103190-tic53mfq898g8a2gvda27citkqllonuk.apps.googleusercontent.com">
   ```

### Step 5: Test the App
1. Run `npm start` in the `my-app` directory
2. Go to `http://localhost:3000`
3. Click "Get Started"
4. Click the Google login button
5. Sign in with your Gmail account
6. You should be redirected to the planner

## Features Implemented

### 1. Gmail Login
- Users can sign in with their Gmail account
- User profile picture and name are displayed in the header
- Session persists across page refreshes

### 2. User Dashboard
- Display logged-in user's name, email, and profile picture
- Logout button to clear session and return to home page

### 3. Automatic Gmail Export
- Monthly task summaries are sent to the **registered Gmail address**
- Email pre-filled with subject: "My Planner Tasks - [Month Year]"
- Email includes:
  - Total task count for the month
  - Tasks grouped by date
  - Category, title, and notes for each task

### 4. Data Isolation (Optional Future Enhancement)
- Currently, planner data is stored locally in localStorage
- For production, consider adding backend synchronization:
  - Store user data in a database (Firebase, MongoDB, etc.)
  - Link entries to user's Gmail account
  - Enable multi-device sync

## Security Considerations

⚠️ **Important for Production:**
- Never commit your Client ID to public repositories
- Use environment variables for sensitive data:
  ```javascript
  // In production, use environment variables
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
  ```
- Enable HTTPS for your production domain
- Implement backend verification of JWT tokens
- Never trust tokens on the client side alone

## Troubleshooting

### "Google is not defined"
- Make sure `@react-oauth/google` is installed: `npm install @react-oauth/google`

### Login button doesn't work
- Check that your Client ID is correct in `Login.js`
- Verify that your domain is in "Authorized JavaScript origins"
- Check browser console for error messages

### Email not sending
- Make sure you're logged in with the correct Gmail account
- Check that the month has at least one task
- Verify that the email format is correct

### Page stays on login screen
- Clear localStorage: `localStorage.clear()` in console
- Refresh the page
- Try logging in again

## File Changes Made

1. **New Files Created:**
   - `src/components/Login.js` - Gmail OAuth login component
   - `src/styles/login.css` - Login page styling

2. **Files Modified:**
   - `src/App.js` - Added login route and auth protection
   - `src/components/Intro.js` - Navigation to login page
   - `src/components/Maintool.js` - User info display and logout
   - `src/components/main.css` - Header styling for user info
   - `src/components/Planner.js` - Accept userEmail prop
   - `src/components/ExportImport.js` - Use registered email for exports
   - `package.json` - Added dependencies

3. **Dependencies Added:**
   - `@react-oauth/google` - Google OAuth integration
   - `jwt-decode` - JWT token decoding

## Next Steps

1. Set up your Google OAuth credentials (follow steps above)
2. Update the Client ID in `src/components/Login.js`
3. Run `npm start` and test the login flow
4. Deploy to your production domain
5. Update authorized domains in Google Cloud Console

---

**Need help?** Refer to the [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)

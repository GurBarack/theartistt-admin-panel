# Email Setup Guide for OTP Verification

## Quick Setup (Gmail)

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Enable 2-Factor Authentication if not already enabled

### 2. Generate App Password
- Go to Google Account → Security → 2-Step Verification
- Scroll down to "App passwords"
- Generate a new app password for "Mail"
- Copy the 16-character password

### 3. Update Environment Variables
Update your `.env.local` file with your Gmail credentials:

```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-16-character-app-password
EMAIL_FROM=noreply@theartistt.com
```

### 4. Restart Development Server
```bash
npm run dev
```

## Alternative Email Services

### SendGrid
```env
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=apikey
EMAIL_SERVER_PASSWORD=your-sendgrid-api-key
```

### Resend
```env
EMAIL_SERVER_HOST=smtp.resend.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=resend
EMAIL_SERVER_PASSWORD=your-resend-api-key
```

## Testing

1. Start the development server: `npm run dev`
2. Go to `http://localhost:3000/onboarding`
3. Enter your email address
4. Check your email for the 6-digit OTP code

## Troubleshooting

- **"Invalid login"**: Check your app password is correct
- **"Connection timeout"**: Check your internet connection and firewall
- **"Authentication failed"**: Make sure 2FA is enabled and app password is generated
- **No email received**: Check spam folder, verify email address is correct

## Security Notes

- Never commit your `.env.local` file to version control
- Use app passwords instead of your main account password
- Consider using a dedicated email service for production

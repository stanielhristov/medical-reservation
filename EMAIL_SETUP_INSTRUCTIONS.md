# Email Setup Instructions for Forgot Password Feature

## Current Issues Fixed

✅ **Email Service Implementation**: Enabled actual email sending (was commented out)
✅ **Email Configuration**: Added proper JavaMailSender bean configuration
✅ **Error Handling**: Improved error handling and logging
✅ **Dependencies**: Confirmed spring-boot-starter-mail is included

## Required Setup Steps

### 1. Configure Email Credentials

Open `src/main/resources/application.properties` and update these lines:

```properties
# Replace these with your actual email credentials
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

### 2. Gmail Setup (Recommended)

If using Gmail, follow these steps:

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to https://myaccount.google.com/
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
   - Use this generated password (not your regular Gmail password)

3. **Update application.properties**:
```properties
spring.mail.username=your-gmail@gmail.com
spring.mail.password=your-generated-app-password
```

### 3. Alternative Email Providers

#### For Outlook/Hotmail:
```properties
spring.mail.host=smtp-mail.outlook.com
spring.mail.port=587
spring.mail.username=your-email@outlook.com
spring.mail.password=your-password
```

#### For Yahoo:
```properties
spring.mail.host=smtp.mail.yahoo.com
spring.mail.port=587
spring.mail.username=your-email@yahoo.com
spring.mail.password=your-app-password
```

#### For Development/Testing (MailTrap):
```properties
spring.mail.host=sandbox.smtp.mailtrap.io
spring.mail.port=2525
spring.mail.username=your-mailtrap-username
spring.mail.password=your-mailtrap-password
```

### 4. Testing the Implementation

1. **Start your Spring Boot application**
2. **Test with existing email**: Try forgot password with an email that exists in your database
3. **Test with non-existing email**: Try with an email that doesn't exist
4. **Check console logs**: Look for success/error messages in your application logs

### 5. Development vs Production Behavior

**Current Configuration (Development-friendly)**:
- Always returns "success" message to frontend
- Logs detailed information to console
- For non-existing emails, logs warning but doesn't send email
- Email sending failures will throw exceptions

**For Production**:
- Uncomment line 91 in `AuthServiceImpl.java` to throw exception for non-existing emails
- Consider always returning success for security (prevents email enumeration)
- Reduce console logging
- Set up proper monitoring for email failures

### 6. Troubleshooting

**Common Issues**:

1. **Authentication Failed**: 
   - Ensure you're using App Password for Gmail
   - Check if 2FA is enabled

2. **Connection Timeout**:
   - Check firewall settings
   - Verify SMTP host and port

3. **SSL/TLS Issues**:
   - For Gmail, ensure `starttls.enable=true`
   - Check `ssl.trust` configuration

**Enable Debug Mode**:
Add to `application.properties`:
```properties
logging.level.org.springframework.mail=DEBUG
```

Or set `mail.debug=true` in `EmailConfiguration.java`

### 7. Security Considerations

- **Never commit real credentials** to version control
- **Use environment variables** for production:
  ```properties
  spring.mail.username=${EMAIL_USERNAME}
  spring.mail.password=${EMAIL_PASSWORD}
  ```
- **Consider email rate limiting** to prevent abuse
- **Validate email format** on both frontend and backend

### 8. Testing Checklist

- [ ] Email credentials configured
- [ ] Application starts without errors
- [ ] Forgot password works with existing email
- [ ] Email is received in inbox (check spam folder)
- [ ] Reset link works and redirects to reset password page
- [ ] Password reset completes successfully
- [ ] Confirmation email is sent after password reset

### 9. Next Steps

After email is working:
1. Implement the Reset Password page frontend
2. Add email rate limiting
3. Add proper email templates
4. Set up monitoring for email delivery
5. Consider using a professional email service for production

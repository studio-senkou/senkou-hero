# Email Service Setup Guide

This guide helps you set up email functionality for the contact form in your Next.js application.

## Available Email Services

### 1. Resend (Recommended) ⭐

**Pros:**

- Easy to set up
- Good free tier (3,000 emails/month)
- Great deliverability
- Built for developers

**Setup:**

```bash
pnpm add resend
```

**Environment Variables:**

```env
RESEND_API_KEY=your_resend_api_key
```

**Configuration:**

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add your domain (optional for testing)
4. Uncomment the Resend code in `/src/lib/email-service.ts`
5. Update the API route to use `sendEmailWithResend`

### 2. Nodemailer (Custom SMTP)

**Pros:**

- Works with any SMTP provider
- Full control over email sending
- Supports Gmail, Outlook, custom servers

**Setup:**

```bash
pnpm add nodemailer @types/nodemailer
```

**Environment Variables:**

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

**For Gmail:**

1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password as SMTP_PASS

**Configuration:**

1. Uncomment the Nodemailer code in `/src/lib/email-service.ts`
2. Update the API route to use `sendEmailWithNodemailer`

### 3. EmailJS (Client-side)

**Pros:**

- No server-side setup required
- Free tier available
- Works directly from the browser

**Setup:**

```bash
pnpm add @emailjs/browser
```

**Environment Variables:**

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Quick Start (Development)

For development/testing, the current setup logs contact form submissions to the console. No additional setup required!

1. Fill out the contact form
2. Check your server console for the logged message
3. The form will show a success message

## Production Setup

### Option 1: Use Resend (Easiest)

1. Install Resend:

   ```bash
   pnpm add resend
   ```

2. Add to `.env.local`:

   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```

3. Update `/src/app/api/contact/route.ts`:

   ```typescript
   // Change this line:
   const result = await logContactForm(body)

   // To this:
   const result = await sendEmailWithResend(body)
   ```

4. Uncomment the Resend code in `/src/lib/email-service.ts`

### Option 2: Use Gmail SMTP

1. Install Nodemailer:

   ```bash
   pnpm add nodemailer @types/nodemailer
   ```

2. Add to `.env.local`:

   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

3. Update `/src/app/api/contact/route.ts`:

   ```typescript
   // Change this line:
   const result = await logContactForm(body)

   // To this:
   const result = await sendEmailWithNodemailer(body)
   ```

4. Uncomment the Nodemailer code in `/src/lib/email-service.ts`

## Testing

1. Start your development server:

   ```bash
   pnpm dev
   ```

2. Navigate to `/contact`

3. Fill out and submit the form

4. Check your console (development) or email (production) for the message

## Troubleshooting

### Common Issues

1. **"Email service not configured"**

   - Make sure you've uncommented the appropriate service code
   - Check your environment variables

2. **Gmail SMTP not working**

   - Enable 2-factor authentication
   - Use an App Password instead of your regular password
   - Check that "Less secure app access" is enabled (if not using App Password)

3. **Resend emails not sending**

   - Verify your API key is correct
   - Check your domain verification status
   - Ensure you're not exceeding rate limits

4. **Environment variables not loading**
   - Restart your development server after adding new env vars
   - Make sure `.env.local` is in your project root
   - Check there are no spaces around the `=` sign

## Security Notes

- Never commit environment variables to git
- Use different API keys for development and production
- Consider rate limiting the contact form endpoint
- Add CAPTCHA for production use to prevent spam

## Next Steps

- Add email templates for better formatting
- Implement email queues for better reliability
- Add auto-reply functionality
- Set up email analytics and tracking

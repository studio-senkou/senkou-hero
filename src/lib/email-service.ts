interface ContactData {
  name: string
  email: string
  subject: string
  message: string
}

interface EmailResult {
  success: boolean
  data?: unknown
  error?: string
}

export async function sendEmailWithResend(): Promise<EmailResult> {
  //   data: ContactData,
  try {
    // Uncomment and use this when you install resend
    /*
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const result = await resend.emails.send({
      from: 'Hero Contact <contact@yourdomain.com>',
      to: ['hero@gmail.com'], // Your email
      subject: `Contact Form: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: data.email
    })
    
    return { success: true, data: result }
    */

    console.log(
      'Resend not configured. Install resend package and add API key.',
    )
    return { success: false, error: 'Email service not configured' }
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred'
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof (error as Error).message === 'string'
    ) {
      errorMessage = (error as Error).message
    }
    return { success: false, error: errorMessage }
  }
}

export async function sendEmailWithNodemailer(): Promise<EmailResult> {
  //   data: ContactData,
  try {
    // Uncomment and use this when you install nodemailer
    /*
    const nodemailer = require('nodemailer')
    
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
    
    const mailOptions = {
      from: `"${data.name}" <${process.env.SMTP_USER}>`,
      to: 'hero@gmail.com',
      subject: `Contact Form: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: data.email
    }
    
    const info = await transporter.sendMail(mailOptions)
    return { success: true, data: info }
    */

    console.log(
      'Nodemailer not configured. Install nodemailer and add SMTP config.',
    )
    return { success: false, error: 'Email service not configured' }
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred'
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof (error as Error).message === 'string'
    ) {
      errorMessage = (error as Error).message
    }
    return { success: false, error: errorMessage }
  }
}

export async function logContactForm(data: ContactData): Promise<EmailResult> {
  console.log('=== NEW CONTACT FORM SUBMISSION ===')
  console.log('Name:', data.name)
  console.log('Email:', data.email)
  console.log('Subject:', data.subject)
  console.log('Message:', data.message)
  console.log('Timestamp:', new Date().toISOString())
  console.log('=====================================')

  return { success: true, data: 'Logged to console' }
}

import { NextRequest, NextResponse } from 'next/server'
import {
  logContactForm,
  //   sendEmailWithResend,
  //   sendEmailWithNodemailer,
} from '@hero/lib/email-service'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      )
    }

    // Send email using the configured service
    // You can choose which service to use by uncommenting the desired option

    // Option 1: Use Resend (recommended)
    // const result = await sendEmailWithResend(body)

    // Option 2: Use Nodemailer (for custom SMTP)
    // const result = await sendEmailWithNodemailer(body)

    // Option 3: Log to console (for development/testing)
    const result = await logContactForm(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully! We will get back to you soon.',
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error sending contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 },
    )
  }
}

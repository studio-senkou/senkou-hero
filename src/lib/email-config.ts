export interface EmailConfig {
  service: 'resend' | 'nodemailer' | 'emailjs'
  apiKey?: string
  smtpConfig?: {
    host: string
    port: number
    user: string
    pass: string
  }
}

export const resendConfig: EmailConfig = {
  service: 'resend',
  apiKey: process.env.RESEND_API_KEY,
}

export const nodemailerConfig: EmailConfig = {
  service: 'nodemailer',
  smtpConfig: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
}

export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
}

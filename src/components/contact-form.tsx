'use client'

import { useState } from 'react'
import { Button } from '@hero/components/ui/button'
import { Input } from '@hero/components/ui/input'
import { Textarea } from '@hero/components/ui/textarea'
import { Loader2, Mail, CheckCircle, AlertCircle } from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: result.message || 'Message sent successfully!',
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.',
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid =
    formData.name && formData.email && formData.subject && formData.message

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 justify-start flex-3 w-full p-4 md:p-8 shadow-sm rounded-xl bg-white h-full ${className || ''}`}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Type your full name here..."
          className="w-full p-6"
          required
          disabled={isLoading}
        />
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Type your email here..."
          className="w-full p-6"
          required
          disabled={isLoading}
        />
      </div>
      <Input
        name="subject"
        value={formData.subject}
        onChange={handleInputChange}
        placeholder="Write your message subject here..."
        className="w-full p-6"
        required
        disabled={isLoading}
      />
      <Textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Write your description here..."
        className="w-full p-6"
        rows={4}
        required
        disabled={isLoading}
      />

      {/* Status Message */}
      {status.type && (
        <div
          className={`flex items-center gap-2 p-3 rounded-md ${
            status.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          <span className="text-sm">{status.message}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="max-w-fit rounded-full bg-[#00B207] hover:bg-[#009906] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}

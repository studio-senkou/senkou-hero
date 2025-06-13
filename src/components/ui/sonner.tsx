'use client'

import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-right"
      closeButton
      expand={true}
      visibleToasts={9}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg group-[.toaster]:p-4 group-[.toaster]:text-sm group-[.toaster]:font-medium',
          description:
            'group-[.toast]:text-gray-700 group-[.toast]:text-xs group-[.toast]:mt-1',
          actionButton:
            'group-[.toast]:bg-[#00B207] group-[.toast]:text-white group-[.toast]:border-none group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-2 group-[.toast]:text-xs group-[.toast]:font-semibold group-[.toast]:cursor-pointer hover:group-[.toast]:bg-[#009606] group-[.toast]:transition-colors',
          cancelButton:
            'group-[.toast]:bg-gray-200 group-[.toast]:text-gray-900 group-[.toast]:border-none group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-2 group-[.toast]:text-xs group-[.toast]:font-medium group-[.toast]:cursor-pointer hover:group-[.toast]:bg-gray-300 group-[.toast]:transition-colors',
          closeButton:
            'group-[.toast]:bg-gray-200 group-[.toast]:text-gray-900 group-[.toast]:border-none group-[.toast]:rounded group-[.toast]:w-5 group-[.toast]:h-5 group-[.toast]:cursor-pointer hover:group-[.toast]:bg-gray-300 group-[.toast]:transition-colors',
          success:
            '!group-[.toaster]:bg-app-primary-base/10 !group-[.toaster]:text-app-primary-base !group-[.toaster]:border-app-primary-base',
          error:
            '!group-[.toaster]:bg-red-50 !group-[.toaster]:text-red-800 !group-[.toaster]:border-red-200',
          warning:
            '!group-[.toaster]:bg-yellow-50 !group-[.toaster]:text-yellow-800 !group-[.toaster]:border-yellow-200',
          info: '!group-[.toaster]:bg-blue-50 !group-[.toaster]:text-blue-800 !group-[.toaster]:border-blue-200',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

// Input com label acima e suporte a erro e dica
import { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-xs font-medium uppercase tracking-wider text-[#6B7280]"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          'w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-[10px] px-4 py-2.5',
          'text-sm text-[#111827] placeholder-[#9CA3AF]',
          'focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]',
          'transition-colors duration-150',
          error && 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]',
          className
        )}
        {...props}
      />
      {hint && !error && <p className="text-xs text-[#6B7280]">{hint}</p>}
      {error && <p className="text-xs text-[#DC2626]">{error}</p>}
    </div>
  )
}

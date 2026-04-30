// Card base reutilizável com variante elevada
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
  hover?: boolean
}

export function Card({ elevated = false, hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-6',
        elevated
          ? 'bg-[#FFFFFF] border-[#E5E7EB] shadow-sm'
          : 'bg-[#F9FAFB] border-[#E5E7EB]',
        hover && 'hover:border-[#7C3AED]/40 hover:shadow-lg hover:shadow-purple-100 hover:scale-[1.01] transition-all duration-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Avatar com iniciais do nome — sem foto no MVP
interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  // Pega iniciais: primeiro e último nome
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')

  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  }

  return (
    <div
      className={`${sizes[size]} rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center font-semibold text-[#7C3AED] flex-shrink-0`}
    >
      {initials}
    </div>
  )
}

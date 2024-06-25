import { ComponentProps, ElementType } from 'react'

type IconProps = ComponentProps<'span'> & {
    icon: ElementType
}

export function Icon({ icon: Icon, ...props }: IconProps) {
           //DollarSign
  return (
    <span {...props} className='flex'>
        <Icon className="size-5 m-2" />
        <span className='border-r border-zinc-300 pr-2' />
    </span>
  )
}

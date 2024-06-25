import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { InviteSchemaDTO } from '../../../Schema'
import { UseFormRegister } from 'react-hook-form'

//type NameType = 'id' | 'email' | 'amount' | 'phone' | 'createdAt' | 'eventID';
type ControlProps = ComponentProps<'input'> & {
  register?: UseFormRegister<InviteSchemaDTO>
  required?: boolean
}


export function Control({ type='text', register, required, ...props }: ControlProps) {
  return (
    <input 
    {...props}
      type={type} 
      className={twMerge(`w-full p-3 bg-transparent rounded text-sm placeholder:text-zinc-400 outline-none ring-0`, props.className)       
      } 
      />
  )
}

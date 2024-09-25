
import { Dialog } from "../..";
import * as Input from "../../../form/Input";
import { Root } from "../../../form/Root";
import { Label } from "../../../form/Label";
import { AtSign, Link, User, Users } from "lucide-react";
import { Button } from "../../../form/Button";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { type UserDTO, userSchema } from "../../../../Schema/user";
import { useUser } from "../../../../context/user";




type DialogCreateUserProps = {
  onClose: () => void
}



export function DialogCreatUser({ onClose }: DialogCreateUserProps) {

  const { create, user } = useUser()

  const { formState: { errors }, register, handleSubmit } = useForm<UserDTO>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: user?.email ?? '',
      fullname: user?.fullname ?? '',
      url: user?.url ?? ''
    }
  })

  const onSubimt = (data: UserDTO) => {
    create(data)
    toast.success('User Data created')
    onClose()

  }

  return (
    <Dialog onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-zinc-600">User Profile</h3>
        <div className="flex flex-col items-center gap-2">
          {
            user?.url ? <img className="ring-2 ring-offset-4 ring-blue-500 size-20 rounded-full" src={user?.url} alt="" /> : <User className="size-20 rounded-full p-4 text-stone-50 bg-zinc-300" />
          }
          <span className="flex flex-wrap flex-col justify-center items-center text-stone-700 gap-2">
            <h5 className="font-semibold sm:font-bold text-lg sm:text-xl">{user?.fullname}</h5>
            <span className="font-medium text-sm">{user?.email ?? 'No E-mail Address'}</span>
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubimt)} className="flex flex-col gap-4">
          <Root>
            <Label className="text-gray-100">Full Name</Label>
            <Input.Wrapper>
              <Input.Icon icon={Users} className="" />
              <Input.Control
                type="text"
                id="fullname"
                placeholder="What's your full name"
                className="placeholder:italic"
                {...register('fullname')}
              />
            </Input.Wrapper>
            {
              errors.fullname && <span className="text-sm text-rose-600">{errors.fullname.message}</span>
            }
          </Root>
          <Root>
            <Label>E-mail</Label>
            <Input.Wrapper>
              <Input.Icon icon={AtSign} />
              <Input.Control
                type="email"
                id="email"
                className="placeholder:italic"
                placeholder="Enter your email!"
                {...register('email')}
              />
            </Input.Wrapper>
            {errors.email && <span className="text-sm text-rose-600">{errors.email.message}</span>}
          </Root>
          <Root>
            <Label>Image URL</Label>
            <Input.Wrapper>
              <Input.Icon icon={Link} />
              <Input.Control
                type="url"
                className="placeholder:italic"
                placeholder="Insert your image URL here!"
                {...register('url')}
              />
            </Input.Wrapper>
            {
              errors.url && <span className="text-sm text-rose-600">{errors.url.message}</span>
            }
          </Root>
          <div className="mt-4">
            <Button>
              Invite
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

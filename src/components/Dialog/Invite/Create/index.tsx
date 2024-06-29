
import { Dialog } from "../..";
import * as Input from "../../../form/Input";
import { Root } from "../../../form/Root";
import { Label } from "../../../form/Label";
import { AtSign, Phone, Users } from "lucide-react";
import { FormEvent } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useEvents } from "../../../../context";
import { Button } from "../../../form/Button";
import { useForm } from 'react-hook-form'
import { CreateInviteSchema, CreateInviteSchemaDTO, FullInviteSchemaDTO, InviteSchema, InviteSchemaDTO } from "../../../../Schema";
import { zodResolver } from "@hookform/resolvers/zod";



type DiologCreatEvetnsProps = {
  onClose: () => void
  eventID: string
}



export function DiologCreatInvited({ onClose, eventID }: DiologCreatEvetnsProps) {

  const { formState: {errors}, register, handleSubmit } = useForm<CreateInviteSchemaDTO>({
    resolver: zodResolver(CreateInviteSchema)
  })

  const { onCreateInvited } = useEvents()


  const onSubimt = (data: CreateInviteSchemaDTO) => {


    const newData: FullInviteSchemaDTO = {
      id: uuidv4(),
      eventID: eventID,
      createdAt: new Date(),
      ...data
    } 
    onCreateInvited(newData)
    onClose()
  }

  return (
    <Dialog onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-zinc-600">Convida um amigo</h3>
        <form onSubmit={handleSubmit(onSubimt)} className="flex flex-col gap-4">
          <Root>
            <Label className="text-gray-100">E-mail</Label>
            <Input.Wrapper>
            <Input.Icon icon={AtSign} className="" />
              <Input.Control
                type="email"
                id="email"
                placeholder="johndue@domain.com"
               {...register('email')}
              />
            </Input.Wrapper>
          </Root>
          <div className="grid grid-cols-2 gap-2">
          <Root>
            <Label>Quantidade de Convidados</Label>
            <Input.Wrapper>
              <Input.Icon icon={Users} />
              <Input.Control
                type="number"
                min={1}
                minLength={1}
                max={3}
                maxLength={3}
                id="amount"
                placeholder="Valor de entrada"
                {...register('amount')}
              />
            </Input.Wrapper>
          </Root>
          <Root>
            <Label>Telefone</Label>
            <Input.Wrapper>
              <Input.Icon icon={Phone} />
              <Input.Control
                type="tel"
                id="phone"
                pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
                maxLength={12}
                placeholder="000 000 000"
                {...register('phone')} 
              />
            </Input.Wrapper>
            {}
          </Root>
          </div>
          <div className="mt-4">
            <Button>
              Convidar
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

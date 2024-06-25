
import { Dialog } from "../..";
import * as Input from "../../../form/Input";
import { Root } from "../../../form/Root";
import { Label } from "../../../form/Label";
import { Phone, Users } from "lucide-react";
import { FormEvent } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useEvents } from "../../../../context";
import { Button } from "../../../form/Button";
import {  } from 'react-hook-form'


type DiologCreatEvetnsProps = {
  onClose: () => void
  eventID: string
}



export function DiologCreatInvited({ onClose, eventID }: DiologCreatEvetnsProps) {

  const { onCreateInvited } = useEvents()

  const onSubimt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newData = {
      id: uuidv4() as string,
      eventID: eventID,
      email: formData.get("email") as string,
      amount: Number(formData.get("amount")) as number,
      phone: formData.get("phone") as string,
      createdAt: new Date()
    }
    onCreateInvited(newData)
    onClose()
  }

  return (
    <Dialog onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-zinc-600">Convida um amigo</h3>
        <form onSubmit={onSubimt} className="flex flex-col gap-4">
          <Root>
            <Label className="text-gray-100">E-mail</Label>
            <Input.Wrapper>
              <Input.Control
                type="email"
                name="email"
                id="email"
                placeholder="johndue@domain.com"
                className="focus-within:ring-2 ring-blue-500"
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
                name="amount"
                id="amount"
                placeholder="Valor de entrada"
                className=""
              />
            </Input.Wrapper>
          </Root>
          <Root>
            <Label>Telefone</Label>
            <Input.Wrapper>
              <Input.Icon icon={Phone} />
              <Input.Control
                type="tel"
                name="phone"
                id="phone"
                placeholder="Telefone"
                className=""
              />
            </Input.Wrapper>
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

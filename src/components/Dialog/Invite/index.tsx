
import { Dialog } from "..";
import * as Input  from "../../form/Input";
import {Root} from "../../form/Root";
import { Label } from "../../form/Label";
import {  Users } from "lucide-react";
import { FormEvent } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Invite } from "../../../type";

interface InviteProps extends Invite {
    eventID: string
  }


type DiologCreatEvetnsProps = {
  onClose: () => void
  onInvited: (newInvite: InviteProps) => void,
  eventID: string
}



export  function DiologCreatInvited({ onClose, onInvited, eventID }: DiologCreatEvetnsProps) {
  
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
   onInvited(newData)
  }
  
  return (
    <Dialog onClose={onClose}>
      <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold text-gray-100">Convidados</h3>
      <form onSubmit={onSubimt} className="flex flex-col gap-2">
      <Root>
        <Label className="text-gray-100">E-mail</Label>
          <Input.Control
            type="email"
            name="email"
            id="email"
            placeholder="johndue@domain.com"
            className="focus-within:ring-2 ring-blue-500"
          />
        </Root>
        <Root>
          <Input.Label>Quantidade de Convidados</Input.Label>
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
        <div className="mt-4">
        <button type="submit" className="font-bold text-base p-4 w-full shadow bg-blue-500 text-gray-100 rounded">
          Convidar
        </button>
        </div>
      </form>
      </div>
    </Dialog>
  )
}

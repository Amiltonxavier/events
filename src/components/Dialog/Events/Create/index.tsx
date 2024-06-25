import { Dialog } from "../..";
import * as Input from "../../../form/Input";
import * as Select from "../../../form/Select";
import { Root } from "../../../form/Root";
import { Label } from "../../../form/Label";
import { MapPin, Users } from "lucide-react";
import { CONSTANTS } from "../../../../constants";
import { FormEvent } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Events, EVENTSTYPES } from "../../../../type";
import { Button } from "../../../form/Button";



type DiologCreatEvetnsProps = {
  onClose: () => void
  onCreateEvents: (newEvents: Events) => void
}



export function DiologCreatEvetns({ onClose, onCreateEvents }: DiologCreatEvetnsProps) {

//  const { register, handleSubmit } = useForm()
  const onSubimt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newData = {
      id: (`${formData.get("title")}-${uuidv4()}-${formData.get("type")}`).replace(/\s+/g, ''),
      title: formData.get("title") as string,
      type: formData.get("type") as EVENTSTYPES,
      date: new Date(formData.get("date") as string),
      local: formData.get("address") as string,
      code: Math.round(Math.random() * 10000).toString(),
      invite: [],
      amount: Number(formData.get("amount")) as number,
      durantion: new Date(formData.get("durantion") as string),
      createdAt: new Date()
    }
    onCreateEvents(newData)
    onClose()
  }

  return (
    <Dialog onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-zinc-700">Eventos</h3>
        <form onSubmit={onSubimt} className="flex flex-col gap-2">
          <Root>
            <Label>Título do Evento</Label>
            <Input.Wrapper>
              <Input.Control
                type="text"
                name="title"
                id="title"
                placeholder="Descrição da Transação"
                className="focus-within:ring-2 ring-blue-500"
              />
            </Input.Wrapper>
          </Root>
          <Root>
          <Label>Tipo de Evento</Label>
            <Select.Trigger name="type">
              <Select.Option selected disabled> Seleciona o Tipo de Evento</Select.Option>
              {CONSTANTS.EVENTSTYPES.map((item) => (
                <Select.Option key={item.id} defaultValue={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select.Trigger>
          </Root>
          <div className="grid sm:grid-cols-2 gap-2">
            <Root>
              <Label>Quantidade de Convidados</Label>
              <Input.Wrapper>
                <Input.Icon icon={Users} />
                <Input.Control
                  type="number"
                  min={1}
                  name="amount"
                  id="amount"
                  placeholder="Valor de entrada"
                  className=""
                />
              </Input.Wrapper>
            </Root>
            <Root>
            <Label>Local do Evento</Label>
            <Input.Wrapper>
              <Input.Icon icon={MapPin} />
              <Input.Control
                name="address"
                id="address"
                placeholder="Local do Evento"
              />
            </Input.Wrapper>
          </Root>
          </div>
          <div className="grid grid-cols-2 gap-2">
          <Root>
              <Label>Data do Evento</Label>
              <Input.Wrapper>
                <Input.Control
                  type="datetime-local"
                  name="date"
                  id="date"
                  placeholder="Data do Evento"
                />
              </Input.Wrapper>
            </Root>
            <Root>
              <Label>Termino do Evento</Label>
              <Input.Wrapper>
                <Input.Control
                  type="datetime-local"
                  name="durantion"
                  id="durantion"
                  placeholder="Termino"
                />
              </Input.Wrapper>
            </Root>
          </div>
          <div className="mt-4">
            <Button>  
                 Criar um Novo Evento
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

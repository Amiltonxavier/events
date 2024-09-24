import { Dialog } from "../..";
import * as Input from "../../../form/Input";
import * as Select from "../../../form/Select";
import { Root } from "../../../form/Root";
import { Label } from "../../../form/Label";
import { MapPin, Users } from "lucide-react";
import { CONSTANTS } from "../../../../constants";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "../../../form/Button";
import { useEvents } from "../../../../context";
import { useForm } from "react-hook-form";
import { CreatEventSchema, type CreatEventSchemaDTO } from "../../../../Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";



type DiologCreatEvetnsProps = {
  onClose: () => void
}



export function DiologCreatEvetns({ onClose }: DiologCreatEvetnsProps) {
  const { onCreateEvents } = useEvents()
  const { register, handleSubmit, formState: { errors } } = useForm<CreatEventSchemaDTO>({
    resolver: zodResolver(CreatEventSchema)
  })
  const onSubmit = (data: CreatEventSchemaDTO) => {

    onCreateEvents({
      id: uuidv4(),
      code: uuidv4(),
      createdAt: new Date(),
      invite: [],
      ...data
    })
    toast.success('New event created')
    onClose()
  }

  return (
    <Dialog onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold tracking-tight text-zinc-700">New Event</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Root>
            <Label>Event Title</Label>
            <Input.Wrapper>
              <Input.Control
                type="text"
                {...register('title')}
                placeholder="Event title"
                className="focus-within:ring-2 ring-blue-500 placeholder:italic"
              />
            </Input.Wrapper>
            {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
          </Root>
          <Root>
            <Label>Event Type</Label>
            <Select.Trigger {...register('type')}>
              <Select.Option selected disabled> Select event type </Select.Option>
              {CONSTANTS.EVENTSTYPESARRAY.map((item, index) => (
                <Select.Option key={index} defaultValue={item}>
                  {item}
                </Select.Option>
              ))}
            </Select.Trigger>
            {errors.type && <span className="text-sm text-red-600">{errors.type.message}</span>}
          </Root>
          <div className="grid sm:grid-cols-2 gap-2">
            <Root>
              <Label>Number of Guests</Label>
              <Input.Wrapper>
                <Input.Icon icon={Users} />
                <Input.Control
                  type="number"
                  min={1}
                  placeholder="number de convidados"
                  className="placeholder:italic"
                  {...register('amount')}
                />
              </Input.Wrapper>
              {errors.amount && <span className="text-sm text-red-600">{errors.amount.message}</span>}
            </Root>
            <Root>
              <Label>Event Location</Label>
              <Input.Wrapper>
                <Input.Icon icon={MapPin} />
                <Input.Control
                  {...register('local')}
                  placeholder="Event Location"
                  className="placeholder:italic"
                />
              </Input.Wrapper>
              {errors.local && <span className="text-sm text-red-600">{errors.local.message}</span>}
            </Root>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Root>
              <Label>Event Date and Time</Label>
              <Input.Wrapper>
                <Input.Control
                  type="datetime-local"
                  {...register('date')}
                  className="placeholder:italic"
                />
              </Input.Wrapper>
              {errors.date && <span className="text-sm text-red-600">{errors.date.message}</span>}
            </Root>
            <Root>
              <Label>Event End Date</Label>
              <Input.Wrapper>
                <Input.Control
                  type="datetime-local"
                  {...register('durantion')}
                  className="placeholder:italic"
                />
              </Input.Wrapper>
              {errors.durantion && <span className="text-sm text-red-600">{errors.durantion.message}</span>}
            </Root>
          </div>
          <div className="mt-4">
            <Button>
              Create new Event
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

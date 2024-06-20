import { Layout } from "../layout"
import * as Card from "../components/Card";
import { CircleArrowUp, ExternalLink, MailPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { DiologCreatEvetns } from "../components/Dialog/CreateEvents";
import { Events, Invite } from "../type";
import { Table } from "../components/table/table";
import { TableHeader } from "../components/table/table-header";
import { TableCell } from "../components/table/table-cell";
import { TableRow } from "../components/table/table-row";
import { Formatter } from "../utils";
import { DiologDetailsEvents } from "../components/Dialog/Details";
import { DiologCreatInvited } from "../components/Dialog/Invite";
import { Storage } from "../storage";


type InviteProps = Invite & {
  eventID: string
}

export function Dashboard() {

  const [events, setEvents] = useState<Events[]>(Storage.get())
  const [isDiologOpen, setIsDiologOpen] = useState(false);
  const [isDiologDetails, setIsDiologDetails ] = useState(false)
  const [selectSingleEvent, setSelectSingleEvent] = useState<Events>()
  const [ isInviteModalOpen, setIsInviteDiolog ] = useState(false)

  const formatterDate = new Formatter()

  const handleOpenDiolog = () => {
    setIsDiologOpen(true)
  }

  const handleCloseDiolog = () => {
    setIsDiologOpen(false)
  }

  const onDetailsDiologOpen = (id: string) => {
    setIsDiologDetails(true)
    SelectEvent(id)
  }
  const onDetailsDiologClose = () => {
    setIsDiologDetails(false)
  }
  const OnOpenInviteDiolog = (id: string) => {
    SelectEvent(id)
    setIsInviteDiolog(true);
  }
  const onCloseInviteDiolog = () => {
    setIsInviteDiolog(false);
  }

  const SelectEvent = (selectEventId: string) => {
    setSelectSingleEvent(events.find((event) => event.id === selectEventId))

  }

  const onCreateEvents = (newEvents: Events) => {
    if (!newEvents || newEvents.date.getTime() < new Date().getTime())
      throw Error('Errou ao Criar um Evento')
      setEvents(prevEvents => [...prevEvents, newEvents])
      localStorage.setItem('events', JSON.stringify([...events, newEvents]))
      //Storage.post(JSON.stringify([...events, newEvents]))
      handleCloseDiolog()
  }

  const onInvited = (newInvite: InviteProps ) => {
    
    const { eventID } = newInvite

    const result = events.map((event) =>
      event.id === eventID
        ? {
            ...event,
            invite: [...(event.invite || []), newInvite], // Handle potential missing invite array
          }
        : event
    )

    setEvents(result);
  onCloseInviteDiolog()
  console.log(events)
}

 

  return (
    <Layout>
      <section className="w-full h-40 bg-slate-950 px-8">
        <div className="flex justify-between w-full items-center mt-5">
          <h1 className="text-4xl font-bold text-white block">Events</h1>
          <div className="w-full flex sm:flex-row justify-end">
            <button onClick={handleOpenDiolog} className="text-gray-100 px-4 bg-blue-500 py-2 h-10 rounded">Novo Evento</button>
          </div>
        </div>
      </section>
      <section className="w-full px-8 grid sm:grid-cols-3 gap-4 -mt-20">
        <Card.Root>
          <Card.Wrapper>
            <Card.Content title="Total de eventos" amount='30' />
          </Card.Wrapper>
          <Card.Icon icon={CircleArrowUp} className="text-green-700" />
        </Card.Root>
        <Card.Root>
          <Card.Wrapper>
            <Card.Content title="Total de Pendentes" amount='30' />
          </Card.Wrapper>
          <Card.Icon icon={CircleArrowUp} className="text-green-700" />
        </Card.Root>
        <Card.Root>
          <Card.Wrapper>
            <Card.Content title="Realizados" amount='30' />
          </Card.Wrapper>
          <Card.Icon icon={CircleArrowUp} className="text-green-700" />
        </Card.Root>
      </section>
      <section className="px-8">
        <div className="text-gray-100">
          <Table>
            <thead>
              <tr className="border-b border-white/10">
                <TableHeader style={{ width: 48 }}>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border border-white/10"
                  />
                </TableHeader>
                <TableHeader>Título</TableHeader>
                <TableHeader>Tipo de evento</TableHeader>
                <TableHeader>Data do Evento</TableHeader>
                <TableHeader style={{ width: 64 }}>Data de criação</TableHeader>
                <TableHeader></TableHeader>
              </tr>
            </thead>
            <tbody>
              {
               events && events.sort((a,b) => a.createdAt.getTime() - b.createdAt.getTime()).map((event) => (
                  <TableRow key={event.id} className="overflow-auto">
                    <TableCell>
                      <input
                        type="checkbox"
                        className="size-4 bg-black/20 rounded border border-white/10"
                      />
                    </TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.type}</TableCell>
                    <TableCell>{formatterDate.formatterDate(event.date)}</TableCell>
                    <TableCell>{formatterDate.formatterDate(event.createdAt)}</TableCell>
                    <TableCell className="rounded-tr-md round-br-md">
                      <button onClick={() => onDetailsDiologOpen(event.id)}>
                        <ExternalLink />
                      </button>
                      <a href={`/events/${event.id}`}  className="">
                        <MailPlus />
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              }
            </tbody>
          </Table>
        </div>
      </section>
      {isDiologOpen && <DiologCreatEvetns onCreateEvents={onCreateEvents} onClose={handleCloseDiolog} />}
      {isDiologDetails && selectSingleEvent && <DiologDetailsEvents onClose={onDetailsDiologClose} data={selectSingleEvent} />}
    </Layout>
  )
}



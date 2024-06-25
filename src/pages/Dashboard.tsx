import { Layout } from "../layout"
import * as Card from "../components/Card";
import { CircleArrowUp, ExternalLink, MailPlus } from "lucide-react";
import { useState } from "react";
import { DiologCreatEvetns } from "../components/Dialog/Events/Create";
import { Events } from "../type";
import { Table } from "../components/table/table";
import { TableHeader } from "../components/table/table-header";
import { TableCell } from "../components/table/table-cell";
import { TableRow } from "../components/table/table-row";
import { Formatter, Total } from "../utils";
import { DiologDetailsEvents } from "../components/Dialog/Events/Details";
import { useEvents } from "../context";



export function Dashboard() {

  const { events, onCreateEvents } = useEvents()
  const [isDiologOpen, setIsDiologOpen] = useState(false);
  const [isDiologDetails, setIsDiologDetails] = useState(false)
  const [selectSingleEvent, setSelectSingleEvent] = useState<Events>()
  const formatterDate = new Formatter()
  const total = new Total()
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
  const SelectEvent = (selectEventId: string) => {
    setSelectSingleEvent(events.find((event) => event.id === selectEventId))
  }

  /*   const onCreateEvents = (newEvents: Events) => {
      if (!newEvents || newEvents.date.getTime() < new Date().getTime())
        throw Error('Errou ao Criar um Evento')
        setEvents(prevEvents => [...prevEvents, newEvents])
        Storage.post(JSON.stringify([...events, newEvents]))
    } */


  

  return (
    <Layout>
      <section className="w-full h-40 bg-orange-400 px-8">
        <div className="flex justify-between w-full items-center mt-5">
          <h1 className="text-4xl font-bold text-white block">Events</h1>
          <div className="w-full flex sm:flex-row justify-end">
            <button onClick={handleOpenDiolog} className="text-gray-100 font-medium bg-blue-500 px-4 py-4 rounded hover:bg-blue-500/90">Novo Evento</button>
          </div>
        </div>
      </section>
      <section className="w-full px-8 grid sm:grid-cols-3 gap-4 -mt-20">
        <Card.Root>
          <Card.Wrapper>
            <Card.Content title="Total de eventos" amount={total.TotalEvent(events)} />
          </Card.Wrapper>
          <Card.Icon icon={CircleArrowUp} className="text-orange-400" />
        </Card.Root>
        <Card.Root>
          <Card.Wrapper>
            <Card.Content title="Total de Pendentes" amount='30' />
          </Card.Wrapper>
          <Card.Icon icon={CircleArrowUp} className="text-green-700" />
        </Card.Root>
        <Card.Root>
          <Card.Wrapper>
            <Card.Content title="Realizados" amount={total.TotalOfFinally(events)} />
          </Card.Wrapper>
          <Card.Icon icon={CircleArrowUp} className="text-green-700" />
        </Card.Root>
      </section>
      <section className="mx-8 bg-white p-4">
        <div className="text-gray-100">
          <Table>
            <thead>
              <tr className="border-b border-zinc-400">
                <TableHeader style={{ width: 48 }}>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border border-zinc-700"
                  />
                </TableHeader>
                <TableHeader>Título</TableHeader>
                <TableHeader>Tipo de evento</TableHeader>
                <TableHeader>Data do Evento</TableHeader>
                <TableHeader>Data de criação</TableHeader>
                <TableHeader></TableHeader>
              </tr>
            </thead>
            <tbody>
              {
                events && events.length > 0 && events.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map((event) => (
                  <TableRow key={event.id} className="overflow-auto hover:bg-transparent/20 cursor-pointer">
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
                    <TableCell className="rounded-tr-md round-br-md flex gap-2 justify-end">
                      <button onClick={() => onDetailsDiologOpen(event.id)} className="">
                        <ExternalLink className="size-6 hover:text-blue-500 duration-150 transition-colors" />
                      </button>
                      <a href={`/events/${event.id}`} className="hover:text-blue-500 duration-150 transition-colors">
                        <MailPlus className="size-6" />
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



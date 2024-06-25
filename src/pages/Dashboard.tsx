import { Layout } from "../layout"
import * as Card from "../components/Card";
import { BadgePlus, CheckCheck, CircleArrowUp, ExternalLink, MailPlus } from "lucide-react";
import { useState } from "react";
import { DiologCreatEvetns } from "../components/Dialog/Events/Create";
import { Events } from "../type";
import { Table } from "../components/table/table";
import { TableHeader } from "../components/table/table-header";
import { TableCell } from "../components/table/table-cell";
import { TableRow } from "../components/table/table-row";
import { eventStatus, Formatter, TotalEvents } from "../utils";
import { DiologDetailsEvents } from "../components/Dialog/Events/Details";
import { useEvents } from "../context";



export function Dashboard() {

  const { events, onCreateEvents } = useEvents()
  const [isDiologOpen, setIsDiologOpen] = useState(false);
  const [isDiologDetails, setIsDiologDetails] = useState(false)
  const [selectSingleEvent, setSelectSingleEvent] = useState<Events>()
  const formatterDate = new Formatter()
  const total = new TotalEvents()
  const handleOpenDialog = () => {
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
  return (
    <Layout
      sectionButton={
        <button
          onClick={handleOpenDialog}
          className="text-gray-100 font-medium bg-blue-500 px-4 py-4 rounded hover:bg-blue-500/90 flex gap-4 items-center ring-4 focus-within:ring-blue-600 outline-none"
        >
          Novo Evento <BadgePlus />
        </button>
      }
    >
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
          <Card.Icon icon={CheckCheck} className="text-orange-400" />
        </Card.Root>
        <Card.Root>
          <Card.Wrapper>
            <Card.Content title="Realizados" amount={total.TotalOfFinally(events)} />
          </Card.Wrapper>
          <Card.Icon icon={CheckCheck} className="text-orange-400" />
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
                <TableHeader>Duração do Evento</TableHeader>
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
                    <TableCell className="font-semibold">{event.title}</TableCell>
                    <TableCell>{event.type}</TableCell>
                    <TableCell className={`font-medium`}>
                      <span className={`${eventStatus(event.date,event.durantion).color } ${eventStatus(event.date,event.durantion).bg} p-2 rounded-2xl`}>
                        {eventStatus(event.date,event.durantion).status}
                      </span>
                      </TableCell>
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



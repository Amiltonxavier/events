import { Layout } from "../layout"
import { BadgePlus, ExternalLink, MailPlus, Trash, Users } from "lucide-react";
import { useState } from "react";
import { DiologCreatEvetns } from "../components/Dialog/Events/Create";
import { Events } from "../type";
import { eventStatus, Formatter, TotalEvents } from "../utils";
import { DiologDetailsEvents } from "../components/Dialog/Events/Details";
import { useEvents } from "../context";
import * as List from '../components/List'
import { FullEventSchemaDTO } from "../Schema";



export function Dashboard() {

  const { events } = useEvents()
  const [isDiologOpen, setIsDiologOpen] = useState(false);
  const [isDiologDetails, setIsDiologDetails] = useState(false)
  const [selectSingleEvent, setSelectSingleEvent] = useState<FullEventSchemaDTO>()
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

  const Metrics = [
    {
      title: "Total de eventos",
      total: total.TotalEvent(events)
    },
    {
      title: "Por decorrer",
      total: total.TotalOfPending(events)
    },
    {
      title: "Finalizados",
      total: total.TotalOfFinally(events)
    }

  ]

  return (
    <Layout
      sectionButton={
        <button
          onClick={handleOpenDialog}
          className="text-gray-100 font-medium bg-blue-500 p-4 rounded hover:bg-blue-600 focus-within:ring-2 flex gap-3 items-center ring-0 focus-within:ring-blue-600 outline-none"
        >
          Novo Evento <BadgePlus />
        </button>
      }
      metrics={Metrics}
    >
      <section className="p-4 -mt-10">
        {
          events && events.length > 0 && events.sort((a, b) =>  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((event) => (
            <div key={event.id} className="mb-4">
              <List.Root onDoubleClick={() => onDetailsDiologOpen(event.id)}>
                <List.Ul>
                  <List.Item className="max-w-96">
                    <List.ItemBody className="text-lg sm:text-2xl text-[#5A5A66] leading-8">{event.title}</List.ItemBody>
                  </List.Item>
                  <List.Item>
                    <List.ItemHeader>Tipo de Evento</List.ItemHeader>
                    <List.ItemBody>{event.type}</List.ItemBody>
                  </List.Item>
                  <List.Item>
                    <List.ItemHeader>Limite de pessoas</List.ItemHeader>
                    <List.ItemBody className="flex gap-4 items-center">{event.amount} <Users className="size-5" /></List.ItemBody>
                  </List.Item>
                  <List.Item>
                    <List.ItemHeader>Duração do Evento</List.ItemHeader>
                    <List.ItemBody className={`${eventStatus(event.date, event.durantion).color} ${eventStatus(event.date, event.durantion).bg} rounded-2xl p-1 text-center`}>
                      {eventStatus(event.date, event.durantion).status}
                      </List.ItemBody>
                  </List.Item>
                  <List.Item className="justify-end">
                    <List.ItemHeader>Data de criação</List.ItemHeader>
                    <List.ItemBody>{formatterDate.formatterDate(event.createdAt)}</List.ItemBody>
                  </List.Item>
                  <List.Item className="flex gap-4">
                    <span className="sm:flex gap-4 self-center">
                      <button className="group">
                        <Trash className="size-10 group-hover:text-red-700 group-hover:ring-red-700 duration-150 transition-colors ring-2 ring-zinc-200 p-2 rounded-lg" />
                      </button>
                      <button className="group">
                        <ExternalLink 
                          onClick={() => onDetailsDiologOpen(event.id)}
                          className="size-10 group-hover:text-red-700 group-hover:ring-red-700 duration-150 transition-colors ring-2 ring-zinc-200 p-2 rounded-lg" />
                      </button>
                      <a href={`/events/${event.id}`} className="group">
                        <MailPlus className="size-10 hover:text-blue-500 duration-150 transition-colors ring-2 ring-zinc-200 p-2 rounded-lg" />
                      </a>
                    </span>
                  </List.Item>
                </List.Ul>
              </List.Root>
            </div>
          ))
        }
      </section>
      {isDiologOpen && <DiologCreatEvetns onClose={handleCloseDiolog} />}
      {isDiologDetails && selectSingleEvent && <DiologDetailsEvents onClose={onDetailsDiologClose} data={selectSingleEvent} />}

    </Layout>
  )
}



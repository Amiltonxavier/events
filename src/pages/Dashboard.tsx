import { Layout } from "../layout"
import { BadgePlus, MailPlus, ReceiptText, Trash, Users } from "lucide-react";
import { useState } from "react";
import { DiologCreatEvetns } from "../components/Dialog/Events/Create";
import { eventStatus, Formatter, TotalEvents } from "../utils";
import { DiologDetailsEvents } from "../components/Dialog/Events/Details";
import { useEvents } from "../context";
import * as List from '../components/List'
import type { FullEventSchemaDTO } from "../Schema";
import { DeleteEvents } from "../components/Dialog/DeleteEvents";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";



export function Dashboard() {

  const { events } = useEvents()
  const [isDiologOpen, setIsDiologOpen] = useState(false);
  const [isDiologDetails, setIsDiologDetails] = useState(false)
  const [isDeleteEventModalOpen, setIsDeleteEventModalOpen] = useState(false)
  const [selectID, setSelectID] = useState('')
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
    SelectEvent('')
  }
  const SelectEvent = (selectEventId: string) => {
    setSelectSingleEvent(events.find((event) => event.id === selectEventId))
  }

  function openDeleteEventModalOpen(id: string) {
    setSelectID(id)
    setIsDeleteEventModalOpen(true)
  }
  function CloseDeleteEventModalOpen() {
    setIsDeleteEventModalOpen(false)
  }

  const Metrics = [
    {
      title: "Total events",
      total: total.TotalEvent(events)
    },
    {
      title: "To be held",
      total: total.TotalOfPending(events)
    },
    {
      title: "Completed",
      total: total.TotalOfFinally(events)
    }

  ]

  return (
    <>
      <Helmet title="Dashboard" />
      <Layout
        sectionButton={
          <button
            type="button"
            onClick={handleOpenDialog}
            className="text-gray-100 font-medium bg-blue-500 p-4 rounded hover:bg-blue-600 focus-within:ring-2 flex gap-1 sm:gap-3 items-center ring-0 focus-within:ring-blue-600 outline-none"
          >
            New Event <BadgePlus />
          </button>
        }
        metrics={Metrics}
      >
        <section className="p-2 sm:p-4 sm:-mt-10 animate-fadeIn">
          {
            events && events.length > 0 && events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((event) => (
              <div key={event.id} className="mb-4">
                <List.Root onDoubleClick={() => onDetailsDiologOpen(event.id)}>
                  <List.Ul>
                    <List.Item className="max-w-96">
                      <List.ItemBody className="text-base sm:text-2xl text-[#5A5A66] leading-8">{event.title}</List.ItemBody>
                    </List.Item>
                    <List.Item>
                      <List.ItemHeader>Event Type</List.ItemHeader>
                      <List.ItemBody>{event.type}</List.ItemBody>
                    </List.Item>
                    <List.Item>
                      <List.ItemHeader>Guest Limit</List.ItemHeader>
                      <List.ItemBody className="flex gap-4 items-center">{event.amount} <Users className="size-5" /></List.ItemBody>
                    </List.Item>
                    <List.Item>
                      <List.ItemHeader>Days Left For The Event</List.ItemHeader>
                      <List.ItemBody className={`${eventStatus(event.date, event.durantion).color} ${eventStatus(event.date, event.durantion).bg} rounded-2xl p-1 text-center`}>
                        {eventStatus(event.date, event.durantion).status}
                      </List.ItemBody>
                    </List.Item>
                    <List.Item className="w-full justify-end">
                      <List.ItemHeader>Date created</List.ItemHeader>
                      <List.ItemBody>{formatterDate.formatterDate(event.createdAt)}</List.ItemBody>
                    </List.Item>
                    <List.Item className="grid w-32 mr-auto sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-4">
                      <div className="sm:flex gap-1 flex-wrap sm:gap-4 self-center">
                        <button type="button" className="group">
                          <Trash onClick={() => openDeleteEventModalOpen(event.id)}
                            className="size-8 sm:size-10 group-hover:text-red-700 group-hover:ring-red-700 duration-150 transition-colors ring-2 ring-zinc-200 p-2 rounded-lg" />
                        </button>
                        <button type="button" className="group">
                          <ReceiptText
                            onClick={() => onDetailsDiologOpen(event.id)}
                            className="size-8 sm:size-10 group-hover:text-blue-700 group-hover:ring-blue-700 duration-150 transition-colors ring-2 ring-zinc-200 p-2 rounded-lg" />
                        </button>
                        <Link to={`/events/${event.id}`} className="group">
                          <MailPlus className="size-8 sm:size-10 hover:text-blue-500 duration-150 transition-colors ring-2 ring-zinc-200 p-2 rounded-lg" />
                        </Link>
                      </div>
                    </List.Item>
                  </List.Ul>
                </List.Root>
              </div>
            ))
          }
        </section>
        {isDiologOpen && <DiologCreatEvetns onClose={handleCloseDiolog} />}
        {isDiologDetails && selectSingleEvent && <DiologDetailsEvents onClose={onDetailsDiologClose} data={selectSingleEvent} />}
        {isDeleteEventModalOpen && selectID && <DeleteEvents id={selectID} onClose={CloseDeleteEventModalOpen} />}
      </Layout>
    </>
  )
}



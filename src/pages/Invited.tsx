import { useParams } from "react-router-dom"
import { useEvents } from "../context"
import { Layout } from "../layout"
import { TableCell } from "../components/table/table-cell"
import { TableRow } from "../components/table/table-row"
import { TableHeader } from "../components/table/table-header"
import { Table } from "../components/table/table"
import { Formatter, TotalInvited } from "../utils"
import { useState } from "react"
import { DiologCreatInvited } from "../components/Dialog/Invite/Create"
import { ArrowLeft, AtSign, Calendar, Mail, Phone, ReceiptText, Users } from "lucide-react"
import { DiologDetailsEvents } from "../components/Dialog/Events/Details"
import type { FullEventSchemaDTO } from "../Schema"


export function Invited() {
  const { events } = useEvents()
  const { id } = useParams()
  const singleEvents: FullEventSchemaDTO = events.find((event) => event.id === id)!
  console.log(singleEvents)
  const [isInvitedOpen, setInvitedOpen] = useState(false)
  const [isDetailsEventsOpen, setIsDetailsEventsOpen] = useState(false);

  function OpenAndCloseDetailsEvents() {
    setIsDetailsEventsOpen(!isDetailsEventsOpen)
  }

  function openInvitedDiolog() {
    setInvitedOpen(true)
  }
  function closeInvitedDiolog() {
    setInvitedOpen(false)
  }

  const formatter = new Formatter()
  const totalOfInvited = new TotalInvited()

  const Metrics = [
    {
      title: "Total Guests",
      total: totalOfInvited.TotalOfInvited(singleEvents)
    },
    {
      title: "Number of Guests",
      total: singleEvents.amount
    },
    {
      title: "Event Code",
      total: singleEvents.code
    }

  ]

  const isEventOver = new Date().getTime() >= new Date(singleEvents.durantion).getTime()


  return (
    <Layout
      sectionButton={
        <button
          type="button"
          onClick={OpenAndCloseDetailsEvents}
          className="bg-blue-500 text-gray-100 rounded px-4 py-3 hover:bg-blue-500/80 flex gap-4 items-center">
          Details
          <ReceiptText />
        </button>
      }
      metrics={Metrics}
    >
      <div className="px-8 flex flex-col gap-6">
        <div className="flex justify-between items-center space-y-4">
          <a href="/"><ArrowLeft className="hover:scale-125 duration-200 size-8 border-4 border-zinc-600 rounded-full hover:text-blue-500 hover:border-blue-500 hover:ring-2" /></a>
          <button
            type="button"
            disabled={isEventOver}
            onClick={openInvitedDiolog}
            className="flex items-center gap-2 bg-blue-500 text-gray-100 rounded px-4 py-3 hover:bg-blue-500/80  disabled:opacity-50 disabled:cursor-not-allowed">
            <Mail />
            Invite
          </button>
        </div>
        <section className="bg-white p-4 shadow-md rounded-md">
          <div className="text-gray-100">
            <Table>
              <thead>
                <tr className="border-b border-stone-200">
                  <TableHeader>id</TableHeader>
                  <TableHeader><Mail className="size-4 inline-block" />E-mail</TableHeader>
                  <TableHeader><Phone className="size-4 inline-block" /> Phone Number</TableHeader>
                  <TableHeader><Users className="size-4 inline-block" /> Amount of People</TableHeader>
                  <TableHeader><Calendar className="size-4 inline-block" />Date created</TableHeader>
                </tr>
              </thead>
              <tbody>
                {
                  singleEvents.invite && singleEvents.invite.map((invite) => (
                    <TableRow key={invite.id} className="overflow-auto hover:bg-transparent/20 cursor-pointer">
                      <TableCell>{invite.id}</TableCell>
                      <TableCell>{invite.email}</TableCell>
                      <TableCell>{invite.phone ?? "N/A"}</TableCell>
                      <TableCell>{invite.amount}</TableCell>
                      <TableCell>{formatter.formatterDate(invite.createdAt)}</TableCell>
                    </TableRow>
                  ))
                }
              </tbody>
            </Table>
          </div>
        </section>
      </div>

      {isInvitedOpen && id && <DiologCreatInvited onClose={closeInvitedDiolog} eventID={id} />}
      {isDetailsEventsOpen && singleEvents && <DiologDetailsEvents onClose={OpenAndCloseDetailsEvents} data={singleEvents} />}
    </Layout>
  )
}

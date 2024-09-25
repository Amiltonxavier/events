import { Link, useParams } from "react-router-dom"
import { useEvents } from "../context"
import { Layout } from "../layout"
import { TableCell } from "../components/table/table-cell"
import { TableRow } from "../components/table/table-row"
import { TableHeader } from "../components/table/table-header"
import { Table } from "../components/table/table"
import { Formatter, TotalInvited } from "../utils"
import { useState } from "react"
import { DiologCreatInvited } from "../components/Dialog/Invite/Create"
import { ArrowLeft, Calendar, Mail, Phone, ReceiptText, Users } from "lucide-react"
import { DiologDetailsEvents } from "../components/Dialog/Events/Details"
import type { FullEventSchemaDTO } from "../Schema"
import { Helmet } from "react-helmet"


export function Invited() {
  const { events } = useEvents()
  const { id } = useParams()
  const singleEvents = events.find((event) => event.id === id)!
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
    <>
      <Helmet title="Invited" />
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
        <div className="flex flex-col gap-2 sm:gap-6">
          <div className="flex justify-between items-center space-y-4">
            <Link to="/">
              <ArrowLeft className="hover:scale-125 duration-200 size-8 border-4 border-zinc-600 rounded-full hover:text-blue-500 hover:border-blue-500 hover:ring-2" />
            </Link>
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
              <Table className="w-full">
                <thead>
                  <tr className="border-b border-stone-200">
                    <TableHeader> Id</TableHeader>
                    <TableHeader><Mail className="size-4" />E-mail</TableHeader>
                    <TableHeader><Phone className="size-4" /> Phone Number</TableHeader>
                    <TableHeader><Users className="size-4" /> Amount of People</TableHeader>
                    <TableHeader><Calendar className="size-4" />Date created</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {
                    singleEvents.invite.map((invite) => (
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
    </>
  )
}

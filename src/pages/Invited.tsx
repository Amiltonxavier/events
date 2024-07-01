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
import { ArrowLeft, AtSign, Calendar, Phone } from "lucide-react"
import { DiologDetailsEvents } from "../components/Dialog/Events/Details"
import { FullEventSchemaDTO } from "../Schema"


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
      title: "Total de Convidados",
      total: totalOfInvited.TotalOfInvited(singleEvents)
    },
    {
      title: "Número de Convidados",
      total: singleEvents.amount
    },
    {
      title: "Código do Evento",
      total: singleEvents.code
    }

  ]

  return (
    <Layout
      sectionButton={
        <button onClick={OpenAndCloseDetailsEvents} className="bg-blue-500 text-gray-100 rounded px-4 py-3 hover:bg-blue-500/80">Detalhes</button>
      }
      metrics={Metrics}
    >
      <div className="px-8 flex flex-col gap-6">
        <div className="flex justify-between items-center space-y-4">
          <a href="/"><ArrowLeft className="hover:scale-125 duration-200 size-8 border-4 border-zinc-600 rounded-full hover:text-blue-500 hover:border-blue-500 hover:ring-2" /></a>
          <button onClick={openInvitedDiolog} className="bg-blue-500 text-gray-100 rounded px-4 py-3 hover:bg-blue-500/80">Convidar</button>
        </div>
        <section className="bg-white p-4 shadow-md">
          <div className="text-gray-100">
            <Table>
              <thead>
                <tr className="border-b border-zinc-400">
                  <TableHeader>id</TableHeader>
                  <TableHeader><AtSign className="size-4 inline-block" /> Email</TableHeader>
                  <TableHeader><Phone className="size-4 inline-block" /> Telefone</TableHeader>
                  <TableHeader style={{ width: 64 }}>Quantidade</TableHeader>
                  <TableHeader><Calendar className="size-4 inline-block" /> Data de criação</TableHeader>
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

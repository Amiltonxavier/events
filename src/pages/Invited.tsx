import { useParams } from "react-router-dom"
import { useEvents } from "../context"
import { Layout } from "../layout"
import { TableCell } from "../components/table/table-cell"
import { TableRow } from "../components/table/table-row"
import { TableHeader } from "../components/table/table-header"
import { Table } from "../components/table/table"
import { Events } from "../type"
import { Formatter } from "../utils"
import { useState } from "react"
import { DiologCreatInvited } from "../components/Dialog/Invite/Create"
import { ArrowLeft } from "lucide-react"



export function Invited() {
  const { events } = useEvents()
  const { id } = useParams()
  const singleEvents: Events = events.find((event) => event.id === id)!
  const [isInvitedOpen, setInvitedOpen] = useState(false)

  function openInvitedDiolog() {
    setInvitedOpen(true)
  }
  function closeInvitedDiolog() {
    setInvitedOpen(false)
  }

  const formatter = new Formatter()
  return (
    <Layout>
      <div className="px-8 flex flex-col gap-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold leading-8 text-gray-100">{singleEvents.title}</h1>
            <p className="text-gray-100">Convidados para o evento {Object.keys(singleEvents.invite).length}</p>
            <ul className="text-gray-100">
              <li>Identificador do Evento: {singleEvents?.id}</li>
              <li>Código: {singleEvents?.code}</li>
              <li>Total de pessoas: {singleEvents?.amount}</li>
              <li>Tipo de Evento: {singleEvents?.type}</li>
              <li>Data do Evento: {formatter.formatterDate(singleEvents?.createdAt)}</li>
            </ul>
          </div>
          <button onClick={openInvitedDiolog} className="bg-blue-500 text-gray-100 rounded px-4 py-2 hover:bg-blue-500/80">Convidar</button>
        </header>
        <a href="/"><ArrowLeft className="size-6 border border-zinc-700 rounded-full" /></a>
        <section className="">
          <div className="text-gray-100">
            <Table>
              <thead>
                <tr className="border-b border-white/10">
                  <TableHeader>id</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Telefone</TableHeader>
                  <TableHeader style={{ width: 64 }}>Quantidade</TableHeader>
                  <TableHeader>Data de criação</TableHeader>
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
    </Layout>
  )
}

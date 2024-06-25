import { Dialog } from "../../";
import { Events } from "../../../../type";
import { Formatter, TotalInvited } from "../../../../utils";
import * as Details from '../../../Details/index'


type DiologCreatEvetnsProps = {
    onClose: () => void,
    data: Events
}



export function DiologDetailsEvents({ onClose, data }: DiologCreatEvetnsProps) {

    const totalOfInvited = new TotalInvited()

   

    const formatterData = new Formatter()
    return (
        <Dialog onClose={onClose}>
            <div className="flex flex-col gap-4 mt-6 border-gray-100">
                <div className="px-4 sm:px-0">
                    <h3 className="text-2xl font-semibold leading-7 text-gray-900">Sobre o Evento</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
                </div>
                <Details.Root>
                    <Details.DL>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 text-sm">
                        
                        <Details.DT>Identificação</Details.DT>
                        <Details.DD>{data.id}</Details.DD>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                        <Details.DT>Código do Evento</Details.DT>
                        <Details.DD>{data.code}</Details.DD>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                        <Details.DT>Limite de convidados</Details.DT>
                        <Details.DD>{data.amount}</Details.DD>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                        <Details.DT>Título do Evento</Details.DT>
                        <Details.DD>{data.title}</Details.DD>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                        <Details.DT>Tipo de festa</Details.DT>
                        <Details.DD>{data.type}</Details.DD>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                        <Details.DT>Total de Convidados</Details.DT>
                        <Details.DD>{totalOfInvited.TotalOfInvited(data)}</Details.DD>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                        <Details.DT>Convites Restantes</Details.DT>
                        <Details.DD>{data.amount - totalOfInvited.TotalOfInvited(data)}</Details.DD>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                        <Details.DT>Data do Evento</Details.DT>
                        <Details.DD>{formatterData.formatterDate(data.createdAt)}</Details.DD>
                    </div>
                    </Details.DL>
                </Details.Root>
                <div className="flex gap-2 justify-end">
                    <button className="px-4 py-3 rounded text-gray-100 bg-transparent border border-blue-500">Baixar o Código QR</button>
                </div>
            </div>
        </Dialog>
    )
}

import { Dialog } from "../../";
import { Events } from "../../../../type";



type DiologCreatEvetnsProps = {
    onClose: () => void,
    data: Events
}



export function DiologDetailsEvents({ onClose, data }: DiologCreatEvetnsProps) {

    return (
        <Dialog onClose={onClose}>
            <div className="flex flex-col gap-4 mt-6 border-t border-gray-100">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Eventos</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
                </div>
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 text-sm">
                        <dt className="text-gray-100">Identificação</dt>
                        <dd className="text-gray-100">{data.id}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-gray-100">Título do Evento</dt>
                    <dd className="text-gray-100">{data.title}</dd>
                    </div>
                   <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                   <dt className="text-gray-100">Código do Evento</dt>
                   <dd className="text-gray-100">{data.code}</dd>
                   </div>
                   <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                   <dt>Data do Evento</dt>
                   <dd>{data.date.toString()}</dd>
                   </div>
                   
                </dl>
                <div className="flex gap-2 justify-end">
                    <button className="px-4 py-3 rounded text-gray-100 bg-transparent border border-blue-500">Baixar o Código QR</button>
                </div>
            </div>
        </Dialog>
    )
}

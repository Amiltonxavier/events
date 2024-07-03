import { Dialog } from '..'
import { useEvents } from '../../../context'
import { AlertCircle } from 'lucide-react'

type DeleteEventsProps = {
    onClose: () => void
}


export function DeleteEvents({ onClose }: DeleteEventsProps) {
    const { deleteOneEvents } = useEvents()
    return (
        <Dialog onClose={onClose}>
            <div className='space-y-4 mt-4'>
                <div className='flex flex-col sm:flex-row gap-4'>
                    <AlertCircle className='size-16 p-4 rounded-full text-red-700 bg-red-100' />
                    <div className='flex-1 space-y-4'>
                        <h5 className='text-xl font-semibold leading-6'>Eliminar Evento</h5>
                        <p className='text-zinc-500'>
                            Tem certeza de que deseja Elimiar o Evento? Todos os dados relacionado ao evento serão removidos permanentemente. Essa ação não pode ser desfeita.
                        </p>
                    </div>
                </div>
                <div className='flex sm:justify-end gap-4 mr-auto'>
                    <button
                        type='button'
                        className=' rounded-md px-4 py-3 font-medium border border-gray-200'
                        onClick={onClose}>Cancelar
                    </button>
                    <button
                        type='button'
                        className=' rounded-md px-4 py-3 font-medium bg-red-600 text-gray-200'
                        onClick={() => deleteOneEvents("id")}>
                        Sim
                    </button>
                </div>
            </div>
        </Dialog>
    )
}

import { Users } from "lucide-react";
import { Dialog } from "../../";
import type { FullEventSchemaDTO } from "../../../../Schema";
import { eventStatus, Formatter, TotalInvited } from "../../../../utils";
import * as Details from '../../../Details/index'


type DiologCreatEvetnsProps = {
    onClose: () => void,
    data: FullEventSchemaDTO
}



export function DiologDetailsEvents({ onClose, data }: DiologCreatEvetnsProps) {
    const totalOfInvited = new TotalInvited()

    const formatterData = new Formatter()
    return (
        <Dialog onClose={onClose}>
            <div className="flex flex-col gap-4 mt-6 border-gray-100">
                <div className="px-4 sm:px-0">
                    <h3 className="text-2xl font-semibold leading-7 text-gray-900">About the Event</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and EVENT.</p>
                </div>
                <Details.Root>
                    <Details.DL>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0 text-sm">

                            <Details.DT>Identification</Details.DT>
                            <Details.DD>{data.id}</Details.DD>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <Details.DT>Event Code</Details.DT>
                            <Details.DD>{data.code}</Details.DD>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <Details.DT>Guest limit</Details.DT>
                            <Details.DD className="flex gap-2 items-center">{data.amount} <Users className="size-5" /></Details.DD>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <Details.DT>Event Title</Details.DT>
                            <Details.DD>{data.title}</Details.DD>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <Details.DT>Event Type</Details.DT>
                            <Details.DD>{data.type}</Details.DD>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <Details.DT>Total Guests</Details.DT>
                            <Details.DD className="flex gap-2 items-center">{totalOfInvited.TotalOfInvited(data)} <Users className="size-5" /></Details.DD>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <Details.DT>Remaining Invitations</Details.DT>
                            <Details.DD>{data.amount - totalOfInvited.TotalOfInvited(data)}</Details.DD>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <Details.DT>State</Details.DT>
                            <Details.DD>
                                <span className={`${eventStatus(data.date, data.durantion).color} ${eventStatus(data.date, data.durantion).bg} rounded-2xl p-2`}>
                                    {eventStatus(data.date, data.durantion).status}
                                </span>
                            </Details.DD>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <Details.DT>Event Date</Details.DT>
                            <Details.DD>{formatterData.formatterDate(data.createdAt)}</Details.DD>
                        </div>
                    </Details.DL>
                </Details.Root>
                <div className="flex gap-2 justify-end">
                    <button
                        type="button"
                        className="px-4 py-3 rounded text-blue-500 bg-transparent border border-blue-500">
                        Download QR Code
                    </button>
                </div>
            </div>
        </Dialog>
    )
}

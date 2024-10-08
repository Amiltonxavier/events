import { createContext, type ReactNode, useContext, useState } from "react"
import type { InviteProps } from "../types"
import type { FullEventSchemaDTO, FullInviteSchemaDTO } from "../Schema";


type EventsProps = {
  events: FullEventSchemaDTO[],
  onCreateEvents: (newEvents: FullEventSchemaDTO) => void,
  onCreateInvited: (newInvite: InviteProps) => void,
  deleteOneEvents: (id: string) => void
}

export const EventsContet = createContext({} as EventsProps);

type EventsProvidersProps = {
  children: ReactNode
}

export function EventsProviders({ children }: EventsProvidersProps) {
  const [events, setEvents] = useState<FullEventSchemaDTO[]>(() => {
    const eventsOnStorage = localStorage.getItem('events')
    if (eventsOnStorage) {
      return JSON.parse(eventsOnStorage)
    }
    return []
  });


  const onCreateEvents = (newEvents: FullEventSchemaDTO) => {
    if (!newEvents /*|| newEvents.date.getTime() < new Date().getTime() || newEvents.date.getTime() > newEvents.durantion.getTime() */)
      throw Error('Errou ao Criar um Evento')
    setEvents(prevEvents => [...prevEvents, newEvents])
    localStorage.setItem('events', JSON.stringify([...events, newEvents]))
  }
  const onCreateInvited = (newInvite: FullInviteSchemaDTO) => {
    const { eventID } = newInvite
    const result = events.map((event) => {
      if (event.id === eventID) {
        return {
          ...event,
          invite: [...(event.invite || []), newInvite],
        };

      }
      return event;
    });

    setEvents(result);
    localStorage.setItem('events', JSON.stringify([...result]))
  }

  function deleteOneEvents(id: string) {
    const filterData = events.filter((event) => event.id !== id)
    setEvents(filterData)

    localStorage.setItem('events', JSON.stringify([...filterData]))
  }

  return (
    <EventsContet.Provider value={{ events, onCreateEvents, onCreateInvited, deleteOneEvents }}>
      {children}
    </EventsContet.Provider>
  )
}

export const useEvents = () => useContext(EventsContet)




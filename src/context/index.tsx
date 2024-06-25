import { createContext, ReactNode, useContext, useState } from "react"
import { Events, InviteProps } from "../type"


type EventsProps = {
    events: Events[],
    onCreateEvents: (newEvents: Events) => void,
    onCreateInvited: (newInvite: InviteProps ) => void,
    
}

export const EventsContet = createContext({} as EventsProps);

type EventsProvidersProps = {
    children: ReactNode
}

export function EventsProviders({ children }: EventsProvidersProps) {
    const [events, setEvents] = useState<Events[]>(() => {
      const eventsOnStorage = localStorage.getItem('events')
      if(eventsOnStorage){
        return JSON.parse(eventsOnStorage)
      } 
      return []
    });
   

    const onCreateEvents = (newEvents: Events) => {
        if (!newEvents || newEvents.date.getTime() < new Date().getTime())
          throw Error('Errou ao Criar um Evento')
          setEvents(prevEvents => [...prevEvents, newEvents])
          localStorage.setItem('events',JSON.stringify([...events, newEvents]))
      }
      const onCreateInvited = (newInvite: InviteProps ) => {
    
        const { eventID } = newInvite
    
        const result = events.map((event) =>
          event.id === eventID
            ? {
                ...event,
                invite: [...(event.invite || []), newInvite], 
              }
            : event
        )
    
        setEvents(result);
        localStorage.setItem('events',JSON.stringify([...events]))
    }

  return (
    <EventsContet.Provider value={{events, onCreateEvents, onCreateInvited}}>
      {children}
    </EventsContet.Provider>
  )
}

export const useEvents = () => useContext(EventsContet)




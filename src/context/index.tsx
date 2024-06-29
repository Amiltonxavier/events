import { createContext, ReactNode, useContext, useState } from "react"
import { Events, InviteProps } from "../type"
import { EventSchemaDTO, FullEventSchemaDTO, FullInviteSchemaDTO, InviteSchemaDTO } from "../Schema";


type EventsProps = {
    events: EventSchemaDTO[],
    onCreateEvents: (newEvents: FullEventSchemaDTO) => void,
    onCreateInvited: (newInvite: InviteProps ) => void,
    
}

export const EventsContet = createContext({} as EventsProps);

type EventsProvidersProps = {
    children: ReactNode
}

export function EventsProviders({ children }: EventsProvidersProps) {
    const [events, setEvents] = useState<EventSchemaDTO[]>(() => {
      const eventsOnStorage = localStorage.getItem('events')
      if(eventsOnStorage){
        return JSON.parse(eventsOnStorage)
      } 
      return []
    });
   

    const onCreateEvents = (newEvents: FullEventSchemaDTO) => {
        if (!newEvents /*|| newEvents.date.getTime() < new Date().getTime() || newEvents.date.getTime() > newEvents.durantion.getTime() */)
          throw Error('Errou ao Criar um Evento')
          setEvents(prevEvents => [...prevEvents, newEvents])
          localStorage.setItem('events',JSON.stringify([...events, newEvents]))
      }
      const onCreateInvited = (newInvite: FullInviteSchemaDTO ) => {
        const { eventID } = newInvite    
        const result = events.map((event) => {
          if (event.id === eventID) {
            const emailExists = event.invite?.some((item) => item.email === newInvite.email);
            if (!emailExists) {
              return {
                ...event,
                invite: [...(event.invite || []), newInvite],
              };
            }
          }
          return event;
        });
        
        setEvents(result);
        localStorage.setItem('events',JSON.stringify([...result]))
    }

  return (
    <EventsContet.Provider value={{events, onCreateEvents, onCreateInvited}}>
      {children}
    </EventsContet.Provider>
  )
}

export const useEvents = () => useContext(EventsContet)




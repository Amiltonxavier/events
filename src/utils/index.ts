import { CONSTANTS } from "../constants/";
import type { FullEventSchemaDTO } from "../Schema";
export class Formatter {
  private date;
  constructor() {
    this.date = new Intl.DateTimeFormat("pt-AO", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  formatterDate(date: Date) {
    const formateAnyValue = new Date(date);
    return this.date.format(formateAnyValue);
  }
}

export class TotalEvents {
  TotalEvent(events: FullEventSchemaDTO[]) {
    return events.length;
  }

  TotalOfFinally(events: FullEventSchemaDTO[]) {
    return events.reduce((acc, curr) => {
      if (
        new Date(curr.date).getTime() < new Date().getTime() &&
        new Date(curr.durantion).getTime() < new Date().getTime()
      ) {
        acc += 1;
      }
      return acc;
    }, 0);
  }

  TotalOfPending(events: FullEventSchemaDTO[]) {
    return events.reduce((acc, curr) => {
      if (new Date(curr.date).getTime() > new Date().getTime()) {
        acc += 1;
      }
      return acc;
    }, 0);
  }
}

export class TotalInvited {
  TotalOfInvited(data: FullEventSchemaDTO) {
    return data.invite?.reduce((acc, curr) => (acc += curr.amount), 0);
  }
}

export function eventStatus(eventData: string | Date, duration: string | Date) {
  const currentDate = new Date().getTime();
  const startDate = new Date(eventData).getTime();
  const durationDate = new Date(duration).getTime();

  const timeDifference = startDate - currentDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );
  const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);

  const status = {
    finished: currentDate > durationDate,
    ongoing: currentDate >= startDate && currentDate <= durationDate,
    upcoming: daysDifference > 10,
    daysLeft: daysDifference > 0 && daysDifference <= 10,
    hoursMinutesSecondsLeft:
      daysDifference === 0 &&
      (hoursDifference > 0 || minutesDifference > 0 || secondsDifference > 0),
    startingSoon:
      daysDifference === 0 &&
      hoursDifference === 0 &&
      minutesDifference === 0 &&
      secondsDifference === 0,
  };

  const statusKey = status.finished
    ? "finished"
    : status.ongoing
    ? "ongoing"
    : status.upcoming
    ? "upcoming"
    : status.daysLeft
    ? "daysLeft"
    : status.hoursMinutesSecondsLeft
    ? "hoursMinutesSecondsLeft"
    : "startingSoon";

  return {
    status:
      statusKey === "daysLeft"
        ? `There are ${daysDifference} days left`
        : statusKey === "hoursMinutesSecondsLeft"
        ? `There are ${hoursDifference} hours, ${minutesDifference} minutes, and ${secondsDifference} seconds left`
        : statusKey.charAt(0).toUpperCase() +
          statusKey
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .toLowerCase(),
    bg: CONSTANTS.STATUS_COLORS[statusKey].bg,
    color: CONSTANTS.STATUS_COLORS[statusKey].color,
  };

  /* const statusKey = status.finalizado
    ? "finalizado"
    : status.aDecorrer
    ? "aDecorrer"
    : status.porDecorrer
    ? "porDecorrer"
    : status.faltamDias
    ? "faltamDias"
    : status.faltamHorasMinutosSegundos
    ? "faltamHorasMinutosSegundos"
    : "comecando";

  return {
    status:
      statusKey === "faltamDias"
        ? `Faltam ${daysDifference} dias`
        : statusKey === "faltamHorasMinutosSegundos"
        ? `Faltam ${hoursDifference} horas, ${minutesDifference} minutos e ${secondsDifference} segundos`
        : statusKey.charAt(0).toUpperCase() +
          statusKey
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .toLowerCase(),
    bg: CONSTANTS.STATUS_COLORS[statusKey].bg,
    color: CONSTANTS.STATUS_COLORS[statusKey].color,
  }; */
}

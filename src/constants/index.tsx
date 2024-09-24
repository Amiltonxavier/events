import { EVENTSTYPES } from "../types";

export const EVENTSTYPESARRAY = Object.values(EVENTSTYPES)

const STATUS_COLORS = {
  finished: {
    bg: "bg-red-200",
    color: "text-red-900"
  },
  ongoing: {
    bg: "bg-green-200",
    color: "text-green-900"
  },
  upcoming: {
    bg: "bg-blue-200",
    color: "text-blue-900"
  },
  daysLeft: {
    bg: "bg-lime-200",
    color: "text-lime-900"
  },
  hoursMinutesSecondsLeft: {
    bg: "bg-orange-200",
    color: "text-orange-900"
  },
  startingSoon: {
    bg: "bg-indigo-200",
    color: "text-indigo-900"
  }
};




export const CONSTANTS = {
  EVENTSTYPESARRAY,
  STATUS_COLORS
}
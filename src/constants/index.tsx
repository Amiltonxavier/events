import { EVENTSTYPES } from "../types";

export const EVENTSTYPESARRAY = Object.values(EVENTSTYPES)

export const STATUS_COLORS = {
  finalizado: {
    bg: "bg-red-200",
    color: "text-red-900"
  },
  aDecorrer: {
    bg: "bg-green-200",
    color: "text-green-900"
  },
  porDecorrer: {
    bg: "bg-blue-200",
    color: "text-blue-900"
  },
  faltamDias: {
    bg: "bg-lime-200",
    color: "text-lime-900"
  },
  faltamHorasMinutosSegundos: {
    bg: "bg-orange-200",
    color: "text-orange-900"
  },
  comecando: {
    bg: "bg-indigo-200",
    color: "text-indigo-900"
  }
};




export const CONSTANTS = {
  EVENTSTYPESARRAY,
  STATUS_COLORS
}
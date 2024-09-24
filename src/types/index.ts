export enum EVENTSTYPES {
  CASAMENTO = "MARRIAGE",
  FESTA = "PARTY",
  WORKSHOP = "WORKSHOP",
  CONFERENCE = "CONFERENCE",
  MEETING = "MEETING",
  WEBINAR = "WEBINAR",
  OUTROS = "OTHER",
}

export type Invite = {
  id: string;
  email: string;
  amount: number;
  phone?: string;
  createdAt: Date;
  eventID: string;
};

export type Events = {
  id: string;
  title: string;
  local: string;
  type: EVENTSTYPES;
  date: Date;
  code: string;
  amount: number;
  invite: Invite[];
  createdAt: Date;
  durantion: Date;
};

export type InviteProps = Invite & {
  eventID: string;
};

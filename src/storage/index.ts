import { Events } from "../types";

export class Storage {
  //private key: string;
  static key: string = "events";

  static remove() {
    localStorage.removeItem(this.key);
  }
  static get(): Events[] {
    const events = JSON.parse(localStorage.getItem("events") || "[]");
    if (!Array.isArray(events)) {
      return [];
    }
    return events.map((event: any) => ({
      ...event,
      date: new Date(event.date),
      createdAt: new Date(event.createdAt),
      invite: Array.isArray(event.invite)
        ? event.invite.map((invite: any) => ({
            ...invite,
            createdAt: new Date(invite.createdAt),
          }))
        : [],
    }));
  }
  static post(value: string) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  static put() {
    const events = JSON.parse(
      localStorage.getItem(this.key) || "[]"
    ) as Events[];
    localStorage.setItem(this.key, JSON.stringify(events));
  }
}

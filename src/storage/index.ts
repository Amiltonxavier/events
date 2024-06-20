import { Events } from "../type";


export class Storage {
    //private key: string;
    static key: string = 'events';

    static remove() {
        localStorage.removeItem(this.key)
    }
    static get() {
      
        return JSON.parse(localStorage.getItem('events') || '[]')
        
    }
    static post(value: string) {
        console.log(value)
        localStorage.setItem(this.key, JSON.stringify(value))
    }

    static put(){
        const events = JSON.parse(localStorage.getItem(this.key) || '[]') as Events[]
        localStorage.setItem(this.key, JSON.stringify(events))
    }
}
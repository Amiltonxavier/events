import { Events } from "../type";


export class Formatter {
    private date
    constructor(){
        this.date = new Intl.DateTimeFormat('pt-AO', {
            dateStyle: 'short',
            timeStyle: 'short'
        })
    }

    formatterDate(date: Date) {
        const formateAnyValue =  new Date(date)
        return this.date.format(formateAnyValue);
    }

}

export class Total {

    TotalEvent(events: Events[]){
        return events.length
    }

    TotalOfFinally(events: Events[]){
        return events.reduce((acc, curr) => {
            if (new Date(curr.date).getTime() < new Date().getTime()) {
                acc += 1;
            }
            return acc;
        }, 0); 
    }
}
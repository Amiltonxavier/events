

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
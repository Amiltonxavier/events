export enum EVENTSTYPES {
    CASAMENTO= 'casamento',
    FESTA = 'festa',
    OUTROS =  'outros'
    
}

export type Invite = {
    id: string,
    email: string,
    amount: number
    phone?: string,
    createdAt: Date
}

export type Events = {
    id: string,
    title: string,
    local: string,
    type: EVENTSTYPES
    date: Date,
    code: string,
    amount: number,
    invite: Invite[],
    createdAt: Date,
}
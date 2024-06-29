import { z } from 'zod'



export const EventTypes = z.enum(["CASAMENTO", "FESTA", "WORKSHOP", "OUTROS"]);

export const CreateInviteSchema = z.object({
    email: z.string().email("Email inválido"),
    amount: z.preprocess(val => Number(val), z.number().min(1, "Tamanho mínimo aceite").max(3, "Máxima de pessoas em um convite")),
    phone: z.string().optional(),
});



export const InviteSchema = z.object({
    id: z.string(),
    createdAt: z.date(),
    eventID: z.string()
});

export const CreatEventSchema = z.object({
    title: z.string().nonempty("Título do Evento é campo obrigatório"),
    local: z.string().nonempty("Local do Evento é campo obrigatório"),
    amount: z.preprocess(val => Number(val), z.number().min(10, "Tamanho mínimo aceite")),
    date: z.preprocess((val) => new Date(val), z.date({message: 'Verifica a data marcada para o evento'})),
    durantion: z.preprocess((val) => new Date(val), z.date({message: 'Verifica a data de duração'})),
    type: EventTypes,

}).refine(data => data.date <= data.durantion, {
    message: 'A data não pode ser maior que a duração',
    path: ['date']
} )


export const EventSchema = z.object({
    id: z.string().uuid(),
    code: z.string(),
    invite: z.array(InviteSchema).optional(),
    createdAt: z.preprocess((val) => new Date(val), z.date()).optional(),
})


export type CreatEventSchemaDTO = z.infer<typeof CreatEventSchema>
export type EventSchemaDTO = z.infer<typeof EventSchema>
export type FullEventSchemaDTO = CreatEventSchemaDTO & EventSchemaDTO
export type InviteSchemaDTO = z.infer<typeof InviteSchema>
export type CreateInviteSchemaDTO = z.infer<typeof CreateInviteSchema>
export type FullInviteSchemaDTO = CreateInviteSchemaDTO & InviteSchemaDTO

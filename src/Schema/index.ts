import { z } from 'zod'



export const EventTypes = z.enum(["CASAMENTO", "FESTA", "WORKSHOP", "OUTROS"]);

export const CreateInviteSchema = z.object({
    email: z.string().email("Email inválido").nonempty('E-mail é um campo obrigatório'),
    amount: z.preprocess(val => Number(val), z.number().min(1, "Tamanho mínimo aceite 1").max(3, "Máxima de pessoas em um convite")),
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
    date: z.preprocess((val) => {
        if (typeof val === 'string' || typeof val === 'number' || val instanceof Date) {
          return new Date(val);
        }
        throw new Error('Invalid date format');
      }, z.date({ message: 'Verifica a data marcada para o evento' })),
      durantion: z.preprocess((val) => {
        if (typeof val === 'string' || typeof val === 'number' || val instanceof Date) {
          return new Date(val);
        }
        throw new Error('Invalid date format');
      }, z.date({ message: 'Verifica a data de duração' })),
    type: EventTypes,

}).refine(data => data.date <= data.durantion, {
    message: 'A data não pode ser maior que a duração',
    path: ['date']
} )


export const EventSchema = z.object({
    id: z.string().uuid(),
    code: z.string(),
    invite: z.array(z.intersection(InviteSchema, CreateInviteSchema)),
    createdAt: z.date()
})


export type CreatEventSchemaDTO = z.infer<typeof CreatEventSchema>
export type EventSchemaDTO = z.infer<typeof EventSchema>
export type FullEventSchemaDTO = CreatEventSchemaDTO & EventSchemaDTO
export type InviteSchemaDTO = z.infer<typeof InviteSchema>
export type CreateInviteSchemaDTO = z.infer<typeof CreateInviteSchema>
export type FullInviteSchemaDTO = CreateInviteSchemaDTO & InviteSchemaDTO

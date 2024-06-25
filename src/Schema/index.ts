import { z } from 'zod'


const Events = z.object({
    id: z.string().uuid({ message: "Invalid UUID" }),
    title: z.string().trim(),
    local: z.string().trim(),
    type: EVENTSTYPES,
    date: z.date(),
    code: z.string().trim(),
    amount: z.number(),
    invite: Invite[],
    createdAt: z.date(),
})

const Invite = z.object({
    id: z.string().uuid({ message: "Invalid UUID" }),
    email: z.string().email().nonempty("E-mail é um campo obrigatório"),
    amount: z.number().min(1, {message: 'Mínimo de pessoas em um convite 3'}).max(3, {message: 'Máximo de pessoas em um convite 3'}),
    phone?: z.string(),
    createdAt: z.string().datetime(),
    eventID: z.string().uuid({ message: "Invalid UUID" })
});

export type InviteSchemaDTO = z.infer<typeof Invite>
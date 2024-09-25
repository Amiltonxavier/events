import { z } from "zod";

export const userSchema = z.object({
  fullname: z.string().min(3, { message: "Short Full Name" }),
  url: z.string().url({ message: "Isn´t a valid url" }),
  email: z
    .string()
    .email({ message: "Isn´t a valid e-mail" })
    .nonempty("E-mail is empty"),
});

export type UserDTO = z.infer<typeof userSchema>;

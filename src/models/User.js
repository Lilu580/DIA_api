import { string, z } from "zod"

/** 
* @typedef {z.infer<typeof PersonSchema>} Person
*/ 
export const userSchema = z.object({
  email: z.string()
    .includes('@', {message: 'Email must have @'}),
  phone: z.string()
    .startsWith('+380', {message: 'Phone must start from +380'})
    .length(13, {message: 'Phone must be 13 vharacters long'}),
  login: string()
    .max(30, {message: 'Login must be 30 or less characters long'})
    .min(3, {message: 'Login must be 3 or more characters long'})
    .regex(/[a-zA-Z]/, 'Login must contain at least one letter')
    .refine(value => !/\s/.test(value), 'Login must not contain spaces')
    .refine(value => !/[^a-zA-Z0-9]/.test(value), 'Login must not contain special characters'),
  name: z.string()
    .max(30, {message: 'Name must be 30 or less characters long'})
    .min(3, {message: 'Name must be 3 or more characters long'}),
  password: z.string()
    .max(30, {message: 'Password must be 30 or less characters long'})
    .min(8, {message: 'Password must be 8 or more characters long'})
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit')
    .refine(value => !/\s/.test(value), 'Password must not contain spaces')
    .refine(value => !/[^a-zA-Z0-9]/.test(value), 'Password must not contain special characters'),
});

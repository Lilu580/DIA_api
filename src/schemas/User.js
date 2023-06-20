import { string, z } from "zod"

/** 
* @typedef {z.infer<typeof PersonSchema>} Person
*/ 

const lettersRegex = new RegExp(/[a-zA-Z]/);
const letterAndCharsRegex = new RegExp(/[^a-zA-Z0-9]/);
const spaceRegex = new RegExp(/\s/);

export const userSchema = z.object({
  email: z.string()
    .includes('@', {message: 'Email must have @'}),
  phone: z.string()
    .startsWith('+380', {message: 'Phone must start from +380'})
    .length(13, {message: 'Phone must be 13 characters long'}),
  login: string()
    .max(30, {message: 'Login must be 30 or less characters long'})
    .min(3, {message: 'Login must be 3 or more characters long'})
    .regex(lettersRegex, 'Login must contain at least one letter')
    .refine(value => !spaceRegex.test(value), 'Login must not contain spaces')
    .refine(value => !letterAndCharsRegex.test(value), 'Login must not contain special characters'),
  name: z.string()
    .max(30, {message: 'Name must be 30 or less characters long'})
    .min(3, {message: 'Name must be 3 or more characters long'}),
  password: z.string()
    .max(30, {message: 'Password must be 30 or less characters long'})
    .min(8, {message: 'Password must be 8 or more characters long'})
    .regex(lettersRegex, 'Password must contain at least one lowercase letter')
    .regex(lettersRegex, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit')
    .refine(value => !spaceRegex.test(value), 'Password must not contain spaces')
    .refine(value => !letterAndCharsRegex.test(value), 'Password must not contain special characters'),
});

const loginRegex = new RegExp(/[\w]/);
const phoneRegex = new RegExp(/\+380\d{9}/);
const emailRegex = new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]/);


export const userAuthSchema = z.object({
  login: string()
    .max(30, { message: 'Login must be 30 or fewer characters long' })
    .min(3, { message: 'Login must be 3 or more characters long' })
    .refine(value => (
      (loginRegex.test(value) || phoneRegex.test(value)) || emailRegex.test(value)
    ), 'Login must be a valid login, phone, or email')
    .refine(value => (
      !emailRegex.test(value) || !/\s/.test(value)
    ), 'Login must not contain spaces'),
  password: z.string()
    .max(30, {message: 'Password must be 30 or less characters long'})
    .min(8, {message: 'Password must be 8 or more characters long'})
    .regex(lettersRegex, 'Password must contain at least one lowercase letter')
    .regex(lettersRegex, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit')
    .refine(value => !spaceRegex.test(value), 'Password must not contain spaces')
    .refine(value => !letterAndCharsRegex.test(value), 'Password must not contain special characters'),
})

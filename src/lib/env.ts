import {z} from "zod"

const envSchema = z.object({
DATABASE_URL: z.string().min(1),
GOOGLE_CLIENT_ID: z.string().min(1),
GOOGLE_CLIENT_SECRET: z.string().min(1),
YANDEX_CLIENT_ID: z.string().min(1),
YANDEX_CLIENT_SECRET: z.string().min(1),
MAILRU_CLIENT_ID: z.string().min(1),
MAILRU_CLIENT_SECRET: z.string().min(1),
NEXTAUTH_URL: z.string().min(1),
NEXTAUTH_SECRET: z.string().min(1),
})

export const env = envSchema.parse(process.env)
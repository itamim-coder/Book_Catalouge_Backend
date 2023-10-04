import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsZodSchema = z.object({
    NODE_ENV: z.string(),
    PORT: z
        .string()
        .default('3030')
        .refine((val) => Number(val)),
    JWT_SECRET: z.string()
});

const envVars = envVarsZodSchema.parse(process.env);

export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    default_user_pass: process.env.DEFAULT_USER_PASS,
    default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
    jwt: {
        secret: envVars.JWT_SECRET
    }
};

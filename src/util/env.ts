import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets-zod';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NOTION_API_KEY: z.string().min(1),
    NOTION_DATA_SOURCE_ID: z.string().min(1),
    DEVELOPMENT: z.coerce.boolean().default(false),
  },
  experimental__runtimeEnv: process.env,
  extends: [vercel()],
});

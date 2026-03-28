import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); 

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL , 
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on',
  },
});
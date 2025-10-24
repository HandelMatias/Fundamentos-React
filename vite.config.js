import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['3525bf32-2569-4c70-bec9-25dc3ebd1aff-00-24nk8ttpvyh6r.worf.replit.dev']
  },
  base: "/Fundamentos-React",
})

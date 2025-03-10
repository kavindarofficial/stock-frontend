import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { UserConfigExport } from 'vite'

const config: UserConfigExport = defineConfig({
  plugins: [react()],
})

export default config
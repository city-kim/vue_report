import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import type { Preview } from '@storybook/vue3'
import type { App } from 'vue'

import '../src/assets/scss/main.scss'

const pinia = createPinia()

setup((app: App) => {
  app.use(pinia)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
  }
}

export default preview

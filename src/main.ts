import './assets/main.css'

import { createApp, provide, h } from 'vue'
import 'vue-connect-wallet/dist/style.css'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache();

const apolloClient: any = new ApolloClient({
  cache,
  uri: import.meta.env.VITE_API_URI,
})

import App from './App.vue'

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.mount('#app')

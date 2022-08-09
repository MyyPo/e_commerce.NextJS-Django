import React from 'react'
import '../styles/globals.css'
import { Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthProvider } from '../components/AuthContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react';

import Header from '../components/Header'

export default function MyApp({ 
  Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <SessionProvider 
    session={pageProps.session}
    refetchInterval={30}
    refetchOnWindowFocus={true}
    >
    <Hydrate state={pageProps.dehydratedState}>
      <Header/>
        <Component {...pageProps}/>
      </Hydrate>
      </SessionProvider>
      </AuthProvider>
      <ReactQueryDevtools/>
  </QueryClientProvider>
  ) 
}


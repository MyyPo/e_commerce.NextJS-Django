import React from 'react'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { fetchInfiniteProducts } from '../hooks/fetchInfiniteProducts'
import { EndlessProducts } from '../components/EndlessProducts'
import { SearchBar } from '../components/SearchBar'
import { fetchSlugs } from '../hooks/fetchSlugs'

const Home = () => {  
  
  return (<>
    <SearchBar/>
    <EndlessProducts/>
    </>
  )
}



export async function getStaticProps() {
  const queryClient = new QueryClient()
  
  await queryClient.prefetchInfiniteQuery(['products', 'http://127.0.0.1:8000/api/products/'], () => fetchInfiniteProducts('http://127.0.0.1:8000/api/products/'))
  await queryClient.prefetchQuery(['slugs'], () => fetchSlugs())
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
 
}

export default Home
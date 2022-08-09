import React from 'react'
import { useRouter } from 'next/router'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { fetchProduct } from '../../hooks/fetchProduct'


export default function Product() {
    const router = useRouter()
    const slug  = router.query.slug
    
    const { isSuccess, data:product, isLoading, isError, error} = useQuery(
        ["getProduct", slug],
        () => fetchProduct(slug),
        {
          retry: 1,
          enabled: slug.length > 0,
          staleTime: Infinity
        }
      );
      if (isSuccess) {
        return (
          <p>{product.title}</p>
        );}
        if (isLoading) {
            return <div className="center">Loading...</div>;
          }

          if (isError) { 
            return <p>Error: {error.message}</p>
  
          }
    
    
    }

export const getStaticProps = async (context) => {
    const slug = context.params?.slug;
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery(["getProduct", slug], 
      () => fetchProduct(slug)
    );  
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };
  };

export const getStaticPaths = async () => {
    return {
      paths: [],
      fallback: "blocking"
    };
  }
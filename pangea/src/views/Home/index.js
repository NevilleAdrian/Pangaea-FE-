import React from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';


const client = new ApolloClient({
    uri: 'https://pangaea-interviews.now.sh/api/graphql',
    cache: new InMemoryCache()
  });

export default function Home() {
    const getProducts = () => 
    client
    .query({
      query: gql`
        query GetProducts {
          products{
            id
            image_url
            title
            price(currency: USD)
          }
        }
      `
    })
    .then(({data}) => {
      console.log(data)
      setData(data)
    });
  
    const [data, setData] = useState(null)
    useEffect(() => {
      getProducts()
    }, [])
    console.log('data', data)
  
    return (
        <div>
            <p>hello</p>
        </div>
    )
}

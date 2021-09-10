import { HelloBrightspotQuery, HelloBrightspotQueryVariables, useHelloBrightspotQuery as originalQuery } from './graphql'
import * as Apollo from '@apollo/client'
import { useEffect, useState } from 'react'
import { ApolloQueryResult, QueryResult } from '@apollo/react-hooks'

export const useHelloBrightspotQuery = (baseOptions?: Apollo.QueryHookOptions<HelloBrightspotQuery, HelloBrightspotQueryVariables>):
    ApolloQueryResult<HelloBrightspotQuery> | QueryResult<HelloBrightspotQuery, HelloBrightspotQueryVariables> => {

    const [response, setResponse] = useState<ApolloQueryResult<HelloBrightspotQuery>>(originalQuery(baseOptions))

    const searchParams = new URLSearchParams()

    Object.entries(baseOptions.variables).forEach(([key, value]) => {
        searchParams.append(key, value)
    })

    useEffect(() => {
        if (!response.data) {
            fetch(`${process.env.NEXT_PUBLIC_HOST}/api/helloBrightspot?${searchParams.toString()}`)
            .then(response => response.json())
            .then(d => setResponse(d))
        }
    }, [])

    return response
}
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


/** A warm Brightspot welcome */
export type HelloBrightspot = {
  __typename?: 'HelloBrightspot';
  /** A friendly welcome message. */
  message?: Maybe<Scalars['String']>;
};

export type PageEntry = HelloBrightspot;

export type Query = {
  __typename?: 'Query';
  /** Say hello to Brightspot */
  HelloBrightspot?: Maybe<HelloBrightspot>;
};


export type QueryHelloBrightspotArgs = {
  id?: Maybe<Scalars['ID']>;
  path?: Maybe<Scalars['String']>;
};

export type HelloBrightspotQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  path?: Maybe<Scalars['String']>;
}>;


export type HelloBrightspotQuery = (
  { __typename?: 'Query' }
  & { HelloBrightspot?: Maybe<(
    { __typename?: 'HelloBrightspot' }
    & Pick<HelloBrightspot, 'message'>
  )> }
);


export const HelloBrightspotDocument = gql`
    query HelloBrightspot($id: ID, $path: String) {
  HelloBrightspot(id: $id, path: $path) {
    message
  }
}
    `;

/**
 * __useHelloBrightspotQuery__
 *
 * To run a query within a React component, call `useHelloBrightspotQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloBrightspotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloBrightspotQuery({
 *   variables: {
 *      id: // value for 'id'
 *      path: // value for 'path'
 *   },
 * });
 */
export function useHelloBrightspotQuery(baseOptions?: Apollo.QueryHookOptions<HelloBrightspotQuery, HelloBrightspotQueryVariables>) {
        return Apollo.useQuery<HelloBrightspotQuery, HelloBrightspotQueryVariables>(HelloBrightspotDocument, baseOptions);
      }
export function useHelloBrightspotLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloBrightspotQuery, HelloBrightspotQueryVariables>) {
          return Apollo.useLazyQuery<HelloBrightspotQuery, HelloBrightspotQueryVariables>(HelloBrightspotDocument, baseOptions);
        }
export type HelloBrightspotQueryHookResult = ReturnType<typeof useHelloBrightspotQuery>;
export type HelloBrightspotLazyQueryHookResult = ReturnType<typeof useHelloBrightspotLazyQuery>;
export type HelloBrightspotQueryResult = Apollo.QueryResult<HelloBrightspotQuery, HelloBrightspotQueryVariables>;
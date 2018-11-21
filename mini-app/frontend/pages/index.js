import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_PROFILES = gql`
  {
    profiles
  }
`

export default () => (
  <Query query={GET_PROFILES}>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error :(</div>
      return (
        <div>
          <h1>Hello 👋! This is coming from GraphQL:</h1>
          <ul>
            {data.profiles.map(profile => <li>{profile}</li>)}
          </ul>
          <Link href='/about'><a>About</a></Link>
        </div>
      )
    }}
  </Query>
)

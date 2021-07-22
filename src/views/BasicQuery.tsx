import React from 'react'
import { useQuery } from 'react-query'
import UserTable from '../components/UserTable'


function BasicQuery() {
  const fetchAllUsers = async () =>
    await (await fetch('https://60f834089cdca000174552b0.mockapi.io/api/vi/users')).json()

  const { data, error, status } = useQuery<any, any>('users', fetchAllUsers)

  return (
    <div>
      <h2 className="mb-4">Basic Query Example</h2>
      <div>
        {status === 'error' && <div>{error.message}</div>}

        {status === 'loading' && <div>Loading...</div>}

        {status === 'success' && <UserTable users={data} />}
      </div>
    </div>
  )
}

export default BasicQuery



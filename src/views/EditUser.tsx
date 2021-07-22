import axios from 'axios'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { Redirect, useParams } from 'react-router-dom'
import UserForm from '../components/UserForm'


const fetchUser = async ({ queryKey }) => {
  const [_key, { id }] = queryKey
  const response = await fetch(`https://60f834089cdca000174552b0.mockapi.io/api/vi/users/${id}`)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

function EditUser() {
  const { id } = useParams<any>()
  const { data, error, isLoading, isError } = useQuery<any, any>(
    ['user', { id }],
    fetchUser
  )

  const mutation = useMutation((updatedUser) =>
    axios.put(`https://60f834089cdca000174552b0.mockapi.io/api/vi/users/${id}`, updatedUser)
  )

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data)
  }

  if (isSuccess) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h2>Edit User</h2>
      <div>
        {isError && <div>{error.message}</div>}

        {isLoading && <div>Loading...</div>}

        {data && (
          <UserForm user={data} submitText="Update" submitAction={onSubmit} />
        )}
      </div>
    </div>
  )
}

export default EditUser

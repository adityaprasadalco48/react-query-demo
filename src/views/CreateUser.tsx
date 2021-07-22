import axios from 'axios'
import React, { useContext } from 'react'
import { useMutation } from 'react-query'
import { Redirect } from 'react-router-dom'
import UserForm from '../components/UserForm'
import { AppContext } from '../store/app-context'


const postUser = async (newUser) =>
  await (await axios.post('https://60f834089cdca000174552b0.mockapi.io/api/vi/users', newUser)).data

function CreateUser() {
  const [flashMessage, setFlashMessage] = useContext(AppContext)
  const mutation = useMutation<any, any>((newUser) => postUser(newUser), {
    onSuccess: (data) => {
      setFlashMessage(
        `New User Created - Id: ${data.id} Name: ${data.first_name} ${data.last_name}`
      )
    },
  })

  const { isLoading, isError, error, isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data)
  }

  if (isSuccess) {
    return <Redirect to="/" />
  }

  console.log('error', error);

  return (
    <div>
      <h2>New User</h2>

      {isError && <div>An error occurred: {error.message}</div>}

      {isLoading && <div>Loading...</div>}

      <UserForm submitText="Create" submitAction={onSubmit} />
    </div>
  )
}

export default CreateUser

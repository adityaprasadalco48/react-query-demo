import React, { useState } from 'react'
import { useQuery } from 'react-query'

import UserTable from '../components/UserTable'

const pageLimit = 15

const fetchUsers = async (page = 1) => {
  const res = await fetch(
    `http://localhost:3004/users?_page=${page}&_limit=${pageLimit}`
  )
  return res.json()
}

function PaginatedQuery() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, status, error } = useQuery(
    ['users', page],
    (page) => fetchUsers(page),
    {
      keepPreviousData: true,
    }
  )

  const prevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  return (
    <div>
      <h2 className="mb-4">Paginated Query Example</h2>
      <div>
        {isError && <div>An error occurred: {error.message}</div>}

        {isLoading && <div>Loading...</div>}

        {status === 'success' && <UserTable users={data} />}
      </div>
      <div className="flex mt-4 justify-between items-center">
        <button className="btn" onClick={prevPage} disabled={page <= 1}>
          Prev
        </button>
        <span className="rounded font-semibold text-teal-900">
          Page: {page}
        </span>
        <button
          className="btn"
          onClick={nextPage}
          disabled={data && data.length < pageLimit}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PaginatedQuery

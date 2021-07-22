import React, { createContext, useState } from 'react'

// Create Context Object
export const AppContext = createContext<any>('')

// Create a provider for components to consume and subscribe to changes
export const AppContextProvider = (props) => {
  const [flashMessage, setFlashMessage] = useState('')

  return (
    <AppContext.Provider value={[ flashMessage, setFlashMessage ]}>
      {props.children}
    </AppContext.Provider>
  )
}

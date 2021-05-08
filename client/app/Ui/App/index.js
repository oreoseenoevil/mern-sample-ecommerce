import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { GlobalContextProvider } from '@Context/GlobalContext' 
import { Header } from '@Layouts/Header'
import { Main } from '@Layouts/Main'

export const App = () => {
  return (
    <GlobalContextProvider>
      <Router>
        <div className="container">
          <Header />
          <div className="main-content">
            <Main />
          </div>
        </div>
      </Router>
    </GlobalContextProvider>
  )
}

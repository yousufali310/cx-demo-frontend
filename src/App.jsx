import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/styles.scss'
import Header from './header'
import Footer from './footer'
import Films from './components/Films'
import Stores from './components/Stores'
import Rentals from './components/Rentals'

function App() {
  return (
    <Router>
      <Header />
      <div className='main_page_holder'>
        <div className='table_outer_holder'>
          <Routes>
            <Route path="/" element={<Films />} />
            <Route path="/films" element={<Films />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/rentals" element={<Rentals />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  )
}

export default App

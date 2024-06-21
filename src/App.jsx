
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Search from './components/Search'
import Details from './components/Details'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Search />} />
    <Route path="/details/:id" element={<Details />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
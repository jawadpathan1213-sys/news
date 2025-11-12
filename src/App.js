
import React, {useState} from 'react'
import Navbar from './components/Navbar/Navbar'
import News from './components/NewItems/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import LoadingBar from "react-top-loading-bar";


const App = () => {
  const [pagesize] = useState(15)
  const [progres, setProgres] = useState(0)
  const apikey = process.env.REACT_APP_NEWS_API
  const setProgress = (progress) => {
    setProgres(progress)
  }
  const [country] = useState('us')
  const [searchQuery, setSearchQuery] = useState("");


  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  
  return (
    <>
      <Router>
        <Navbar handleSearch = {handleSearch}/>
        <br />
        <LoadingBar height={3} color="#03f82cff" progress={progres} style={{}} />
        <Routes>
          <Route exact path='/' element={<News searchQuery = {searchQuery}  handleSearch = {handleSearch} setProgress={setProgress} apikey={apikey} key='general' pageSize={pagesize} country={country} category='general' />} />
          <Route exact path='/business' element={<News searchQuery = {searchQuery}  handleSearch = {handleSearch} setProgress={setProgress} apikey={apikey} key='business' pageSize={pagesize} country={country} category='business' />} />
          <Route exact path='/entertainment' element={<News searchQuery = {searchQuery}  handleSearch = {handleSearch} setProgress={setProgress} apikey={apikey} key='entertainment' pageSize={pagesize} country={country} category='entertainment' />} />
          <Route exact path='/general' element={<News searchQuery = {searchQuery}  handleSearch = {handleSearch} setProgress={setProgress} apikey={apikey} key='general' pageSize={pagesize} country={country} category='general' />} />
          <Route exact path='/health' element={<News searchQuery = {searchQuery}  handleSearch = {handleSearch} setProgress={setProgress} apikey={apikey} key='health' pageSize={pagesize} country={country} category='health' />} />
          <Route exact path='/science' element={<News searchQuery = {searchQuery}  handleSearch = {handleSearch} setProgress={setProgress} apikey={apikey} key='science' pageSize={pagesize} country={country} category='science' />} />
          <Route exact path='/sports' element={<News searchQuery = {searchQuery}  handleSearch = {handleSearch} setProgress={setProgress} apikey={apikey} key='sports' pageSize={pagesize} country={country} category='sports' />} />
          <Route exact path='/technology' element={<News searchQuery = {searchQuery}  handleSearch = {handleSearch} setProgress={setProgress} apikey={apikey} key='technology' pageSize={pagesize} country={country} category='technology' />} />
        </Routes>
        
      </Router>
    </>
  )
  }

export default App
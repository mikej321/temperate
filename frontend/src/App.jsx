import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import InitialPage from './components/initial';
import Home from './pages/home';
import './App.css'

function App() {

  const [weather, setWeather] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home weather={weather} setWeather={setWeather}  />} />
      </Routes>
    </Router>
  )
}

export default App

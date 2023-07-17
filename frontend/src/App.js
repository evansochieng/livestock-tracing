import NavBar from './components/NavBar';
import Footer from './components/Footer';

import {Route, Routes, BrowserRouter} from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Home from './components/Home';
import TraceLivestock from './components/TraceLivestock';
import Campaigns from './components/Campaigns';

function App() {

  // define state for all livestock
  const [livestock, setLivestock] = useState([]);
  const [deforestedAreas, setDeforestedAreas] = useState([]);

  // fetch livestock data
  useEffect(() => {
    fetch("http://127.0.0.1:5000/livestock")
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res;
    })
    .then(data => setLivestock(data));
  }, []);

  // fetch deforested areas data
  useEffect(() => {
    fetch("http://127.0.0.1:5000/deforested_areas")
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res;
    })
    .then(data => setDeforestedAreas(data));
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/tracelivestock" element={<TraceLivestock livestock={livestock} deforestedAreas={deforestedAreas} />} />

          <Route exact path="/campaigns" element={<Campaigns />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

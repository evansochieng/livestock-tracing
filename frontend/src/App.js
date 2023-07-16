import NavBar from './components/NavBar';
import Footer from './components/Footer';

import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Home from './components/Home';
import MapView from './components/MapView';
import Campaigns from './components/Campaigns';

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/mapview" element={<MapView />} />

          <Route exact path="/campaigns" element={<Campaigns />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

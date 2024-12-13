import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BasePage from './pages/BasePage';
import Home from './pages/Home';
import Tours from './pages/Tours';
import Booking from './pages/Booking';
import Transport from './pages/Transport';
import Hotels from './pages/Hotels';
import Contacts from './pages/Contacts';
import NotFoundPage from './pages/NotFoundPage';
import TourDetails from './components/TourDatails';

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<BasePage />}>
          <Route index element={<Home />} />
          <Route path='/tours' element={<Tours />} />
          <Route path='/tours/:tourId' element={<TourDetails />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/transport' element={<Transport />} />
          <Route path='/hotels' element={<Hotels />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

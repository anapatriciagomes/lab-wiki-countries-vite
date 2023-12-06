import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import HomePage from './pages/HomePage';
import CountryDetails from './pages/CountryDetailsPage';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:countryId" element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

export default App;

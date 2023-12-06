import { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    axios
      .get('https://ih-countries-api.herokuapp.com/countries')
      .then(response => {
        console.log(response.data);
        setCountryData(response.data);
      });
  }, []);

  const countryNames = () => {
    if (countryData) {
      countryData.map(country => {
        return <li key={country._id}>{country.name.common}</li>;
      });
    }
  };

  return (
    <div>
      <h1>WikiCountries: Your Guide to the World</h1>
      {countryData && <ul>{countryNames()}</ul>}
    </div>
  );
}

export default HomePage;

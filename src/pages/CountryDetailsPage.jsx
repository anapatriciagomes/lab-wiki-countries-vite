import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function CountryDetails() {
  const { countryId } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then(response => {
        console.log(response.data);
        setCountryDetails(response.data);
      });
  }, [countryId]);

  return (
    <div>
      {countryDetails === null && <p>Loading...</p>}
      {countryDetails && (
        <div>
          <h2 className="page-title">{countryDetails.name.common}</h2>
          <h3>Capital</h3>
          <p>{countryDetails.capital}</p>
          <h3>Area</h3>
          <p>
            {countryDetails.area
              .toLocaleString('en-US', { minimumFractionDigits: 0 })
              .replace(/,/g, '.')}{' '}
            kms
          </p>
          {countryDetails && countryDetails.borders.length > 0 && (
            <h3>Borders</h3>
          )}
          {countryDetails &&
            countryDetails.borders.map((borderCountry, index) => {
              return (
                <NavLink
                  key={index}
                  to={`/${borderCountry}`}
                  className="country-link"
                >
                  <p>{borderCountry}</p>
                </NavLink>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default CountryDetails;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function CountryDetails() {
  const { countryId } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then(response => {
        console.log(response.data);
        setCountryDetails(response.data);
      });
  }, [countryId]);

  useEffect(() => {
    axios
      .get('https://ih-countries-api.herokuapp.com/countries')
      .then(response => {
        console.log(response.data);
        setCountryData(response.data);
      });
  }, []);

  return (
    <div>
      {countryDetails === null && <Spinner></Spinner>}
      {countryDetails && (
        <div>
          <h2 className="page-title">{countryDetails.name.common}</h2>
          <img
            src={`https://flagpedia.net/data/flags/icon/72x54/${countryDetails.alpha2Code.toLowerCase()}.png`}
            alt="flag"
            width={50}
            className="flag-image-details-page"
          />

          <div className="flex-country-details">
            <div className="detail-group">
              <h3>Capital</h3>
              <p>{countryDetails.capital}</p>
            </div>
            <div className="detail-group">
              <h3>Area</h3>
              <p>
                {countryDetails.area
                  .toLocaleString('en-US', { minimumFractionDigits: 0 })
                  .replace(/,/g, '.')}{' '}
                kms
              </p>
            </div>
            <div className="detail-group">
              {countryDetails && countryDetails.borders.length > 0 && (
                <h3>Borders</h3>
              )}
              {countryData === null && <Spinner></Spinner>}
              {countryDetails &&
                countryDetails.borders.map((borderCountry, index) => {
                  return (
                    <NavLink
                      key={index}
                      to={`/${borderCountry}`}
                      className="country-link"
                    >
                      {countryData &&
                        countryData.map(country => {
                          if (country.alpha3Code === borderCountry) {
                            return (
                              <p key={country._id}>{country.name.common}</p>
                            );
                          }
                        })}
                    </NavLink>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryDetails;

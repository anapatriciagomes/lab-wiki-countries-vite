import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

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

  return (
    <div>
      <h1 className="page-title">WikiCountries: Your Guide to the World</h1>
      {countryData === null && <p>Loading...</p>}
      <ListGroup as="ul">
        {countryData &&
          countryData.map(country => {
            return (
              <ListGroup.Item as="li" key={country._id}>
                <NavLink to={`/${country.alpha3Code}`} className="country-link">
                  <img
                    src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                    alt="flag"
                    width={30}
                    className="flag-image"
                  />
                  <span className="country-name">{country.name.common}</span>
                </NavLink>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </div>
  );
}

export default HomePage;

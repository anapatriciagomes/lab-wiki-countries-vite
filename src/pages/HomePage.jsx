import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ListGroup, Spinner } from 'react-bootstrap';

function HomePage() {
  const [countryData, setCountryData] = useState(null);
  const [filteredCountryData, setFilteredCountryData] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios
      .get('https://ih-countries-api.herokuapp.com/countries')
      .then(response => {
        console.log(response.data);
        setCountryData(response.data);
        setFilteredCountryData(response.data);
      });
  }, []);

  const handleSearchInput = event => {
    setSearchInput(event.target.value);
    const filteredData = countryData.filter(country =>
      country.name.common
        .toLowerCase()
        .startsWith(event.target.value.toLowerCase())
    );
    setFilteredCountryData(filteredData);
  };

  return (
    <div>
      <h1 className="page-title">WikiCountries: Your Guide to the World</h1>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchInput}
        placeholder="Search Country"
        className="country-search"
      />
      <br />
      {countryData === null && <Spinner></Spinner>}
      <ListGroup as="ul">
        {filteredCountryData &&
          filteredCountryData
            .toSorted((a, b) => a.name.common.localeCompare(b.name.common))
            .map(country => {
              return (
                <ListGroup.Item as="li" key={country._id}>
                  <NavLink
                    to={`/${country.alpha3Code}`}
                    className="country-link"
                  >
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

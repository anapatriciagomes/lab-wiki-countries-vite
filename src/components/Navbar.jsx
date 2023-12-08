import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  return (
    <Navbar bg="primary" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand>
          <NavLink to="/">WikiCountries</NavLink>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

import React from 'react';
import { Link } from 'gatsby';

import Container from 'components/Container';

const Header = () => {
  return (
    <header>
      <Container type="content">
        <p>Covid19 Dashboard</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li><a href="https://github.com/aubryprieur/covid-dashboard">
                My Github</a></li>
          <li>
            <Link to="/page-2/">References</Link>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;

import React from 'react';
import Helmet from 'react-helmet';

import Layout from 'components/Layout';
import Container from 'components/Container';

const SecondPage = () => {
  return (
    <Layout pageName="two">
      <Helmet>
        <title>References</title>
      </Helmet>
      <Container type="content" className="text-center">
        <h1>Colby Fayock</h1>
        <p><a href="https://www.freecodecamp.org/news/how-to-create-a-coronavirus-covid-19-dashboard-map-app-in-react-with-gatsby-and-leaflet/">
               Freecodecamp</a></p>
      </Container>
    </Layout>
  );
};

export default SecondPage;

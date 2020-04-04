import React, { useRef } from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import axios from 'axios';


import { promiseToFlyTo, getCurrentLocation } from 'lib/map';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

import gatsby_astronaut from 'assets/images/gatsby-astronaut.jpg';

const LOCATION = {
  lat: 42.697285,
  lng: 9.450881
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement: map } = {}) {
      if ( !map ) return;

      let response;

      try {
        response = await axios.get('https://corona.lmao.ninja/countries');
      } catch(e) {
        console.log('E', e);
        return;
      }

      const { data } = response;
      const hasData = Array.isArray(data) && data.length > 0;

      if ( !hasData ) return;

      const geoJson = {
        type: 'FeatureCollection',
        features: data.map((country = {}) => {
          const { countryInfo = {} } = country;
          const { lat, long: lng } = countryInfo;
          return {
            type: 'Feature',
            properties: {
              ...country,
            },
            geometry: {
              type: 'Point',
              coordinates: [ lng, lat ]
            }
          }
        })
      }

const geoJsonLayers = new L.GeoJSON(geoJson, {
  pointToLayer: (feature = {}, latlng) => {
    const { properties = {} } = feature;
    let updatedFormatted;
    let casesString;

    const {
      country,
      updated,
      cases,
      deaths,
      recovered
    } = properties

    casesString = `${cases}`;

    if ( cases > 1000 ) {
      casesString = `${casesString.slice(0, -3)}k+`
    }

    if ( updated ) {
      updatedFormatted = new Date(updated).toLocaleString();
    }

    const html = `
      <span class="icon-marker">
        <span class="icon-marker-tooltip">
          <h2>${country}</h2>
          <ul>
            <li><strong>Confirmed:</strong> ${cases}</li>
            <li><strong>Deaths:</strong> ${deaths}</li>
            <li><strong>Recovered:</strong> ${recovered}</li>
            <li><strong>Last Update:</strong> ${updatedFormatted}</li>
          </ul>
        </span>
        ${ casesString }
      </span>
    `;

    return L.marker( latlng, {
      icon: L.divIcon({
        className: 'icon',
        html
      }),
      riseOnHover: true
    });
  }
});

  geoJsonLayers.addTo(map)

  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings} />

      <Container type="content" className="text-center home-start">
        <h2>Demo Mapping App with Gatsby and React Leaflet</h2>
        <p>
          Uses <a href="https://github.com/ExpDev07/coronavirus-tracker-api">github.com/ExpDev07/coronavirus-tracker-api</a> via <a href="https://coronavirus-tracker-api.herokuapp.com/">coronavirus-tracker-api.herokuapp.com</a>
        </p>
        <p>
          Which uses jhu - <a href="https://github.com/CSSEGISandData/COVID-19">github.com/CSSEGISandData/COVID-19</a> - Worldwide Data repository operated by the Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE).
        </p>
        <p>
          And csbs - <a href="https://www.csbs.org/information-covid-19-coronavirus">csbs.org/information-covid-19-coronavirus</a> - U.S. County data that comes from the Conference of State Bank Supervisors.
        </p>
      </Container>
    </Layout>
  );
};

export default IndexPage;

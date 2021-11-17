// @flow
import React from 'react';
import Routes from './routes/Routes';
import dotenvConfig from './config.js';


// Themes

// For Saas import Saas.scss
import './assets/scss/Modern.scss';
import "react-notifications-component/dist/theme.css";
// For Dark import Saas-Dark.scss
// import './assets/scss/Saas-Dark.scss';

// For Modern demo import Modern.scss
// import './assets/scss/Modern.scss';
// For Modern dark demo import Modern-Dark.scss
// import './assets/scss/Modern-Dark.scss';

// For Creative demo import Creative.scss
// import './assets/scss/Creative.scss';
// For Creative dark demo import Creative-Dark.scss
// import './assets/scss/Creative-Dark.scss';

// configure fake backend


type AppProps = {};

/**
 * Main app component
 */
const App = (props: AppProps): React$Element<any> => {
    return <Routes></Routes>;
};

export default App;

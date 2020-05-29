import React from 'react';

import Header from './components/Header';
import Routes from './routes';

function App() {
  return (
    <React.StrictMode>
        <Header>
        <Routes />
        </Header>
    </React.StrictMode>
  );
}

export default App;
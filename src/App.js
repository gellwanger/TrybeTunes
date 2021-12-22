import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Routes from './components/Routes';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <h1>TrybeTunes</h1>
        <Header />
        <div>
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

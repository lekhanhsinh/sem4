import React from 'react';
import { Provider } from 'react-redux'
import './App.css';
import Index from './components/Index';
import store from './redux'
import { BrowserRouter as Router } from 'react-router-dom';
const App: React.FC = () => {
  return (
    <Provider store={store} >
      <div style={{
        backgroundColor: '#fff'
      }}>
        <Router>
          <Index />
        </Router>
      </div>
    </Provider>
  );
}

export default App;

import React, { Suspense } from 'react';
import { Provider } from 'react-redux'
import './App.css';
import Index from './components/Index';
import store from './redux'
import { BrowserRouter as Router } from 'react-router-dom';
import FallbackLoading from './FallbackLoading';
const App: React.FC = () => {
  return (
    <Provider store={store} >
    <div style={{
      backgroundColor : '#fff'
    }}>
      <Suspense fallback={<FallbackLoading/>}>
      <Router>
      <Index />
      </Router>
      </Suspense>
    </div>
    </Provider>
  );
}

export default App;

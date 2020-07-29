import React from 'react';
import Context from './firebase/context'

//=================================COMPONENTS=================================//
import Header from './components/Header';
import Form from './components/Form';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Context>
      <Header />
      <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <Form />
        </div>
      </div>
      <div className='mt-5'>
        <Dashboard />
      </div>
    </div>
    </Context>
  );
}

export default App;

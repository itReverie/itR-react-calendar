import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AdjectiveCalendar from './AdjectiveCalendar';

import moment from 'moment';
const now = moment();

class App extends Component {
  render(){

   return (<div
    style={{
      zIndex: 1000,
      position: 'relative',
      width: 900,
      margin: '20px auto',
    }}
  >
      <div style={{ float: 'left', width: 300 }}>
        <AdjectiveCalendar defaultValue={now} isDateTime={true} />
      </div>
  </div>);
  }
}

export default App;

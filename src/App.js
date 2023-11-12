import React, { Component } from 'react';
import MainBoard from './Snake-Game/MainBoard';
import './App.css';
export default class App extends Component {
  render() {
    return (
      <div className='body'>
        <MainBoard/>
      </div>
    )
  }
}
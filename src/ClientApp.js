import React from 'react';
import {render, hydrate} from 'react-dom'
import App from './App'

// any other browser-only things

// hydrate is like render but I expect there will be already markup in this place
// just take over what is there don't rerender
hydrate(<App />, document.getElementById('root'))


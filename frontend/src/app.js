import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

import DestinationIndex from './components/destinations/DestinationIndex'
import DestinationSearch from './components/destinations/DestinationSearch'
import Home from './components/pages/Home'

import './style.scss'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/search" component={DestinationSearch} />
          <Route path="/destinations/:categories/:cost/:airport" component={DestinationIndex} />
          <Route exact path="/" component={Home} />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

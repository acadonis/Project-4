import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'
import { HashRouter, Route, Switch } from 'react-router-dom'

import DestinationIndex from './components/destinations/DestinationIndex'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/destinations" component={DestinationIndex} />
          <Route path="/login" component={DestinationIndex} />
          <Route path="/register" component={DestinationIndex} />
        </Switch>
      </HashRouter>

    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

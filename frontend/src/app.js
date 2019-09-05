import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import 'bulma'
import { HashRouter, Route, Switch } from 'react-router-dom'

import DestinationIndex from './components/destinations/DestinationIndex'

class App extends React.Component {
  componentDidMount() {
    axios.get('/api/destinations')
      .then(res => console.log(res.data))
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/destinations" component={DestinationIndex} />
        </Switch>
      </HashRouter>

    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

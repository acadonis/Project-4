import React from 'react'
import axios from 'axios'

class DestinationIndex extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    axios.get('/api/destinations')
      .then(results => {
        this.setState({ results })
      })
  }

  render() {

    return (
      <section className="section">
        <div className="container">
          {this.state.results && <h1>{this.state.results.data[0].address}</h1>}
        </div>
      </section>
    )
  }
}


export default DestinationIndex

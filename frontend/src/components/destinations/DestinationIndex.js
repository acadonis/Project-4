import React from 'react'
import axios from 'axios'
import Card from '../common/Card'

class DestinationIndex extends React.Component {

  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount() {
    axios.get('/api/destinations')
      .then(res => {
        this.setState({ destinations: res.data })
      })
  }

  render() {
    this.state.destinations && console.log(this.state)

    return (



      <div className="container">
        {this.state.destinations && this.state.destinations.map((destination, i) =>
          <div key={i}>
            <Card
              {...destination}
            />
          </div>
        )}
      </div>

    )
  }
}

// <section className="section">
//   {this.state.result && <h1>{this.state.result.data[2].address}</h1>}
// </section>


export default DestinationIndex

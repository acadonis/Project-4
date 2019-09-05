import React from 'react'
import axios from 'axios'

class DestinationIndex extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    axios.get('/api/destinations')
      .then(res => {

        this.setState({ res })
      })
  }

  render() {
    {this.state.res && console.log(this.state.res.data[0].address)}
      return (
        <section className="section">
          {!this.state.res && <h2 className="title is-2">Loading...</h2>}
          {this.state.res && <h1>{this.state.res.data[0].address}</h1>}
        </section>
      )
    }
  }




  export default DestinationIndex

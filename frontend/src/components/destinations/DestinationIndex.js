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
      console.log(this.state)
      return (
        <section className="section">
          <h1>Testing React Setup</h1>
        </section>
      )
    }
  }


  export default DestinationIndex

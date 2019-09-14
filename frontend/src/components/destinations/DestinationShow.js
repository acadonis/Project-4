import React from 'react'
import axios from 'axios'


class DestinationShow extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount(){
    return axios.get('/api/destinations/' + this.props.match.params.id + '/')
      .then(res => this.setState({ destination: res.data }))
  }

  render(){
    console.log(this.state)
    if(!this.state.destination) return <h2>Loading...</h2>
    return(
      <section className="section">
        <div className="container">
          <p>Test</p>
        </div>
      </section>
    )
  }
}



export default DestinationShow

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
          <div className="columns">
            <div className="column">
              <figure className="image">
                <img src={this.state.destination.image} alt={this.state.destination.name} />
              </figure>
            </div>
            <div className="column">
              <h1>{this.state.destination.name}, {this.state.destination.country}</h1>
              <h1>Cost: {this.state.destination.cost}</h1>
              <ul>
                {this.state.destination.categories.map(category => <li key={category.id}>{category.name}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}



export default DestinationShow

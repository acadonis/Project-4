import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'


class DestinationShow extends React.Component {
  constructor(){
    super()
    this.state = {

    }
    this.deleteDestination = this.deleteDestination.bind(this)
  }

  deleteDestination() {
    axios.delete(`/api/destinations/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/'))
  }

  componentDidMount(){
    return axios.get('/api/destinations/' + this.props.match.params.id + '/')
      .then(res => this.setState({ destination: res.data }))
  }

  render(){
    if(!this.state.destination) return <h2>Loading...</h2>
    const user = this.state.destination.user
    console.log(user)
    console.log(Auth.getCurrentUserId())
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
              <h1>{this.state.destination.description}</h1>
            </div>
          </div>
          <div className="level-item">
            {Auth.isCurrentUser(user) && <button
              className="button has-text-weight-semibold is-danger"
              onClick= {this.deleteDestination}
            >Delete</button>}
          </div>
        </div>
      </section>
    )
  }
}



export default DestinationShow

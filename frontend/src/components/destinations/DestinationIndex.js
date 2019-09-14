import React from 'react'
import axios from 'axios'
import Card from '../common/Card'
import _ from 'lodash'
import { Link } from 'react-router-dom'


class DestinationIndex extends React.Component {

  constructor() {
    super()
    this.state = {

    }

    // this.getDestinations = this.getDestinations.bind(this)
    this.filterDestinations = this.filterDestinations.bind(this)
  }

  componentDidMount(){

    return axios.get('/api/destinations')
      .then(res => {
        const airports = res.data.map(response => response.airport)

        return axios.get('/api/carbonkit', {
          params: {
            'values.IATAcode1': this.props.match.params.airport,
            'values.IATAcode2': airports[0]
          }
        })
          .then(carbonRes => {
            console.log(carbonRes.data)
            res.data[0].carbon = carbonRes.data.output.amounts[1].value
            this.setState({
              destinations: res.data,
              // can use either searchCategories or categoryArary for filter RegExp
              // searchCategories: this.props.match.params.categories,
              searchCost: this.props.match.params.cost,
              searchAirport: this.props.match.params.airport,
              categoryArray: this.props.match.params.categories.split(',').map(Number)

            })
          })

      })
  }

  filterDestinations(){

    const categoryRe = new RegExp(this.state.categoryArray, 'i')
    const costRe = new RegExp(this.state.searchCost, 'i')

    const filterDestinationsCategory = _.filter(this.state.destinations, destination => {
      return categoryRe.test(destination.categories.map(category => category.id))
    })

    const filterDestinationsCost = _.filter(filterDestinationsCategory, destination => {
      return costRe.test(destination.cost)

    })
    return filterDestinationsCost
  }



  render() {

    if(!this.state.destinations) {
      return <h2>Loading</h2>
    }

    if (this.state.destinations && this.filterDestinations().length === 0) {
      return <h2>No data</h2>

    } else {

      return (
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              <div className="column is-half-tablet is-half-desktop">
                {this.state.destinations && this.filterDestinations().map((destination) =>
                  <div key={destination.id}>
                    <Link to={`destinations/${destination.id}/`}>
                      <Card
                        {...destination}
                      />
                    </Link>
                  </div>
                )}
              </div>
              <div className="column is-half-tablet is-half-desktop is-hidden-mobile">
                <figure className="image">
                  <img src='https://i.pinimg.com/originals/cc/44/7e/cc447e450b7ca52d4a5576aeb1332197.jpg' alt={name} />
                </figure>
              </div>
            </div>
          </div>
        </section>

      )

    }
  }
}




export default DestinationIndex

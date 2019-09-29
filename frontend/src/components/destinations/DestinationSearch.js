import React from 'react'
// import {Link } from 'react-router-dom'
import Rating from 'react-rating'
import Select from 'react-select'
import axios from 'axios'
// import Autosuggest from 'react-autosuggest'

class DestinationSearch extends React.Component {
  constructor(){
    super()
    this.state = {
      formData: {
        cost: '',
        airport: '',
        categories: []
      }

    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleCategoryChange(selectedCategory) {

    const formData = { ...this.state.formData, categories: (selectedCategory || []).map(option => option.value) }

    this.setState({ formData })
  }

  handleRatingChange(rating) {
    const formData = { ...this.state.formData, cost: rating }
    this.setState({ formData })

  }

  handleChange(e){
    const formData = { ...this.state.formData, airport: e.target.value.toUpperCase() }
    this.setState({ formData })
  }

  handleSubmit(){
    this.props.history.push('/destinations/' + this.state.formData.categories + '/' + this.state.formData.cost + '/' + this.state.formData.airport)

  }

  componentDidMount() {
    axios.get('/api/categories/')
      .then(res => this.setState({
        categoryChoices: res.data.map(option => ({ label: option.name, value: option.id }))
      }))
  }

  render(){
    const {categories, cost, airport} = this.state.formData
    const isEnabled = categories.length > 0 && cost !== '' && airport !== ''
    const { selectedCategory } = this.state
    return (
      <div>
        <section className="section">
          <div className="container">
            <h1 className="title is-3">Please choose the following!</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="columns is-multiline">
                <div className="column is-half-desktop is-half-tablet">
                  <div className="field">
                    <label className="label" id="category">Category</label>
                    <div className="control">
                      <p className="help" id="category-hint"> Enter the category (can select more than one)
                      </p>
                      <Select
                        id="category"
                        aria-describedby="category-hints"
                        value= {selectedCategory}
                        options={this.state.categoryChoices}
                        isMulti
                        onChange={this.handleCategoryChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" id="cost">Cost</label>
                    <div className="control">
                      <p className="help" id="cost-hint"> Enter the cost from 1 (least expensive) to 5 (most expensive)
                      </p>
                      <Rating name='cost'
                        id="cost"
                        aria-describedby="cost-hint"
                        initialRating={this.state.formData.cost}
                        onChange={this.handleRatingChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" id="airport">Starting Airport</label>
                    <div className="control">
                      <p className="help" id="airport-hint">Enter your starting airport IATA code, e.g. LAX for Los Angeles International</p>
                      <input
                        id="airport"
                        aria-describedby="airport-hint"
                        type="text"
                        className="input is-uppercase"
                        onChange={this.handleChange}
                        maxLength = "3"
                      />
                    </div>
                  </div>
                  <button className="button" type="submit" disabled={!isEnabled}>Go!</button>
                </div>
              </div>
            </form>

          </div>
        </section>
      </div>

    )
  }
}

export default DestinationSearch

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
        cost: ''
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
    const formData = { ...this.state.formData, airport: e.target.value }
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
    console.log(this.state)
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
                    <label className="label">Category</label>
                    <Select
                      value= {selectedCategory}
                      options={this.state.categoryChoices}
                      isMulti
                      onChange={this.handleCategoryChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Cost</label>
                    <Rating name='cost'
                      initialRating={this.state.formData.cost}
                      onChange={this.handleRatingChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Starting Airport</label>
                    <input
                      type="text"
                      placeholder="Please use IATA code e.g. LHR for London Heathrow!" className="input"
                      onChange={this.handleChange}/>
                  </div>
                  <button className="button" type="submit">Go!</button>
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

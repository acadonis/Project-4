import React from 'react'
import {Link } from 'react-router-dom'
import Rating from 'react-rating'
import Select from 'react-select'
import Autosuggest from 'react-autosuggest'

import { categories } from '../../lib/Categories'


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

  }


  handleCategoryChange(selectedCategories) {
    const formData = { ...this.state.formData, categories: selectedCategories ? selectedCategories.map(option => option.value) : [] }
    this.setState({ formData })
  }

  handleRatingChange(rating) {
    const formData = { ...this.state.formData, cost: rating }
    this.setState({ formData })

  }












  // handleChange(e){
  //   this.setState({ airport: e.target.value })
  // }

  // handleSubmit(){
  //   this.props.history.push('/search/' + this.state)
  //
  // }

  render(){
    const selectedCategories = (this.state.formData.categories || [ ]).map(category => ({ label: category, value: category }))
    console.log(this.state)
    return (
      <div>
        <section className="section">
          <div className="container">
            <h1 className="title is-3">Please choose the following!</h1>
            <div className="columns is-multiline">
              <div className="column is-one-third-desktop is-one-third-tablet">
                <div className="field">
                  <label className="label">Category</label>
                  <Select
                    value= {selectedCategories}
                    options={categories}
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
                  <AirportInput

                  />
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

    )
  }
}

export default DestinationSearch

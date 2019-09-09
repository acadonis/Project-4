import React from 'react'
import Select from 'react-select'
import axios from 'axios'

import { categories } from '../../lib/Categories'
import Auth from '../../lib/Auth'


class DestinationNew extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }

    this.setState({ formData, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    const formData = { ...this.state.formData}
    axios.post('/api/destinations/', formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.props.history.push(`/destinations/${res.data._id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleCategoryChange(selectedCategories) {
    const formData = { ...this.state.formData, categories: selectedCategories ? selectedCategories.map(option => option.value) : [] }
    this.setState({ formData })
  }

  render() {
    const selectedCategories = (this.state.formData.categories || [ ]).map(categories => ({ label: categories, value: categories }))
    return (
      <section className="section">
        <div className="container">
          <h2 className="title is-2">Create</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="columns is-multiline">
              <div className="column is-half-desktop">
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      name="name"
                      placeholder="eg tour of Spitalfields"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
                </div>
                <div className="field">
                  <label className="label">City</label>
                  <div className="control">
                    <input
                      className="input"
                      name="city"
                      placeholder="eg London"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.city && <small className="help is-danger">{this.state.errors.city}</small>}
                </div>
                <div className="field">
                  <label className="label">Postcode</label>
                  <div className="control">
                    <input
                      className="input"
                      name="postcode"
                      placeholder="eg N1 4HY"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.postcode && <small className="help is-danger">{this.state.errors.postcode}</small>}
                  {((this.state.errors.lon || this.state.errors.lat) && !this.state.errors.postcode) && <small className="help is-danger">Please provide a valid UK postcode</small>}
                </div>
                <div className="field">
                  <label className="label">Date</label>
                  <div className="control">
                    <input
                      className="input"
                      type="date"
                      name="date"
                      placeholder="eg 16/03/2020"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.date && <small className="help is-danger">{this.state.errors.date}</small>}
                </div>
                <div className="field">
                  <label className="label">Time</label>
                  <div className="control">
                    <input
                      className="input"
                      type="time"
                      name="time"
                      placeholder="eg 09:30"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.time && <small className="help is-danger">{this.state.errors.time}</small>}
                </div>
              </div>
              <div className="column is-half-desktop">
                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <input
                      className="input"
                      name="description"
                      placeholder="eg Fun for all the family!"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.description && <small className="help is-danger">{this.state.errors.description}</small>}
                </div>
                <div className="field">
                  <label className="label">Photo</label>
                  <div className="control">
                    <input
                      className="input"
                      name="photo"
                      placeholder="eg url"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.photo && <small className="help is-danger">{this.state.errors.photo}</small>}
                </div>
                <div className="field">
                  <label className="label">Venue</label>
                  <div className="control">
                    <input
                      className="input"
                      name="venue"
                      placeholder="eg Wembley"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.venue && <small className="help is-danger">{this.state.errors.venue}</small>}
                </div>
                <div className="field">
                  <label className="label">Category</label>
                  <Select
                    value= {selectedCategories}
                    options={categories}
                    isMulti
                    onChange={this.handleCategoryChange}
                  />
                  {this.state.errors.categories && <small className="help is-danger">{this.state.errors.categories}</small>}
                </div>
              </div>
            </div>
            <button className="button">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default DestinationNew

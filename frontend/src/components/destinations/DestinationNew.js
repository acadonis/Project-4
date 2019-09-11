import React from 'react'
import Select from 'react-select'
import Rating from 'react-rating'
import axios from 'axios'
import Auth from '../../lib/Auth'


class DestinationNew extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {
        cost: 1
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)

  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }

    this.setState({ formData })
  }

  handleSubmit(e) {
    e.preventDefault()

    const formData = {
      ...this.state.formData
    }

    axios.post('/api/destinations/', formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(this.props.history.push('/destinations/'))

  }

  handleRatingChange(rating) {
    const formData = {...this.state.formData, cost: rating}

    this.setState({ formData })
  }

  handleCategoryChange(selectedCategory) {

    const formData = { ...this.state.formData, categories: (selectedCategory || []).map(option => option.value) }

    this.setState({ formData })
  }

  componentDidMount() {
    axios.get('/api/categories/')
      .then(res => this.setState({
        categoryChoices: res.data.map(option => ({ label: option.name, value: option.id }))
      }))
  }

  render() {
    console.log(this.state)
    const { selectedCategory } = this.state

    return (
      <section className="section">
        <div className="container">
          <h2 className="title is-3">Make a Destination!</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="columns is-multiline">
              <div className="column is-one-third-desktop is-one-third-tablet">
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      name="name"
                      placeholder="eg Walking in the Alps!"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Airport</label>
                  <div className="control">
                    <input
                      className="input"
                      name="airport"
                      placeholder="eg LHR"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Address</label>
                  <div className="control">
                    <input
                      className="input"
                      name="address"
                      placeholder="eg Cumbria"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Image</label>
                  <div className="control">
                    <input
                      className="input"
                      name="image"
                      placeholder="eg Cumbria"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Cost</label>
                  <Rating name='cost'
                    initialRating={this.state.formData.cost}
                    onChange={this.handleRatingChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Category</label>
                  <Select
                    value={selectedCategory}
                    options={this.state.categoryChoices}
                    isMulti
                    onChange={this.handleCategoryChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <input
                      className="input"
                      name="description"
                      placeholder="eg A lovely walking holiday"
                      onChange={this.handleChange}
                    />
                  </div>
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

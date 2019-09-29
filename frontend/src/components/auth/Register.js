import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/register/', this.state.formData)
      .then(res => {
        toast.success(res.data.message)
        this.props.history.push('/login/')
      })
      .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {
    console.log(this.state.formData)
    console.log(this.state.errors)

    const {username, email, password, password_confirmation} = this.state.formData
    const isEnabled = username !== '' && email !== '' && password !== '' && password_confirmation !== ''

    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half-desktop">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label" htmlFor="username">Username</label>
                  <p className="help" id="username-hint"> Enter a username with no spaces
                  </p>
                  <div className="control">
                    <input
                      id = "username"
                      aria-describedby="username-hint"
                      className="input"
                      name="username"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
                </div>
                <div className="field">
                  <label className="label" htmlFor="email">Email</label>
                  <p className="help" id="email-hint"> Enter a valid email address
                  </p>
                  <div className="control">
                    <input
                      id="email"
                      aria-describedby="email-hint"
                      className="input"
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
                </div>
                <div className="field">
                  <label className="label" htmlFor="password">Password</label>
                  <p className="help" id="password-hint"> Enter a password at least 8 characters long
                  </p>
                  <div className="control">
                    <input
                      id="password"
                      aria-describedby="password-hint"
                      className="input"
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
                </div>
                <div className="field">
                  <label className="label" htmlFor="password-confirmation">Password Confirmation</label>
                  <p className="help" id="password-confirmation-hint"> Enter the same password
                  </p>
                  <div className="control">
                    <input
                      id="password-confirmation"
                      aria-describedby="password-confirmation-hint"
                      className="input"
                      type="password"
                      name="password_confirmation"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.password_confirmation && <small className="help is-danger">{this.state.errors.password_confirmation}</small>}
                </div>
                <button className="button is-active" disabled={!isEnabled}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Register

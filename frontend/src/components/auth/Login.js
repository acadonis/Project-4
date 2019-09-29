import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import Auth from '../../lib/Auth'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {
        email: '',
        password: ''
      },
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.redirectToSignUp = this.redirectToSignUp.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login/', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token)
        toast.success(res.data.message)
        this.props.history.push('/')
      })
      .catch(() => {
        Auth.removeToken()
        this.setState({ error: 'Invalid credentials' })
      })
  }

  redirectToSignUp() {
    this.props.history.push('register')
  }

  render() {
    const {email, password} = this.state.formData
    const isEnabled = email !== '' && password !== ''
    return (
      <section className="section">
        <div className="columns">
          <div className="column is-half-desktop">
            <h2 className="title is-2">Login</h2>
            <div className="container">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label" htmlFor="user-email">Email</label>
                  <p className="help" id="user-email-hint"> Enter your email address
                  </p>
                  <div className="control">
                    <input
                      id = "user-email"
                      aria-describedby="user-email-hint"
                      className="input"
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="user-password">Password</label>
                  <p className="help" id="user-password-hint"> Enter your password
                  </p>
                  <div className="control">
                    <input
                      id = "user-password"
                      aria-describedby="user-password-hint"
                      className="input"
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}
                </div>
                <button className="button is-active" disabled={!isEnabled}>Submit</button>
              </form>
            </div>
          </div>
          <div className="column">
            <h2 className="title is-2">Register</h2>
            <div className="container">
              <button
                className="button is-active"
                onClick={this.redirectToSignUp}
              >Sign Up</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Login

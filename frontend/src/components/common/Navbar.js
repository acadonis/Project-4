import React from 'react'
import {Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'



class Navbar extends React.Component {
  constructor(){
    super()
    this.state = {
      navbarOpen: false
    }
    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar(){
    this.setState({navbarOpen: !this.state.navbarOpen})
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false})
    }
  }

  render(){
    
    return(
      <nav className="navbar is-fixed-top is-success">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item">
              <div>
                <img src={require('./airplane.png')} alt="Plane Logo"/>
              </div>
            </div>
            <Link to= "/"
              className="navbar-item"> Low Carbon Europe
            </Link>

            <a role="button"
              className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''} ` }
              onClick={this.toggleNavbar}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''} ` }>
            <div className="navbar-start">
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">
                  Destinations
                </div>
                <div className="navbar-dropdown">
                  <Link to="/search" className="navbar-item">
                    Search for destinations
                  </Link>
                  <Link to="/destinations/new" className="navbar-item">
                    Add a destination
                  </Link>
                </div>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {!Auth.isAuthenticated() &&
                    <Link to="/register" className="button is-active">
                      Sign up
                    </Link>
                  }
                  {!Auth.isAuthenticated() &&
                    <Link  to="/login" className="button is-active">
                      Log in
                    </Link>
                  }
                  {Auth.isAuthenticated() &&
                    <Link
                      to="/"
                      className="button is-dark"
                      onClick={this.logout}
                    >
                      Logout
                    </Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }



}


export default withRouter(Navbar)

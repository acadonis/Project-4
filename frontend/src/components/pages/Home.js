import React from 'react'
import {Link } from 'react-router-dom'
import Auth from '../../lib/Auth'


function Home() {
  return (
    <div>
      <section className="section">
        <div className="container">
          <h1 className="title is-2 is-spaced">Welcome to Low Carbon Europe</h1>
          <h3 className="subtitle is-4 is-spaced">Find your ideal holiday in Europe and save carbon compared to a holiday further afield! </h3>
          <h3 className="subtitle is-4 is-spaced">
          Europe contains a wonderful array of desitinations just waiting to be explored. We have selected some of the best for you already, and you can even add your own below </h3>
          <h2 className="title is-2 is-spaced">What would you like to do today?</h2>
          <div className="columns is-multiline">
            <div className="column">
              <div className="box">
                <Link to={'/search'}>
                  <h3 className="title is-3">Search for a holiday</h3>
                </Link>
              </div>
            </div>
            <div className="column">
              {Auth.isAuthenticated() &&
                <div className="box">
                  <Link to={'/destinations/new'}>
                    <h3 className="title is-3">Add a destination</h3>
                  </Link>
                </div>
              }
              {!Auth.isAuthenticated() &&
                <div className="box">
                  <Link to={'/login'}>
                    <h3 className="title is-3">Sign up or login to add a destination!</h3>
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

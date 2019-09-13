import React from 'react'
import {Link } from 'react-router-dom'


function Home() {
  return (
    <div>
      <section className="section">
        <div className="container">
          <h1 className="title is-2 is-spaced">Welcome to Low Carbon Europe</h1>
          <h2 className="subtitle">Find your ideal holiday in Europe and save carbon compared to a holiday further afield! </h2>
          <h2 className="subtitle is-spaced">
          Europe contains a wonderful array of desitinations just waiting to be explored, and you can even add your own below! </h2>
        </div>
        <br>
        </br>
        <div className="container">
          <h2 className="title is-3">What would you like to do today?</h2>
        </div>
        <br>
        </br>
        <div className="container">
          <div className="columns is-multiline">
            <div className="column">
              <div className="box">
                <Link to={'/search'}>
                  <h2 className="title is-3">Search for a holiday!</h2>
                </Link>
              </div>
            </div>
            <div className="column">
              <div className="box">
                <Link to={'/destinations/new'}>
                  <h2 className="title is-3">Add a destination!</h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

import React from 'react'
import {Link } from 'react-router-dom'


function Home() {
  return (
    <div>
      <section className="section">
        <div className="container">
          <h1 className="title is-3">Welcome to AdonisTravel, the low carbon trip planner!</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h1 className="title is-3">What would you like to do today?</h1>
        </div>
      </section>
      <section className="section">
        <div className="columns is-multiline">
          <div className="column">
            <Link to={'/search'}>
              <h1 className="title is-3">Search for a low carbon holiday!</h1>
            </Link>
          </div>
          <div className="column">
            <Link to={'/destinations/new'}>
              <h1 className="title is-3">Add a low carbon destination!</h1>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

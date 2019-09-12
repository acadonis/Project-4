import React from 'react'

const Card = ({ name, cost, airport, carbon, categories }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{name}</h1>
        <h1>{carbon}</h1>
        <h1>{cost}</h1>
        <h1>{airport}</h1>
        <ul>
          {categories.map(category => <li key={category.id}>{category.name}</li>)}
        </ul>
      </div>
    </div>

  )
}
export default Card

import React from 'react'

const Card = ({ name, cost, country, airport, image, categories }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{name}, {country}</h1>
        <div className="card-image">
          <figure className="image">
            <img src={image} alt={name} />
          </figure>
        </div>
        <h1>Airport: {airport}</h1>
        <h1>Cost: {cost}</h1>
        <ul>
          {categories.map(category => <li key={category.id}>{category.name}</li>)}
        </ul>
      </div>


    </div>

  )
}
export default Card

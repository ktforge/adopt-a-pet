import React from "react";
import { Link } from "react-router-dom";

const Pet = ({ animal }) => {
  return (
    <Link
      key={animal.id}
      to={`/${animal.type.toLowerCase()}/${animal.id}`}
      className="pet"
    >
      <article>
        <div className="pet-image-container">
          {
            <img
              className="pet-image"
              src={
                animal.photos[0]?.medium ||
                "https://static-assets.codecademy.com/Dog_image.png"
              }
              alt=""
              // old petfinder photo links are dead, so swap in the placeholder
              onError={(e) => {
                if (!e.currentTarget.src.endsWith("/missing-animal.png")) {
                  e.currentTarget.src = "/missing-animal.png";
                }
              }}
            />
          }
        </div>
        <h3>{animal.name}</h3>
        <p>Breed: {animal.breeds.primary}</p>
        <p>Color: {animal.colors.primary}</p>
        <p>Gender: {animal.gender}</p>
      </article>
    </Link>
  );
};

export default Pet;

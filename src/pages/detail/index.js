import React, { useEffect, useState } from "react";
import { getPetDetails } from "../../api/petfinder";
import Hero from "../../components/hero";

// Import useParams
import { useParams } from "react-router-dom";
// Import Navigate
import { Navigate } from "react-router-dom";

const PetDetailsPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // pulls :id out of the url, like "123" from /dog/123
  const { id } = useParams();

  useEffect(() => {
    async function getPetsData() {
      try {
        const petsData = await getPetDetails(id);
        setData(petsData);
        setError(false);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }

    getPetsData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <div>
          {/* Redirect to /pet-details-not-found if there was an error! */}
          {/* replace so the back button skips this page instead of redirecting again */}
          <Navigate to="/pet-details-not-found" replace />
        </div>
      ) : (
        <main>
          <Hero
            image={data.photos[1]?.full || "https://i.imgur.com/aEcJUFK.png"}
            displayText={`Meet ${data.name}`}
          />
          <div className="pet-detail">
            <div className="pet-image-container">
              <img
                className="pet-image"
                src={
                  data.photos[0]?.medium || "https://i.imgur.com/aEcJUFK.png"
                }
                alt=""
                // old petfinder photo links are dead, so swap in the placeholder
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith("/missing-animal.png")) {
                    e.currentTarget.src = "/missing-animal.png";
                  }
                }}
              />
            </div>
            <div>
              <h1>{data.name}</h1>
              <h3>Breed: {data.breeds.primary}</h3>
              <p>Color: {data.colors.primary || "Unknown"}</p>
              <p>Gender: {data.gender}</p>
              <h3>Description</h3>
              <p>{data.description}</p>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default PetDetailsPage;

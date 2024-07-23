import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";

function Favorites({ quote }) {
  const [favIcon, setFavIcon] = useState(false); // State for favorite icon
  const navigate = useNavigate();

  // Effect to check if the current quote is favorited
  useEffect(() => {
    checkFavorite(); // Check if the current quote is favorited
  }, [quote.id]);
  
  // Check if the current quote is favorited by the user
  const checkFavorite = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");

      if (!token || !userId) {
        console.error("Token or user ID not found");
        return;
      }

      // Get favorites for the current user
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/favorites/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const favorites = response.data;
      if (Array.isArray(favorites)) {
        const isFavorite = favorites.some(
          (favorite) => favorite.id === quote.id
        );
        setFavIcon(isFavorite);
      } else {
        console.error("Favorites is not an array:", favorites);
      }
    } catch (error) {
      console.error("Failed to check favorites:", error);
    }
  };

  // Toggle favorite status for the current quote
  const handleFavoriteToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");

      if (!token || !userId) {
        navigate("/login");
        return;
      }

      if (favIcon) {
        // Remove from favorites
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/favorites/${quote.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id_user: userId,
            id_quote: quote.id,
          },
        });
        setFavIcon(false);
      } else {
        // Add to favorites
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/favorites`,
          {
            id_user: userId,
            id_quote: quote.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavIcon(true); // Update local state
      }
    } catch (error) {
      console.error("Failed to add/remove favorite:", error);
    }
  };

  // Render the favorite button
  return (
    <div className="flex">
      {favIcon ? (
        <button className="flex" href="#">
          <HeartIcon
            onClick={handleFavoriteToggle}
            className="w-2/12 text-red-700"
          />
        </button>
      ) : (
        <button className="flex" href="#">
          <HeartIconOutline
            onClick={handleFavoriteToggle}
            className="w-2/12 text-gray-700"
          />
        </button>
      )}
    </div>
  );
}

export default Favorites;

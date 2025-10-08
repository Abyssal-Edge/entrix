import React, { useState, useEffect } from "react";
import FavouritesPage from "./pages/FavouritesPage";
import SearchPage from "./pages/SearchPage";
import "./App.css";

function App() {
  const [favourites, setFavourites] = useState(() => {
    try {
      const raw = localStorage.getItem("favourites");
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      
      console.error("Failed to parse favourites from localStorage:", err);
      return [];
    }
  });

  const [page, setPage] = useState("favourites");

  useEffect(() => {
    try {
      localStorage.setItem("favourites", JSON.stringify(favourites));
    } catch (err) {
      console.error("Failed to save favourites to localStorage:", err);
    }
  }, [favourites]);

  const addToFavourites = (show) => {
    if (!favourites.find((fav) => fav.id === show.id)) {
      setFavourites([...favourites, show]);
    }
  };

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>📺 TV Show App</h1>
        <div>
          <button
            className={page === "favourites" ? "active" : ""}
            onClick={() => setPage("favourites")}
          >
            Favourites
          </button>
          <button
            className={page === "search" ? "active" : ""}
            onClick={() => setPage("search")}
          >
            Search
          </button>
        </div>
      </nav>

      {page === "favourites" ? (
        <FavouritesPage favourites={favourites} remove={removeFromFavourites} />
      ) : (
        <SearchPage
          favourites={favourites}
          add={addToFavourites}
          remove={removeFromFavourites}
        />
      )}
    </div>
  );
}

export default App;

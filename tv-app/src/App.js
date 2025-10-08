import React, { useState, useEffect} from "react";
import FavouritesPage from "./pages/FavouritesPage";
import SearchPage from "./pages/SearchPage";
import "./App.css";

function App() {
  const [favourites, setFavourites] = useState([]);
  const [page, setPage] = useState("favourites");

  useEffect(()=> {
    try{
      const saved = JSON.parse(localStorage.getItem("favourites"));
      if(Array.isArray(saved)){
        setFavourites(saved);
      }
    } catch (err) {
      console.error("Failed to load favourites:", err);
      setFavourites([]);
    }
  }, []);
  useEffect(()=> {
    try{
    localStorage.setItem("favourites", JSON.stringify(favourites));
    } catch (err) {
      console.error("Failed to load favourites:", err);
    }
  }, [favourites]);

  const addtoFavourites = (show) => {
    if(!favourites.find((fav)=> fav.id === show.id)){
      setFavourites([...favourites, show]);
    }
  };

  const removeFavourites = (id) => {
    setFavourites(favourites.filter((fav)=> fav.id !== id));
  };

  return(
    <div className="App">
      <nav className="navbar">
        <h1> TV Show App</h1>
        <div>
          <button className={page === "favourites" ? "active" : ""} onClick={()=>
          setPage("favourites")}>Favourites </button>

          <button className={page === "search" ? "active" : ""} onClick={()=>
          setPage("search")}>Search </button>
        </div>
      </nav>

      {page === "favourites" ? (
        <FavouritesPage favourites={favourites} remove={removeFavourites} />
      ) : (
        <SearchPage favourites={favourites} add={addtoFavourites} remove={removeFavourites} />
      )}
    </div>
  );
}

export default App;

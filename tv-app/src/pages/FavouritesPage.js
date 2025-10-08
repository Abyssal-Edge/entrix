import React from "react";

export default function FavouritesPage({ favourites, remove}) {
    return(
        <div className="page">
            <h3> Favourite Shows</h3>
            {favourites.length === 0 ? (
                <p> No favourite show. Use search and add some shows.</p>
            ): (
                <div className="grid"> {favourites.map((show) =>
                    <div key={show.id} className="card">
                        <img src={show.image?.medium} alt = {show.name}/>
                        <h3> {show.name}</h3>
                        <p>{show.genres?.join(", ")}</p>
                        <button onClick={() =>
                            remove(show.id)}>Remove</button>
                    </div>
                    )}
                </div>
            )}
        </div>
    );
}
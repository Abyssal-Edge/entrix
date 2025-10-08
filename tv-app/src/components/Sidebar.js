import React from "react";

export default function Sidebar({favourites, remove}) {
    return (
        <div className="sidebar">
            <h3>Favourites</h3>
            {favourites.length === 0 ? (
                <p>No favourites</p>
            ) : (
                favourites.map((show) => (
                    <div key={show.id} className="fav-item">
                        <img src={show.image?.medium} alt={show.name}/>
                        <span>{show.name}</span>
                        <button onClick={() =>
                            remove(show.id)}>❌</button>
                    </div>
                ))
            )}
        </div>
    );
}
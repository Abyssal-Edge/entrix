import React, {useState} from "react";
import Sidebar from "../components/Sidebar";

export default function SearchPage({favourites, add, remove}) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState ([]);

    const searchShows = async (e) => {
        e.preventDefault();
        if(!query) return;
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        const data = await res.json();
        setResults(data.map((item) => 
        item.show));
    };

    return (
        <div className="search-page">
            <Sidebar favourites = {favourites}
            remove = {remove} />
            <div className="s-content">
                <form onSubmit={searchShows} className="search-bar">
                    <input value={query} onChange={(e) =>(
                        setQuery(e.target.value))}
                        placeholder="Search TV Shows"/>
                    <button type="submit">Search</button>
                </form>
                <div className="grid">
                    {results.map((show)=> (
                        <div key={show.id} className="card">
                            <img src={show.image?.medium} alt = {show.name} />
                            <h3>{show.name}</h3>
                            <p>{show.genres?.join(", ")}</p>
                            <p>{show.summary?show.summary.replace(/<[^>]+>/g,"").slice(0, 100) + "..." : "No summary available"}</p>
                            <button type="button" onClick={() =>
                                add(show)}>Add to Favourites</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
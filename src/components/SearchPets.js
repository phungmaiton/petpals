import React from "react";

export default function SearchPet({ setSearchTerm }) {
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="container m-auto px-2 pt-10 pb-10">
        <h3 className="mb-5">Search pets near you</h3>
        <input
            onChange={handleChange}
            type="text"
            className="search"
            placeholder="Enter your city name"
        />
    </div>
  );
}
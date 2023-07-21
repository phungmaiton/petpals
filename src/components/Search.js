export default function Search({ setSearchTerm, setDistanceRadius }) {
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="container m-auto px-2 pt-10 pb-10">
      <h3 className="mb-5">Search meetups near you</h3>

      <input
        onChange={handleChange}
        type="text"
        className="search"
        placeholder="Enter your location"
      />
      <select
        onChange={(e) => setDistanceRadius(e.target.value)}
        type="text"
        className="search"
        placeholder="Distance radius in km"
      >
        <option value="10">10km</option>
        <option value="15">15km</option>
        <option value="20">20km</option>
      </select>
    </div>
  );
}

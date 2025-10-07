/* SearchBar.jsx */
import './styles/SearchBar.css'
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const query = searchTerm.trim();
    if (!query) {

    }
    // Handle search logic here:
    //
    //
    console.log(`Searching for: "${query}"`);
    setSearchTerm("")
  }
    return (
      <form
        className="search-bar"
        onSubmit={handleFormSubmit}
        role="search"
      >
        <input
          type="text"
          placeholder="Search anything..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search input field"
        />
        <button
          type="submit"
          className="search-button"
          aria-label="Submit search"
        >
        <span role="img" aria-label="Search icon">
          &#128269;
        </span>
        </button>
      </form>
    );
}

export default SearchBar;
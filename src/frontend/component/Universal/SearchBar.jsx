/* SearchBar.jsx */
import '../../styles/Universal/SearchBar.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch, mode = "user" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const query = searchTerm.trim();
    if (!query) return;

      if (mode === "user") {
          // normal user -> redirect to SearchResult page
          navigate(`/SearchResult?q=${encodeURIComponent(query)}`);
      } else if (mode === "admin") {
          // admin mode -> pass query up to parent (Remove or Update)
          onSearch?.(query.trim());
      }
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
import { useState } from "react";

const SearchBar = ({onSearchChange},{categoryMenuButton}) => {
    const [searchInput, setSearchInput] = useState("")

  // Function for Search bar
  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
    onSearchChange(e.target.value)
}
    return(
        <>
            <input className="searchbar" type="text" value={searchInput} placeholder="Search" onChange={handleSearchChange}/>
        </>
    )
}

export default SearchBar;
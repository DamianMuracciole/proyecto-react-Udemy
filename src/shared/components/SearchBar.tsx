import { useEffect, useState } from "react";

interface Props {
  placeHolder?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeHolder = "Buscar gifs", onQuery }: Props) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(()=>{onQuery(query)},1500)
    
    return () => {
      clearTimeout(timeOutId)
    }
  }, [query,onQuery])
  

  const handleSearch = () => {
    onQuery(query);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)=> {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeHolder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { useGifs } from "./gifs/hooks/useGifs";
// import { useState } from "react";
// import { mockGifs } from "./mock-data/gifs.mock";
// import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
// import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const { searchedGifs, previousTerms, handleSearch, handleTermsClicked } = useGifs();

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el gif perfecto"
      />

      {/* Search */}
      <SearchBar placeHolder="Buscá lo que quieras" onQuery={handleSearch} />

      {/* busquedas previas */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermsClicked}
      />

      {/* Gifs
      <GifList gifs={mockGifs} /> */}

      {/* Gifs */}
      {searchedGifs && <GifList gifs={searchedGifs} />}
    </>
  );
};

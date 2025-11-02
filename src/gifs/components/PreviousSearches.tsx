import type { FC } from "react";

interface Props {
  searches: string[];
  onLabelClicked?: (term: string) => void;
}

export const PreviousSearches: FC<Props> = ({ searches, onLabelClicked }) => {
  return (
    <div className="previous-searches">
      <h2>Búsquedas previas</h2>
      <ul className="previous-searches-list">
        {searches.map((el) => (
          <li 
            key={el} 
            onClick={() => onLabelClicked && onLabelClicked(el)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

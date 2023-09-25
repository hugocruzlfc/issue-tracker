import React from "react";

export interface SearchFormProps {
  setSearchValue: (value: React.SetStateAction<string>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ setSearchValue }) => {
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = e.currentTarget.elements.namedItem(
      "search"
    ) as HTMLInputElement | null;

    if (searchInput) {
      setSearchValue(searchInput.value);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setSearchValue("");
    }
  };

  return (
    <div>
      <h3>Search Issues</h3>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search"
          onChange={handleOnChange}
        />
      </form>
    </div>
  );
};

export default SearchForm;

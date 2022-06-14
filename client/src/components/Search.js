import { useRef } from "react";

import "./Search.css";

const Search = ({ onSubmit }) => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target[0].value);
  };

  const handleReset = () => {
    form.current.reset();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="Search" ref={form}>
      <input
        className="Search-input"
        type="number"
        min="2006"
        max="2022"
        maxLength="4"
        defaultValue="2006"
        required
      />
      <input className="Search-submit" type="submit" value="apply" />
      <input
        className="Search-reset"
        type="button"
        value="reset"
        onClick={handleReset}
      />
    </form>
  );
};

export default Search;

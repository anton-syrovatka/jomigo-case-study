import { useState } from "react";

import Search from "./components/Search";
import List from "./components/List";
import Paging from "./components/Paging";

import { useGetLaunches } from "./api";

import "./App.css";

const App = () => {
  const [page, setPage] = useState(1);
  const [year, setYear] = useState();
  const { loading, data } = useGetLaunches({ page, year });
  const { docs: launches = [], ...pagingProps } = data;

  const onSearchSubmit = (year) => {
    setYear(year);
    setPage(1);
  };

  return (
    <div className="App">
      <Search year={year} onSubmit={onSearchSubmit} />
      <List launches={launches} loading={loading} />
      <Paging onChange={(value) => setPage(value)} pagingProps={pagingProps} />
    </div>
  );
};

export default App;

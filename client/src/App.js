import { useState, useEffect } from "react";

import Search from "./components/Search";
import List from "./components/List";
import Paging from "./components/Paging";

import "./App.css";

const useGetLaunches = ({ page, year }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    let controller = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const query = new URLSearchParams({ page, year });
        const response = await fetch(
          "http://localhost:3000/api/space-x-launches?" + query,
          {
            signal: controller.signal,
          }
        );

        setLoading(false);
        setData(await response.json());
        controller = null;
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    })();

    return () => controller?.abort();
  }, [page, year, setLoading, setData]);

  return { loading, data };
};

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

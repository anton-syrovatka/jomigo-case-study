import { useState, useEffect } from "react";

export const useGetLaunches = ({ page, year }) => {
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
        console.log(e.message);
      }
    })();

    return () => controller?.abort();
  }, [page, year, setLoading, setData]);

  return { loading, data };
};

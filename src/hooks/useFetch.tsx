import { useState, useEffect } from "react";

const useFetch = <T,>(): [
  T[],
  React.Dispatch<React.SetStateAction<string>>
] => {
  const [data, setData] = useState<T[]>([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    if (url)
      fetch(url, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log(err));

    return () => controller.abort();
  }, [url]);

  return [data, setUrl];
};
export default useFetch;

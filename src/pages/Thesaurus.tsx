import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
interface apiResponse {
  word: string;
}

export default function Thesaurus() {
  const [word, setWord] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [synonyms, setSynonymsUrl] = useAPIParse();
  const [antonyms, setAntonymsUrl] = useAPIParse();

  useEffect(() => {
    setSynonymsUrl(
      "https://api.datamuse.com/words?max=10&rel_syn=" + searchWord
    );
    setAntonymsUrl(
      "https://api.datamuse.com/words?max=10&rel_ant=" + searchWord
    );
  }, [searchWord]);

  //   useEffect(() => {
  //     if (data) setSynonyms(data.map((value: apiResponse) => value.word));
  //   }, [data]);

  //   useEffect(() => {
  //     const controller = new AbortController();
  //     const signal = controller.signal;

  //     fetch("https://api.datamuse.com/words?max=10&ml=" + searchWord, {
  //       signal: signal,
  //     })
  //       .then((response) => response.json())
  //       .then((response) => response.map((value: apiResponse) => value.word))
  //       .then((response) => {
  //         setSynonyms(response);
  //       })
  //       .catch((err) => console.log(signal.aborted));

  //     fetch("https://api.datamuse.com/words?max=10&rel_ant=" + word, {
  //       signal: signal,
  //     })
  //       .then((response) => response.json())
  //       .then((response) => response.map((value: apiResponse) => value.word))
  //       .then((response) => {
  //         setAntonyms(response);
  //       })
  //       .catch((err) => console.log(signal.aborted));

  //     return () => {
  //       controller.abort();
  //     };
  //   }, [searchWord]);

  return (
    <div>
      <p>
        This is my solution to the problem from{" "}
        <a href="https://www.youtube.com/watch?v=-Rtlnsgbc0k">this</a> youtube
        video
      </p>
      <p>
        This page uses the{" "}
        <a href="https://www.datamuse.com/api/">Datamuse API</a>.
      </p>
      <p></p>
      <div>
        <input onChange={(e) => setWord(e.target.value)} value={word}></input>
        <button onClick={(e) => setSearchWord(word)}>Submit</button>
        <br />
        <br />
        <div>
          {searchWord &&
            (synonyms.length > 0
              ? "Synonyms: " + synonyms.join(", ")
              : "None Found")}
          <br />
          <br />
          {synonyms.length > 0 &&
            "Antonyms: " +
              (antonyms.length > 0 ? antonyms.join(", ") : "None Found")}
        </div>
      </div>
    </div>
  );
}

const useAPIParse = () => {
  const [data, setUrl] = useFetch<apiResponse>();

  return [data.map((value: apiResponse) => value.word), setUrl] as const;
};

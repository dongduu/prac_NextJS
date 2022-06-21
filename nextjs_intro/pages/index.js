import { useEffect, useState } from "react";
import Title from "../components/Title";

const API_KEY = "cd124d01880b35b0167250cac4dba58a";

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(
          `http://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
      ).json();

      setMovies(results);
    })();
  }, []);
  return (
    <div>
      <Title title="Home" />
      {!movies && <h4>Loading...</h4>}
      {movies?.map((item) => (
        <div key={item.id}>
          <h4>{item.original_title}</h4>
        </div>
      ))}
    </div>
  );
}

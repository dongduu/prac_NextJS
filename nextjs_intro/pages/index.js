import Link from "next/link";
import { useRouter } from "next/router";
import Title from "../components/Title";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id) => {
    router.push(`/movies/${id}`);
  };
  return (
    <div className="container">
      <Title title="Home" />
      {results?.map((item) => (
        <div onClick={() => onClick(item.id)} className="movie" key={item.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
          <h4>
            <Link href={`/movies/${item.id}`} key={item.id}>
              <a>{item.original_title} </a>
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}

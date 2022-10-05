import { useEffect, useState } from "react";
import Link from "next/link";

export default function App() {
  const [data, setData] = useState([]);

  const getRepository = async () => {
    const ftch = await fetch(
      "https://api.github.com/search/repositories?q=%20user:Sergio3215%20topic:stream"
    );
    const repo = await ftch.json();
    console.log(repo);
    let data = [];

    repo.items.map((git) => {
      const {
        name,
        default_branch,
        updated_at,
        language,
        downloads_url,
        created_at,
      } = git;

      data.push({
        name: name,
        update: updated_at.replace("T", " ").replace("Z", " "),
        create: created_at.replace("T", " ").replace("Z", " "),
        language: language,
        downloads: `https://github.com/Sergio3215/${name}/archive/refs/heads/${default_branch}.zip`,
      });
    });

    setData(data);
  };

  useEffect(() => {
    getRepository();
  }, []);

  return (
    <>
      <h1>Repositorios del stream!</h1>
      <div id="item--Container">
        {data != [] ? (
          data.map((dt) => (
            <div id="item--ITM">
              <div>
                <h2>
                  {" "}
                  <Link href={"https://github.com/Sergio3215/" + dt.name}>
                    {dt.name}
                  </Link>{" "}
                </h2>
              </div>
              <div>
                <h3>Lenguaje: {dt.language}</h3>
              </div>
              <div>
                <h3>Creado: {dt.create}</h3>
              </div>
              <div>
                <h3>Actualizado: {dt.update}</h3>
              </div>
              <div>
                <Link href={dt.downloads} passHref>
                  <a>
                    <button>Download</button>
                  </a>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <>No hay datos</>
        )}
      </div>
    </>
  );
}

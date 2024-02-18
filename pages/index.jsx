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
        description,
      } = git;

      data.push({
        name: name,
        update: updated_at.replace("T", " ").replace("Z", " "),
        create: created_at.replace("T", " ").replace("Z", " "),
        language: language,
        downloads: `https://github.com/Sergio3215/${name}/archive/refs/heads/${default_branch}.zip`,
        description: (description == null) ? "none" : description,
      });
    });

    setData(data);
  };

  useEffect(() => {
    getRepository();
  }, []);

  return (
    <>
      <h1 style={{
        display: "flex",
        justifyContent: "center",
        color:"rgb(157 113 224)"
      }}><u>Repositorios del stream! de Principiante en Programar</u></h1>
      <h2 style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        margin:"30px"
      }}>Me llamo Principiante en programar en Twitch y Youtube.<br/><br/> Soy Sergio y soy desarrollador desde hace 5 años.<br /> Soy desarrollador FullStack, y desarrollador en la herramienta de Microsoft - Power Platform</h2>
      <div id="item--Container">
        {data != [] ? (
          data.map((dt) => (
            <div id="item--ITM" style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              textAlign: "center",
              flexDirection: "column"
            }} onClick={()=>location.href="https://github.com/Sergio3215/" + dt.name}>
              <div>
                <h1
                  style={{
                    fontSize:dt.name.length > 26? "27.8px":"28px"
                  }}>
                  {" "}
                  <Link href={"https://github.com/Sergio3215/" + dt.name}>
                    {dt.name}
                  </Link>{" "}
                </h1>
              </div>
              <div
              style={{
                height: "120px"
              }}
              >
                {
                  dt.description != "none" ?

                    <h3 style={{
                      fontSize:dt.description.length > 55? "19.5px":"20px"
                    }}>{dt.description}</h3>
                    :
                    <></>
                }
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

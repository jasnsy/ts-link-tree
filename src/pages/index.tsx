import { type NextPage } from "next";
import Image from "next/image";
import data from '../../data.json'
import Head from "next/head";
// import Link from "next/link";

// import { api } from "../utils/api";

interface LinkCard {
  title: string;
  url: string;
  image: string;
}

const LinkCard = ({title, url, image} : LinkCard) => {
  return (
    <a href={url} rel="noreferrer" target="_blank" className="flex items-center p-1 w-3/4 max-w-3xl rounded-md hover:scale-105 transition-all border border-white mb-3 bg-white bg-opacity-50">
      <div className="flex text-center w-full">
        <div className="w-10 h-10">
          {
            image ? (
              <Image 
                className="rounded-sm" 
                alt={title}
                src={image} 
                width={40} 
                height={40}
              />
            ) : <div className="monogram">JSy</div> 
        }

        </div>
        <h2 className="flex justify-center items-center font-semibold w-full text-gray-700 -ml-10">
          {title}
        </h2>
      </div>
    </a>
  )
}

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
    <Head>

    </Head>
    <main>
      <div className="flex items-center flex-col mx-auto w-full justify-center mt-16">
        <Image 
          className="rounded-full" 
          alt={data.name}
          src={data.avatar} 
          width={100} 
          height={100}
        />
        <h1 className="font-bold mt-4 text-xl text-white">
          {data.name}
        </h1>
        <h2 className="mt-1 text-m mb-8 text-white">
          {data.description}
        </h2>
        {data.links.map((link) => (
          <LinkCard key={link.url} {...link} />
        ))}
      </div>
    </main>
    </>
  );
};

export default Home;

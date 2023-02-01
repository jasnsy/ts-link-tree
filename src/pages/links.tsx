import { type NextPage } from "next";
import Image from "next/image";
import data from '../../data.json'
import Head from "next/head";
import LinkCard from "./components/LinkCard";

const Home: NextPage = () => {

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
        <h2 className="flex items-center justify-center text-center w-full mt-1 text-m mb-8 px-2 text-white">
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

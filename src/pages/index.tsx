import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CreateGameForm from "../components/CreateGameForm";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Online cards generator</title>
        <meta name="description" content="Create and share a card deck distribution" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <CreateGameForm />
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;

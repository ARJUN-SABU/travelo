import Head from "next/head";
import Image from "next/image";
// import styles from '../styles/Home.module.css'

// Components
import Navbar from "../components/Navbar";

//Images
import Image1 from "../public/travelo_img_1.svg";

export default function Home() {
  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col items-center">
      <Head>
        <title>travelo</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <Navbar showSearch={true} />

      {/* Banner */}
      <div className="mt-52 md:mt-6 lg:mt-16 w-full flex flex-col items-center lg:flex-row-reverse lg:justify-center lg:px-[67px]">
        <div className="w-full md:w-3/4 lg:w-11/12">
          <Image src={Image1}></Image>
        </div>
        <div className="text-center mt-16 pb-16">
          <h1 className="font-bold text-gray-800 text-4xl px-2 lg:text-6xl lg:leading-tight tracking-wide">
            Your One-Stop Travel Solution!
          </h1>
          <p className="px-4 pt-5 text-2xl leading-snug tracking-wide">
            Best Hotels and Resorts carefully handpicked to craft your vacation!
          </p>
        </div>
      </div>

      <div className="bg-sky-600 fixed lg:absolute left-0 bottom-0 w-screen h-[20px] lg:w-[500px] lg:h-[130px] lg:rounded-tr-full"></div>
    </div>
  );
}

import { useRouter } from "next/router";

function Cancel() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1>Whoops! Payment Failed</h1>
      <button
        className="bg-sky-500 font-semibold px-4 py-2 mt-2"
        onClick={() => {
          router.push("/");
        }}
      >
        Try Again
      </button>
    </div>
  );
}
export default Cancel;

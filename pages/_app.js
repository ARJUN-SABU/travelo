import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

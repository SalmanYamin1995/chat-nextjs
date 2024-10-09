import "@/styles/reset.css";
import "@/styles/globals.css";
import "@/styles/theme.css";

import "primeflex/primeflex.min.css";
import "primeicons/primeicons.css";

import { PrimeReactProvider } from "primereact/api";
import { SessionProvider } from "next-auth/react";
import Font from "@/src/UI/fonts/fonts";
import Header from "@/src/UI/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

export default function App({ Component, pageProps }) {
  const [visible, setVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setVisible(true);
    });

    router.events.on("routeChangeComplete", () => {
      setVisible(false);
    });
    let header;
    const headers = document.querySelectorAll("#header");
    if (headers.length > 1) {
      if (headers[0].offsetHeight > 0) {
        header = headers[0];
      } else {
        header = headers[1];
      }
    } else {
      header = headers[0];
    }

    const headerHeight = header.offsetHeight;
    setHeaderHeight(headerHeight);
    const screenHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const contentHeight = screenHeight - headerHeight;
    setContentHeight(contentHeight);
  }, []);
  const DialogLoader = dynamic(() =>
    import("@/src/UI/Loaders").then((e) => e.DialogLoader),
  );
  function renderLoader() {
    if (visible) {
      return <DialogLoader visible={visible} />;
    }
    return <></>;
  }
  return (
    <SessionProvider>
      <PrimeReactProvider>
        <style jsx global>
          {`
            #content {
              transform: translateY(${headerHeight}px);
            }
            .full-screen-h {
              min-height: ${contentHeight}px;
            }
          `}
        </style>
        <Font />
        <Header />
        {renderLoader()}
        <div id="content">
          <Component {...pageProps} />
        </div>
        <span id="primary-color" className={"primary-color"}></span>
      </PrimeReactProvider>
    </SessionProvider>
  );
}

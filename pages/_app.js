import Header from "@/Components/Header";
import NavBar from "@/Components/NavBar";
import "@/styles/globals.css";
import { ToastContainer } from "react-nextjs-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "@/Store";
import React from "react";
import { Router } from "next/router";
import GenLoader from "@/Components/GenLoader";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          {<Component {...pageProps} loading={loading} />}
        </AnimatePresence>
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}

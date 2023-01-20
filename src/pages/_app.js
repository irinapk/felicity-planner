import "@/styles/globals.css";
import Layout from "components/Layout";
import LoginProvider from "context/LoginContext";
import { useRouter } from "next/router";
import "../fonts/fonts.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const getContent = () => {
    if (router.pathname === "/") return <Component {...pageProps} />;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return <LoginProvider>{getContent()}</LoginProvider>;
}

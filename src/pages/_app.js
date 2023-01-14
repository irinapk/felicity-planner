import "@/styles/globals.css";
import Layout from "components/Layout";
import LoginProvider from "context/LoginContext";
import { useLoginCtx } from "context/LoginContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLoginUser from "store/store";
import "../fonts/fonts.css";

export default function App({ Component, pageProps }) {
  const [isLogin, setIsLogin] = useState(false);
  const logged = useLoginUser((state) => state.isLogin);
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

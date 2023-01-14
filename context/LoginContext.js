import {createContext, useContext, useState} from "react";

const LoginContext = createContext({});

export function useLoginCtx() {
    return useContext(LoginContext);
}

export default function LoginProvider({children}) {

    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");

    function userLogin(name, value) {
        setUsername(name);
        setIsLogin(value);
    }

    return (
        <LoginContext.Provider value={[isLogin, username, userLogin]}>
            {children}
        </LoginContext.Provider>
    )

}
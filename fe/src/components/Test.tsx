import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Test() {
    const authContext = useContext(AuthContext);

    return <div>Welcome {authContext.user?.name}</div>;

}

export default Test;
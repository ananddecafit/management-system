import { CredentialResponse } from "@react-oauth/google";
import { createContext } from "react";

export const AuthContext = createContext<{
    credentialResponse?: CredentialResponse;
    user?: any;
}>({});
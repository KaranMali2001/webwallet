import { SecretProvider } from "./secrateContextProvider";

export const Providers = ({ children }) => {
    return <SecretProvider>{children}</SecretProvider>;
  };
  
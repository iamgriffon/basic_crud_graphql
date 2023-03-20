import { UserContextProvider } from "@/context/userContext";
import { useApollo } from "@/server/apolloClient";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo();
  return (
    <UserContextProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserContextProvider>
  );
}

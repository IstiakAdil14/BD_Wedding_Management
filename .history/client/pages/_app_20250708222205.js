import "../styles/globals.css";
import { DarkModeProvider } from "../context/DarkModeContext";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider>
        <DarkModeProvider>
          <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <Navbar />
            <Component {...pageProps} />
          </div>
        </DarkModeProvider>
      </AuthProvider>
    </SWRConfig>
  );
}

export default MyApp;

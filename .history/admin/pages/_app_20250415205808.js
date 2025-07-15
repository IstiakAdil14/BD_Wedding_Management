import '../styles/globals.css';
import { DarkModeProvider } from '../../client/context/DarkModeContext';

export default function App({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <Component {...pageProps} />
    </DarkModeProvider>
  );
}

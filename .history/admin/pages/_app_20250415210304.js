import '../styles/globals.css';
import { DarkModeProvider } from '../context/DarkModeContext';

export default function App({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <Component {...pageProps} />
    </DarkModeProvider>
  );
}

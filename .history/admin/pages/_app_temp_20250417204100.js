import '../styles/globals.css';
import { DarkModeProvider } from '../context/DarkModeContext';
import ManagementMenu from '../components/ManagementMenu'; // Import ManagementMenu

export default function App({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <ManagementMenu /> {/* Include ManagementMenu in the layout */}
      <Component {...pageProps} />
    </DarkModeProvider>
  );
}

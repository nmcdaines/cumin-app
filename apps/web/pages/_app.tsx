import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { AuthProvider } from "web/context/AuthContext";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  
  return (
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </DndProvider>
  );
}

export default App;

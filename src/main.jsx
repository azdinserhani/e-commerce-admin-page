import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { DarkModeContextProvider } from "./context/darkModeContext.jsx";
import { Provider } from "react-redux";
import { store, persister } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <DarkModeContextProvider>
          <App />
          <ToastContainer autoClose={3000} />
        </DarkModeContextProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);

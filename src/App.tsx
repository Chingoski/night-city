import ApplicationContextProvider from "./context/ApplicationContextProvider";

import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
function App() {
  return (
    <ApplicationContextProvider>
      <RouterProvider router={router} />
    </ApplicationContextProvider>
  );
}

export default App;

import { Provider } from "react-redux";
import { store } from "./Store/store";
import Router from "./Navigation/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;

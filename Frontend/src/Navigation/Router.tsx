import React from "react";
import { routes } from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appDispatch } from "../Store/store";
import { updateBrowser } from "../Store/Reducers/browser";

const Router = () => {
  React.useEffect(() => {
    const updateBrowserHeight = () =>
      appDispatch(
        updateBrowser({
          height: window.innerHeight + "px",
          width: window.innerWidth + "px",
        })
      );

    window.addEventListener("resize", updateBrowserHeight);
    return () => {
      window.removeEventListener("resize", updateBrowserHeight);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ subRoutes, ...route }, index) => (
          <Route key={index} {...route}>
            {subRoutes ? (
              subRoutes.map(({ ...route }) => <Route {...route} />)
            ) : (
              <></>
            )}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

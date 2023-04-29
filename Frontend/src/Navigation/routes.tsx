import Home from "../Pages/Home";
import SinglePlayer from "../Pages/SinglePlayer";
import Error from "../Pages/Error";
import MultiPlayer from "../Pages/MultiPlayer";
import Connect from "../Pages/MultiPlayer/Connect";
import Game from "../Pages/MultiPlayer/Game";
import Lobby from "../Pages/MultiPlayer/Lobby";
export const routes = [
  {
    index: true,
    exact: true,
    element: <Home />,
  },
  {
    path: "single-player",
    exact: true,
    element: <SinglePlayer />,
  },
  {
    path: "multi-player",
    element: <MultiPlayer />,
    subRoutes: [
      { index: true, key: 1, element: <Connect /> },
      {
        path: "lobby",
        exact: true,
        key: 2,
        element: <Lobby />,
      },
      { path: "game", key: 3, exact: true, element: <Game /> },
    ],
  },
  { path: "*", element: <Error /> },
];

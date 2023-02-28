import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./Component/ProtectedRoute";
import { LogPage } from "./Routes/Auth/LogPage";
import { ErrorPage } from "./Routes/ErrorPage/ErrorPage";
import { HomePage } from "./Routes/HomePage/HomePage";
import { FormAddWeapons } from "./Routes/WeaponsPage/FormAddWeapons/FormAddWeapons";
import { WeaponsPage } from "./Routes/WeaponsPage/WeaponsPage";


export const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    erroElement:<ErrorPage/>,
    children:[
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path:"/auth",
        element:<LogPage/>
      },
      {
        path:"/weapons",
        element:<ProtectedRoute><WeaponsPage/></ProtectedRoute>
      },
      {
        path:"/weapons/addweaponsform",
        element:<ProtectedRoute><FormAddWeapons/></ProtectedRoute>
      }
    ]
  }
])
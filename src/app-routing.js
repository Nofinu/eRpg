import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./Component/ProtectedRoute";
import { LogPage } from "./Routes/Auth/LogPage";
import { CharaClassesPage } from "./Routes/CharaClassesPages/CharaClassesPage";
import { FormCharaClasses } from "./Routes/CharaClassesPages/FormCharaClasses/FormCharaClasses";
import { CharactersPage } from "./Routes/CharacterPages/CharactersPage";
import { ErrorPage } from "./Routes/ErrorPage/ErrorPage";
import { HomePage } from "./Routes/HomePage/HomePage";
import { FormWeapons } from "./Routes/WeaponsPage/FormAddWeapons/FormWeapons";
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
        path:"/weapons/:id",
        element:<ProtectedRoute><FormWeapons/></ProtectedRoute>
      },
      {
        path:"/characlasses",
        element:<ProtectedRoute><CharaClassesPage/></ProtectedRoute>
      },
      {
        path:"/characlasses/:id",
        element:<ProtectedRoute><FormCharaClasses/></ProtectedRoute>
      },
      {
        path:"/characters",
        element:<ProtectedRoute><CharactersPage/></ProtectedRoute>
      }
    ]
  }
])

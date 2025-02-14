// Styles
import './App.css'
import './styles/main.scss'
import {BrowserRouter, Routes} from "react-router-dom";
import {JSX, Suspense} from "react";

// Routes
import UserRoutes from "@routes/user/UserRoutes.tsx";
import AdminRoutes from "@routes/admin/AdminRoutes.tsx";

const RouteArray: JSX.Element[] = [
    ...UserRoutes,
    ...AdminRoutes
]

const App = () => {

  return (
      <BrowserRouter>
          <Suspense fallback={<div> Now Loading... </div>}>
              <Routes>
                  {RouteArray}
              </Routes>
          </Suspense>
      </BrowserRouter>
  )
}

export default App

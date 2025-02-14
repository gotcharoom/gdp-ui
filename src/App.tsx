// Styles
import './App.css'
import './styles/main.scss'
import {BrowserRouter, Routes} from "react-router-dom";
import {Suspense} from "react";

// Routes
import UserRoutes from "@routes/user/UserRoutes.tsx";
import AdminRoutes from "@routes/admin/AdminRoutes.tsx";

const App = () => {

  return (
      <BrowserRouter>
          <Suspense>
              <Routes>
                  {UserRoutes}
                  {AdminRoutes}
              </Routes>
          </Suspense>
      </BrowserRouter>
  )
}

export default App

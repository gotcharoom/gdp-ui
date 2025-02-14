// Styles
import './App.css'
import './styles/main.scss'
import {RouterProvider} from "react-router-dom";
import CustomRouter from "@routes/CustomRouter.tsx";

const App = () => {

  return (
    <RouterProvider router={CustomRouter} />
  )
}

export default App

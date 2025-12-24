import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router"
import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const routes = createRoutesFromElements(
  <>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      {/* <Route path="step-2" loader={step2Loader} Component={StepTwo} /> */}
    </Route>
  </>
)

const router = createBrowserRouter(routes)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

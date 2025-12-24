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
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme as muiCreateTheme,
  THEME_ID,
} from "@mui/material"

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

const materialTheme = muiCreateTheme({
  palette: {
    primary: {
      main: "#34c94b",
    },
    secondary: {
      main: "#121212",
    },
  },
})

function App() {
  return (
    <>
      <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        <RouterProvider router={router} />
      </MaterialThemeProvider>
    </>
  )
}

export default App

import { Suspense, lazy } from "react"
import NavBar from "./NavBar"
import { Route, Routes } from "react-router-dom"

const Home = lazy(() => import("./pages/Home"))
const CheckoutLines = lazy(() => import("./pages/CheckoutLines"))
const Sudoku = lazy(() => import("./pages/Sudoku"))
const Thesaurus = lazy(() => import("./pages/Thesaurus"))
const Memory = lazy(() => import("./pages/Memory"))
const ColorGuesser = lazy(() => import("./pages/ColorGuesser"))

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/ReactStuff/" element={<Home />} />
          <Route path="/Thesaurus/" element={<Thesaurus />} />
          <Route path="/CheckoutLines/" element={<CheckoutLines />} />
          <Route path="/Sudoku/" element={<Sudoku />} />
          <Route path="/Memory/" element={<Memory />} />
          <Route path="/ColorGuesser/" element={<ColorGuesser />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

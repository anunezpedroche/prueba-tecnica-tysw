import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom"
import { HeroesList } from "../pages/HeroesList"
import { HeroesDetail } from "../pages/HeroesDetail"

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route index path="/home" element={<HeroesList />} />
        <Route path="/hero/:id" element={<HeroesDetail />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  )
}

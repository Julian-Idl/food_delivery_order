import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import FilterPage from '../pages/FilterPage'
import OrderDetailPage from '../pages/OrderDetailPage'
import OrdersPage from '../pages/OrdersPage'
import StatsPage from '../pages/StatsPage'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <h1>Food Delivery Orders</h1>
          <nav>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Orders
            </NavLink>
            <NavLink to="/filter" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Filter
            </NavLink>
            <NavLink to="/stats" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Stats
            </NavLink>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/orders" replace />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/filter" element={<FilterPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<Navigate to="/orders" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default AppRouter

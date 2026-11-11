
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'

function PlaceholderPage({ title }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800">
        {title}
      </h1>

      <p className="mt-2 text-slate-500">
        This module will be developed in the upcoming phases.
      </p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>

          <Route index element={<Dashboard />} />

          <Route
            path="medicines"
            element={<PlaceholderPage title="Medicine Management" />}
          />

          <Route
            path="stock"
            element={<PlaceholderPage title="Stock Management" />}
          />

          <Route
            path="expiry"
            element={<PlaceholderPage title="Expiry Management" />}
          />

          <Route
            path="low-stock"
            element={<PlaceholderPage title="Low Stock Alerts" />}
          />

          <Route
            path="transactions"
            element={<PlaceholderPage title="Stock Transactions" />}
          />

          <Route
            path="reports"
            element={<PlaceholderPage title="Inventory Reports" />}
          />

          <Route
            path="settings"
            element={<PlaceholderPage title="Settings" />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

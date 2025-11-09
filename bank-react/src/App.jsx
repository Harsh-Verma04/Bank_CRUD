import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CreateAccount from './pages/CreateAccount.jsx'
import AccountDetails from './pages/AccountDetails.jsx'
import BackgroundFX from './components/BackgroundFX.jsx'

function App() {
  return (
    <BrowserRouter>
      <BackgroundFX />
      <div className="min-h-screen flex bg-[--color-bg]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="p-4 md:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateAccount />} />
                <Route path="/accounts/:id" element={<AccountDetails />} />
                <Route path="*" element={<div className="text-center text-gray-400">Page not found</div>} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#0b1220', color: '#e5e7eb', border: '1px solid rgba(255,255,255,0.08)' }
      }} />
    </BrowserRouter>
  )
}

export default App

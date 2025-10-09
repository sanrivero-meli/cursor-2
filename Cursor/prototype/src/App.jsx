import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ChatScreen from './screens/ChatScreen'
import SimulatorScreen from './screens/SimulatorScreen'
import DashboardScreen from './screens/DashboardScreen'
import GoalsScreen from './screens/GoalsScreen'

function App() {
  const [user] = useState({
    name: 'María',
    avatar: 'M',
    score: 750,
    achievements: ['Primer objetivo', 'Ahorrador constante', 'Mes perfecto'],
    level: 5
  })

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<Navigate to="/chat" replace />} />
          <Route path="chat" element={<ChatScreen user={user} />} />
          <Route path="simulator" element={<SimulatorScreen user={user} />} />
          <Route path="dashboard" element={<DashboardScreen user={user} />} />
          <Route path="goals" element={<GoalsScreen user={user} />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App


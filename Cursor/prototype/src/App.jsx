import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ChatScreen from './screens/ChatScreen'
import SimulatorScreen from './screens/SimulatorScreen'
import DashboardScreen from './screens/DashboardScreen'
import GoalsScreen from './screens/GoalsScreen'
import OnboardingScreen from './screens/OnboardingScreen'

function App() {
  const [onboardingCompleted, setOnboardingCompleted] = useState(() => {
    // Check if onboarding was already completed (stored in localStorage)
    return localStorage.getItem('onboardingCompleted') === 'true'
  })
  
  const [user, setUser] = useState(() => {
    // Try to load user data from localStorage
    const savedUser = localStorage.getItem('userData')
    if (savedUser) {
      return JSON.parse(savedUser)
    }
    // Default user
    return {
      name: 'María',
      avatar: 'M',
      score: 750,
      achievements: ['Primer objetivo', 'Ahorrador constante', 'Mes perfecto'],
      level: 5
    }
  })

  const handleOnboardingComplete = (formData) => {
    // Update user with onboarding data
    const updatedUser = {
      ...user,
      name: formData.name,
      avatar: formData.name.charAt(0).toUpperCase(),
      email: formData.email,
      phone: formData.phone,
      monthlyIncome: parseFloat(formData.monthlyIncome),
      monthlyExpenses: parseFloat(formData.monthlyExpenses),
      savingsGoal: formData.savingsGoal,
      goalAmount: parseFloat(formData.goalAmount),
      goalTimeframe: parseInt(formData.goalTimeframe),
    }
    
    setUser(updatedUser)
    localStorage.setItem('userData', JSON.stringify(updatedUser))
    localStorage.setItem('onboardingCompleted', 'true')
    setOnboardingCompleted(true)
  }

  const handleResetOnboarding = () => {
    localStorage.removeItem('onboardingCompleted')
    localStorage.removeItem('userData')
    setOnboardingCompleted(false)
    window.location.href = '/onboarding'
  }

  return (
    <Router>
      <Routes>
        {/* Onboarding route - always accessible */}
        <Route 
          path="/onboarding" 
          element={<OnboardingScreen onComplete={handleOnboardingComplete} />} 
        />
        
        {/* Main app routes */}
        <Route path="/" element={<Layout user={user} onResetOnboarding={handleResetOnboarding} />}>
          <Route index element={<Navigate to={onboardingCompleted ? "/chat" : "/onboarding"} replace />} />
          <Route path="chat" element={<ChatScreen user={user} />} />
          <Route path="simulator" element={<SimulatorScreen user={user} />} />
          <Route path="dashboard" element={<DashboardScreen user={user} />} />
          <Route path="goals" element={<GoalsScreen user={user} />} />
        </Route>
        
        {/* Redirect to onboarding if not completed */}
        {!onboardingCompleted && (
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        )}
      </Routes>
    </Router>
  )
}

export default App


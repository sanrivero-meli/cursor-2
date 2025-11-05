import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { MessageCircle, Calculator, LayoutDashboard, Target, Sparkles, RotateCcw } from 'lucide-react'

const Layout = ({ user, onResetOnboarding }) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  const navItems = [
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/simulator', icon: Calculator, label: 'Simulador' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/goals', icon: Target, label: 'Objetivos' },
  ]

  return (
    <div className="min-h-screen bg-dark-950 text-white flex flex-col">
      {/* Header */}
      <header className="glass-effect border-b border-dark-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">LANA</h1>
                <p className="text-xs text-dark-400">Tu asistente financiero</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={onResetOnboarding}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container border border-surface-variant text-surface-300 hover:bg-surface-container-high hover:text-white transition-all text-sm"
                title="Resetear onboarding"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset Onboarding</span>
              </button>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-primary-400">Nivel {user.level}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center font-bold text-white">
                {user.avatar}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="glass-effect border-t border-dark-800 sticky bottom-0 z-50">
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-dark-400 hover:text-white hover:bg-dark-800'
                  }`
                }
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Layout


import React, { useState } from 'react'
import { 
  Target, 
  Plus, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Check, 
  Edit2, 
  Trash2,
  Plane,
  Home,
  Car,
  GraduationCap,
  Heart,
  Gift
} from 'lucide-react'

const GoalsScreen = ({ user }) => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Vacaciones en Brasil',
      icon: Plane,
      targetAmount: 120000,
      currentAmount: 82500,
      deadline: '2025-12-15',
      color: 'blue',
      monthlyContribution: 15000
    },
    {
      id: 2,
      name: 'Fondo de emergencia',
      icon: Home,
      targetAmount: 200000,
      currentAmount: 145000,
      deadline: '2025-06-30',
      color: 'green',
      monthlyContribution: 20000
    },
    {
      id: 3,
      name: 'Nuevo auto',
      icon: Car,
      targetAmount: 500000,
      currentAmount: 125000,
      deadline: '2026-12-31',
      color: 'purple',
      monthlyContribution: 25000
    }
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    icon: 'Target'
  })

  const goalIcons = [
    { name: 'Plane', icon: Plane, label: 'Viajes' },
    { name: 'Home', icon: Home, label: 'Casa' },
    { name: 'Car', icon: Car, label: 'Auto' },
    { name: 'GraduationCap', icon: GraduationCap, label: 'Educación' },
    { name: 'Heart', icon: Heart, label: 'Salud' },
    { name: 'Gift', icon: Gift, label: 'Regalo' },
  ]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value)
  }

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100).toFixed(1)
  }

  const calculateDaysLeft = (deadline) => {
    const today = new Date()
    const end = new Date(deadline)
    const diffTime = end - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/30', text: 'text-blue-400', progress: 'bg-blue-500' },
      green: { bg: 'from-green-500/20 to-green-600/20', border: 'border-green-500/30', text: 'text-green-400', progress: 'bg-green-500' },
      purple: { bg: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-500/30', text: 'text-purple-400', progress: 'bg-purple-500' },
      primary: { bg: 'from-primary-500/20 to-primary-600/20', border: 'border-primary-500/30', text: 'text-primary-400', progress: 'bg-primary-500' },
    }
    return colors[color] || colors.primary
  }

  const totalSaved = goals.reduce((acc, goal) => acc + goal.currentAmount, 0)
  const totalTarget = goals.reduce((acc, goal) => acc + goal.targetAmount, 0)
  const totalProgress = ((totalSaved / totalTarget) * 100).toFixed(1)

  return (
    <div className="min-h-full bg-dark-950 px-4 py-6 pb-20">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Mis Objetivos</h1>
          <p className="text-dark-400">Crea y gestiona tus metas financieras</p>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-dark-400 mb-1">Total ahorrado</p>
              <p className="text-3xl font-bold gradient-text">{formatCurrency(totalSaved)}</p>
            </div>
            <div>
              <p className="text-sm text-dark-400 mb-1">Meta total</p>
              <p className="text-2xl font-bold">{formatCurrency(totalTarget)}</p>
            </div>
            <div>
              <p className="text-sm text-dark-400 mb-1">Progreso general</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-dark-800 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all"
                    style={{ width: `${totalProgress}%` }}
                  ></div>
                </div>
                <span className="text-xl font-bold text-primary-400">{totalProgress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount)
            const daysLeft = calculateDaysLeft(goal.deadline)
            const colors = getColorClasses(goal.color)
            const Icon = goal.icon

            return (
              <div
                key={goal.id}
                className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl p-6 hover:scale-[1.02] transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-dark-900/50 flex items-center justify-center ${colors.text}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{goal.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-dark-400 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{daysLeft} días restantes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-dark-800 rounded-lg transition-all">
                      <Edit2 className="w-4 h-4 text-dark-400" />
                    </button>
                    <button className="p-2 hover:bg-dark-800 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4 text-dark-400" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-dark-400">Progreso</span>
                    <span className="text-sm font-bold">{progress}%</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-3 mb-2">
                    <div
                      className={`${colors.progress} h-3 rounded-full transition-all`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold">{formatCurrency(goal.currentAmount)}</span>
                    <span className="text-dark-400">{formatCurrency(goal.targetAmount)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                  <div>
                    <p className="text-xs text-dark-400 mb-1">Aporte mensual</p>
                    <p className="text-lg font-bold text-primary-400">{formatCurrency(goal.monthlyContribution)}</p>
                  </div>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Aportar
                  </button>
                </div>

                {progress >= 100 && (
                  <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                    <Check className="w-4 h-4" />
                    <span className="font-medium">¡Objetivo completado!</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Create Goal Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full glass-effect border border-dashed border-dark-600 hover:border-primary-500 rounded-xl p-8 transition-all group"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
              <Plus className="w-8 h-8 text-primary-400" />
            </div>
            <div>
              <p className="font-bold text-lg mb-1">Crear nuevo objetivo</p>
              <p className="text-sm text-dark-400">Define una nueva meta financiera</p>
            </div>
          </div>
        </button>

        {/* Tips Card */}
        <div className="mt-6 bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary-400 mt-0.5" />
            <div>
              <p className="font-medium text-sm mb-1">💡 Consejo personalizado</p>
              <p className="text-sm text-dark-300">
                Con tu score de {user.score}, puedes solicitar un crédito con tasa preferente del 15% 
                para alcanzar tus objetivos más rápido.
              </p>
            </div>
          </div>
        </div>

        {/* Create Goal Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Crear Objetivo</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre del objetivo</label>
                  <input
                    type="text"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    placeholder="Ej: Vacaciones, Auto nuevo..."
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 outline-none focus:border-primary-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Monto objetivo</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                    <input
                      type="number"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                      placeholder="0"
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Fecha límite</label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 outline-none focus:border-primary-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ícono</label>
                  <div className="grid grid-cols-3 gap-2">
                    {goalIcons.map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.name}
                          onClick={() => setNewGoal({ ...newGoal, icon: item.name })}
                          className={`p-4 rounded-lg transition-all ${
                            newGoal.icon === item.name
                              ? 'bg-primary-500/20 border-2 border-primary-500'
                              : 'bg-dark-800 border-2 border-dark-700 hover:border-dark-600'
                          }`}
                        >
                          <Icon className="w-6 h-6 mx-auto mb-1" />
                          <p className="text-xs">{item.label}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 glass-effect border border-dark-700 hover:border-dark-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      // Aquí se agregaría la lógica para crear el objetivo
                      setShowCreateModal(false)
                    }}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    Crear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GoalsScreen


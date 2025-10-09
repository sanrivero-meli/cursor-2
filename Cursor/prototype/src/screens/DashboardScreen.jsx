import React, { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  PiggyBank, 
  Zap,
  Award,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
  Trophy
} from 'lucide-react'

const DashboardScreen = ({ user }) => {
  const [period, setPeriod] = useState('month')

  const stats = {
    balance: 45300,
    income: 85000,
    expenses: 39700,
    savings: 12500,
    credits: 1,
    creditUsed: 15000,
    creditLimit: 50000
  }

  const recentTransactions = [
    { id: 1, type: 'income', desc: 'Salario', amount: 85000, date: '01 Oct', category: 'work' },
    { id: 2, type: 'expense', desc: 'Supermercado', amount: -8500, date: '30 Sep', category: 'food' },
    { id: 3, type: 'expense', desc: 'Alquiler', amount: -25000, date: '28 Sep', category: 'home' },
    { id: 4, type: 'income', desc: 'Freelance', amount: 12000, date: '25 Sep', category: 'work' },
    { id: 5, type: 'expense', desc: 'Luz y gas', amount: -3200, date: '22 Sep', category: 'bills' },
  ]

  const insights = [
    {
      type: 'success',
      icon: CheckCircle,
      title: 'Buen progreso',
      message: 'Gastas 15% menos que el mes pasado',
      color: 'green'
    },
    {
      type: 'warning',
      icon: AlertCircle,
      title: 'Atención',
      message: 'Tienes una cuota de crédito el 15 de octubre',
      color: 'yellow'
    },
    {
      type: 'info',
      icon: Target,
      title: 'Objetivo cercano',
      message: 'Te faltan $2,500 para tu objetivo "Vacaciones"',
      color: 'blue'
    }
  ]

  const achievements = [
    { icon: Trophy, label: 'Mes perfecto', unlocked: true },
    { icon: Target, label: 'Primera meta', unlocked: true },
    { icon: PiggyBank, label: 'Ahorrador', unlocked: true },
    { icon: Zap, label: 'Racha 7 días', unlocked: false },
  ]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(Math.abs(value))
  }

  const savingsRate = ((stats.balance / stats.income) * 100).toFixed(1)
  const creditUtilization = ((stats.creditUsed / stats.creditLimit) * 100).toFixed(0)

  return (
    <div className="min-h-full bg-dark-950 px-4 py-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Dashboard Financiero</h1>
          <p className="text-dark-400">Tu situación financiera en tiempo real</p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-6">
          {['week', 'month', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === p
                  ? 'bg-primary-600 text-white'
                  : 'glass-effect border border-dark-700 text-dark-400 hover:text-white'
              }`}
            >
              {p === 'week' ? 'Semana' : p === 'month' ? 'Mes' : 'Año'}
            </button>
          ))}
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="glass-effect border border-dark-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-dark-400">Balance</span>
              <DollarSign className="w-5 h-5 text-primary-400" />
            </div>
            <p className="text-2xl font-bold mb-1">{formatCurrency(stats.balance)}</p>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>+12.5% vs mes anterior</span>
            </div>
          </div>

          <div className="glass-effect border border-dark-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-dark-400">Ingresos</span>
              <ArrowUpRight className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-400 mb-1">{formatCurrency(stats.income)}</p>
            <p className="text-xs text-dark-500">Este mes</p>
          </div>

          <div className="glass-effect border border-dark-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-dark-400">Gastos</span>
              <ArrowDownRight className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-red-400 mb-1">{formatCurrency(stats.expenses)}</p>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <TrendingDown className="w-3 h-3" />
              <span>-15% vs mes anterior</span>
            </div>
          </div>

          <div className="glass-effect border border-dark-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-dark-400">Ahorros</span>
              <PiggyBank className="w-5 h-5 text-primary-400" />
            </div>
            <p className="text-2xl font-bold mb-1">{formatCurrency(stats.savings)}</p>
            <p className="text-xs text-primary-400">{savingsRate}% de ingresos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Credit Usage */}
          <div className="lg:col-span-1 glass-effect border border-dark-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary-400" />
              <h3 className="font-bold">Uso de Crédito</h3>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-dark-400">Utilizado</span>
                <span className="text-sm font-bold">{creditUtilization}%</span>
              </div>
              <div className="w-full bg-dark-800 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    creditUtilization < 30
                      ? 'bg-green-500'
                      : creditUtilization < 70
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${creditUtilization}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-dark-400">Usado</span>
                <span className="font-medium">{formatCurrency(stats.creditUsed)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-400">Límite</span>
                <span className="font-medium">{formatCurrency(stats.creditLimit)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-400">Disponible</span>
                <span className="font-medium text-primary-400">{formatCurrency(stats.creditLimit - stats.creditUsed)}</span>
              </div>
            </div>

            <button className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-medium transition-all">
              Solicitar más crédito
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-2 glass-effect border border-dark-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Transacciones Recientes</h3>
              <button className="text-sm text-primary-400 hover:text-primary-300">Ver todas</button>
            </div>

            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg hover:bg-dark-800 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {tx.type === 'income' ? (
                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{tx.desc}</p>
                      <p className="text-xs text-dark-500">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {insights.map((insight, idx) => {
            const Icon = insight.icon
            const colors = {
              green: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400', icon: 'text-green-400' },
              yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: 'text-yellow-400' },
              blue: { bg: 'bg-primary-500/20', border: 'border-primary-500/30', text: 'text-primary-400', icon: 'text-primary-400' }
            }
            const color = colors[insight.color]

            return (
              <div key={idx} className={`${color.bg} border ${color.border} rounded-xl p-4`}>
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 ${color.icon} mt-0.5`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                    <p className="text-xs text-dark-300">{insight.message}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Achievements */}
        <div className="glass-effect border border-dark-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-primary-400" />
            <h3 className="font-bold">Logros y Gamificación</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, idx) => {
              const Icon = achievement.icon
              return (
                <div
                  key={idx}
                  className={`text-center p-4 rounded-xl transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30'
                      : 'glass-effect border border-dark-700 opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? 'bg-primary-500' : 'bg-dark-700'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-medium">{achievement.label}</p>
                  {achievement.unlocked && (
                    <CheckCircle className="w-4 h-4 text-green-400 mx-auto mt-1" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Nivel {user.level}</p>
                <p className="text-xs text-dark-400">350 XP para siguiente nivel</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold gradient-text">{user.achievements.length}/10</p>
                <p className="text-xs text-dark-400">Logros</p>
              </div>
            </div>
            <div className="mt-2 w-full bg-dark-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardScreen


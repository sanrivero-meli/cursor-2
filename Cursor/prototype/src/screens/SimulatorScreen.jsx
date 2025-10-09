import React, { useState, useEffect } from 'react'
import { TrendingUp, Clock, DollarSign, Percent, Calendar, Check } from 'lucide-react'

const SimulatorScreen = ({ user }) => {
  const [amount, setAmount] = useState(10000)
  const [term, setTerm] = useState(12)
  const [calculation, setCalculation] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0,
    interestRate: 0
  })

  useEffect(() => {
    calculateLoan()
  }, [amount, term])

  const calculateLoan = () => {
    // Calcular tasa de interés basada en el score del usuario
    let baseRate = 0.25 // 25% anual base
    
    if (user.score >= 750) {
      baseRate = 0.15 // 15% para score excelente
    } else if (user.score >= 650) {
      baseRate = 0.20 // 20% para score bueno
    }

    const monthlyRate = baseRate / 12
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                          (Math.pow(1 + monthlyRate, term) - 1)
    
    const totalAmount = monthlyPayment * term
    const totalInterest = totalAmount - amount

    setCalculation({
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      interestRate: (baseRate * 100).toFixed(1)
    })
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value)
  }

  const maxAmount = user.score >= 750 ? 100000 : user.score >= 650 ? 50000 : 20000

  return (
    <div className="min-h-full bg-dark-950 px-4 py-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Simulador de Crédito</h1>
          <p className="text-dark-400">
            Calcula tu cuota mensual y descubre las mejores opciones para ti
          </p>
        </div>

        {/* Score Badge */}
        <div className="glass-effect border border-dark-700 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-400 mb-1">Tu Score Crediticio</p>
              <p className="text-3xl font-bold gradient-text">{user.score}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-dark-400 mb-1">Monto máximo</p>
              <p className="text-xl font-bold text-primary-400">{formatCurrency(maxAmount)}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-green-400">
            <Check className="w-4 h-4" />
            <span>¡Tienes acceso a tasas preferenciales!</span>
          </div>
        </div>

        {/* Simulator Card */}
        <div className="glass-effect border border-dark-700 rounded-2xl p-6 mb-6">
          {/* Amount Slider */}
          <div className="mb-8">
            <label className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-dark-300">Monto del crédito</span>
              <span className="text-xl font-bold text-primary-400">{formatCurrency(amount)}</span>
            </label>
            <input
              type="range"
              min="1000"
              max={maxAmount}
              step="1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-dark-500 mt-2">
              <span>$1,000</span>
              <span>{formatCurrency(maxAmount)}</span>
            </div>
          </div>

          {/* Term Slider */}
          <div className="mb-8">
            <label className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-dark-300">Plazo</span>
              <span className="text-xl font-bold text-primary-400">{term} meses</span>
            </label>
            <input
              type="range"
              min="3"
              max="36"
              step="3"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-dark-500 mt-2">
              <span>3 meses</span>
              <span>36 meses</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-dark-700">
            <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-primary-400" />
                <span className="text-sm text-dark-300">Cuota mensual</span>
              </div>
              <p className="text-3xl font-bold text-white">{formatCurrency(calculation.monthlyPayment)}</p>
            </div>

            <div className="glass-effect border border-dark-600 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-5 h-5 text-primary-400" />
                <span className="text-sm text-dark-300">Tasa de interés</span>
              </div>
              <p className="text-3xl font-bold text-white">{calculation.interestRate}%</p>
              <p className="text-xs text-green-400 mt-1">Tasa preferente por tu score</p>
            </div>

            <div className="glass-effect border border-dark-600 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-400" />
                <span className="text-sm text-dark-300">Total a pagar</span>
              </div>
              <p className="text-2xl font-bold text-white">{formatCurrency(calculation.totalAmount)}</p>
            </div>

            <div className="glass-effect border border-dark-600 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-primary-400" />
                <span className="text-sm text-dark-300">Intereses</span>
              </div>
              <p className="text-2xl font-bold text-white">{formatCurrency(calculation.totalInterest)}</p>
            </div>
          </div>
        </div>

        {/* Payment Schedule Preview */}
        <div className="glass-effect border border-dark-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-400" />
            Plan de Pagos
          </h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {Array.from({ length: Math.min(term, 6) }, (_, i) => {
              const month = i + 1
              const date = new Date()
              date.setMonth(date.getMonth() + month)
              
              return (
                <div key={i} className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-400 text-sm font-bold">
                      {month}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Cuota {month}</p>
                      <p className="text-xs text-dark-400">
                        {date.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-primary-400">{formatCurrency(calculation.monthlyPayment)}</p>
                </div>
              )
            })}
            {term > 6 && (
              <div className="text-center text-sm text-dark-500 py-2">
                ... y {term - 6} cuotas más
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            Solicitar este crédito
          </button>
          <button className="glass-effect border border-dark-700 hover:border-primary-500 text-white px-6 py-4 rounded-xl font-medium transition-all">
            Guardar simulación
          </button>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-primary-500/10 border border-primary-500/30 rounded-xl p-4">
          <p className="text-sm text-primary-300">
            💡 <span className="font-medium">Tip:</span> Tu score de {user.score} te permite acceder a las mejores tasas. 
            Mantén buenos hábitos financieros para seguir disfrutando de estos beneficios.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SimulatorScreen


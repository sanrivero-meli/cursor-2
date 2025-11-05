import React, { useState, useEffect } from 'react'
import { 
  DollarSign, 
  Percent, 
  Calendar,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Info
} from 'lucide-react'

/**
 * Prototipo Material 3: Variante Simple (Centrado en Resultados)
 * 
 * Concepto: Resultados prominentes con controles mínimos pero accesibles
 * - Minimalista extremo
 * - Enfoque en lo más importante (cuota mensual)
 * - Controles expandibles bajo demanda
 * - Microinteracciones sutiles
 */

const SimulatorScreenM3Simple = ({ user }) => {
  const [amount, setAmount] = useState(10000)
  const [term, setTerm] = useState(12)
  const [showControls, setShowControls] = useState(false)
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
    let baseRate = 0.25
    
    if (user.score >= 750) {
      baseRate = 0.15
    } else if (user.score >= 650) {
      baseRate = 0.20
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

  // Animated counter con spring effect
  const AnimatedCounter = ({ value, className = '' }) => {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
      const duration = 600
      const steps = 20
      const increment = value / steps
      let step = 0

      const timer = setInterval(() => {
        step++
        const current = Math.min(value, increment * step)
        setDisplayValue(Math.round(current))
        
        if (step >= steps) {
          clearInterval(timer)
          setDisplayValue(value)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }, [value])

    return <span className={className}>{formatCurrency(displayValue)}</span>
  }

  return (
    <div className="min-h-full bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        
        {/* Resultado Principal - Grande y Visible */}
        <div className="text-center mb-8">
          <p className="text-body-large text-on-surface-variant mb-4">
            Tu cuota mensual será
          </p>
          <h1 className="text-display-large font-normal text-on-surface mb-2">
            <AnimatedCounter value={calculation.monthlyPayment} />
          </h1>
          <div className="inline-flex items-center gap-2 bg-primary-container/30 px-4 py-2 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-label-small text-primary">
              Tasa preferencial {calculation.interestRate}% anual
            </span>
          </div>
        </div>

        {/* Card Principal Minimalista */}
        <div className="bg-surface-container rounded-3xl p-6 md:p-8 shadow-elevation-2 mb-6">
          
          {/* Resumen Compacto */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-label-small text-on-surface-variant mb-1">Monto</p>
              <p className="text-title-medium text-on-surface">{formatCurrency(amount)}</p>
            </div>
            <div className="text-center">
              <p className="text-label-small text-on-surface-variant mb-1">Plazo</p>
              <p className="text-title-medium text-on-surface">{term} meses</p>
            </div>
            <div className="text-center">
              <p className="text-label-small text-on-surface-variant mb-1">Total</p>
              <p className="text-title-medium text-on-surface">{formatCurrency(calculation.totalAmount)}</p>
            </div>
          </div>

          {/* Botón para Expandir Controles */}
          <button
            onClick={() => setShowControls(!showControls)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-label-large text-on-surface"
          >
            {showControls ? (
              <>
                <span>Ocultar controles</span>
                <ChevronUp className="w-5 h-5" />
              </>
            ) : (
              <>
                <span>Ajustar crédito</span>
                <ChevronDown className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Controles Expandibles */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showControls ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-6 pt-4 border-t border-outline-variant">
              
              {/* Monto */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-title-small text-on-surface">
                    Monto del crédito
                  </label>
                  <span className="text-title-medium text-primary">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max={maxAmount}
                  step="1000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary"
                  style={{
                    background: `linear-gradient(to right, rgb(76, 175, 80) 0%, rgb(76, 175, 80) ${(amount / maxAmount) * 100}%, rgb(121, 116, 126) ${(amount / maxAmount) * 100}%, rgb(121, 116, 126) 100%)`
                  }}
                />
                <div className="flex justify-between mt-2 text-label-small text-on-surface-variant">
                  <span>$1,000</span>
                  <span>{formatCurrency(maxAmount)}</span>
                </div>
              </div>

              {/* Plazo */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-title-small text-on-surface">
                    Plazo de pago
                  </label>
                  <span className="text-title-medium text-primary">
                    {term} meses
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="36"
                  step="3"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary"
                  style={{
                    background: `linear-gradient(to right, rgb(76, 175, 80) 0%, rgb(76, 175, 80) ${((term - 3) / (36 - 3)) * 100}%, rgb(121, 116, 126) ${((term - 3) / (36 - 3)) * 100}%, rgb(121, 116, 126) 100%)`
                  }}
                />
                <div className="flex justify-between mt-2 text-label-small text-on-surface-variant">
                  <span>3 meses</span>
                  <span>36 meses</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards de Información Secundaria */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-surface-container rounded-2xl p-4 shadow-elevation-1">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="w-4 h-4 text-primary" />
              <span className="text-label-medium text-on-surface-variant">Tasa</span>
            </div>
            <p className="text-headline-small text-on-surface">{calculation.interestRate}%</p>
          </div>
          
          <div className="bg-surface-container rounded-2xl p-4 shadow-elevation-1">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-label-medium text-on-surface-variant">Intereses</span>
            </div>
            <p className="text-headline-small text-on-surface">{formatCurrency(calculation.totalInterest)}</p>
          </div>
          
          <div className="bg-surface-container rounded-2xl p-4 shadow-elevation-1">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-label-medium text-on-surface-variant">Plazo</span>
            </div>
            <p className="text-headline-small text-on-surface">{term} meses</p>
          </div>
        </div>

        {/* Información de Seguridad */}
        <div className="bg-surface-container rounded-2xl p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-body-small text-on-surface-variant">
              Simulación estimada. Los términos finales pueden variar según tu perfil crediticio y documentación.
            </p>
          </div>
        </div>

        {/* Botón de Acción Principal */}
        <button className="w-full bg-primary text-on-primary px-6 py-4 rounded-full text-label-large font-medium shadow-elevation-2 hover:shadow-elevation-3 hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 ripple">
          <CheckCircle2 className="w-5 h-5" />
          Solicitar este crédito
        </button>
      </div>
    </div>
  )
}

export default SimulatorScreenM3Simple


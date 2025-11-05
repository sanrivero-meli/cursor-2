import React, { useState, useEffect, useRef } from 'react'
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Percent, 
  Info, 
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ArrowLeft
} from 'lucide-react'

/**
 * Prototipo Material 3: Flujo de Simulación de Crédito
 * Variante Híbrida: Vista Unificada + Centrado en Resultados
 * 
 * Características:
 * - Diseño minimalista con Material 3
 * - Microinteracciones elegantes
 * - Enfoque en seguridad y confianza
 * - Resultados prominentes con controles accesibles
 */

const SimulatorScreenM3 = ({ user }) => {
  const [amount, setAmount] = useState(10000)
  const [term, setTerm] = useState(12)
  const [showDetails, setShowDetails] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [calculation, setCalculation] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0,
    interestRate: 0
  })
  
  const amountRef = useRef(null)
  const termRef = useRef(null)

  useEffect(() => {
    calculateLoan()
  }, [amount, term])

  const calculateLoan = () => {
    setIsCalculating(true)
    
    // Simular cálculo con delay para mostrar microinteracción
    setTimeout(() => {
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
      
      setIsCalculating(false)
    }, 300)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value)
  }

  const maxAmount = user.score >= 750 ? 100000 : user.score >= 650 ? 50000 : 20000

  // Animated counter component
  const AnimatedNumber = ({ value, prefix = '', suffix = '', className = '' }) => {
    const [displayValue, setDisplayValue] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
      setIsAnimating(true)
      const duration = 800
      const steps = 30
      const increment = value / steps
      let current = 0
      let step = 0

      const timer = setInterval(() => {
        step++
        current = Math.min(value, increment * step)
        setDisplayValue(Math.round(current))
        
        if (step >= steps) {
          clearInterval(timer)
          setDisplayValue(value)
          setTimeout(() => setIsAnimating(false), 100)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }, [value])

    return (
      <span className={`${className} ${isAnimating ? 'animate-pulse-slow' : ''}`}>
        {prefix}{formatCurrency(displayValue)}{suffix}
      </span>
    )
  }

  return (
    <div className="min-h-full bg-surface p-4 md:p-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header Minimalista */}
        <div className="mb-6">
          <button 
            className="mb-4 flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver</span>
          </button>
          <h1 className="text-display-small md:text-display-medium font-normal text-on-surface mb-2">
            Simulador de Crédito
          </h1>
          <p className="text-body-large text-on-surface-variant">
            Configura tu crédito y descubre tu cuota mensual
          </p>
        </div>

        {/* Score Badge - Material 3 Chip Elevado */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-3 bg-surface-container-high px-4 py-3 rounded-full shadow-elevation-1">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-label-small text-on-surface-variant">Tu Score</p>
              <p className="text-title-medium font-medium text-on-surface">{user.score}</p>
            </div>
            <div className="h-8 w-px bg-outline-variant mx-2" />
            <div>
              <p className="text-label-small text-on-surface-variant">Monto máximo</p>
              <p className="text-title-medium font-medium text-primary">{formatCurrency(maxAmount)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Panel Principal - Resultado Destacado + Controles */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Card Principal: Resultado Prominente */}
            <div className="bg-surface-container rounded-3xl p-6 md:p-8 shadow-elevation-2 transition-shadow hover:shadow-elevation-3">
              <div className="mb-6">
                <p className="text-label-medium text-on-surface-variant mb-2">Cuota mensual estimada</p>
                {isCalculating ? (
                  <div className="h-16 bg-surface-container-high rounded-2xl animate-pulse" />
                ) : (
                  <h2 className="text-display-small md:text-display-medium font-normal text-on-surface">
                    <AnimatedNumber value={calculation.monthlyPayment} />
                  </h2>
                )}
                <p className="text-body-small text-on-surface-variant mt-2">
                  Para un crédito de {formatCurrency(amount)} a {term} meses
                </p>
              </div>

              {/* Indicador de Confianza */}
              <div className="flex items-center gap-2 bg-primary-container/30 rounded-full px-4 py-2 w-fit">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-label-small text-primary">Tasa preferencial activa</span>
              </div>
            </div>

            {/* Controles - Material 3 Sliders */}
            <div className="bg-surface-container rounded-3xl p-6 shadow-elevation-1">
              
              {/* Monto Slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-title-medium font-medium text-on-surface">
                    Monto del crédito
                  </label>
                  <div className="bg-surface-container-high px-4 py-2 rounded-full">
                    <span className="text-title-large font-medium text-primary">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                </div>
                
                {/* Material 3 Slider */}
                <div className="relative">
                  <input
                    ref={amountRef}
                    type="range"
                    min="1000"
                    max={maxAmount}
                    step="1000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="material-slider w-full h-2 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary outline-none transition-all"
                    style={{
                      background: `linear-gradient(to right, rgb(76, 175, 80) 0%, rgb(76, 175, 80) ${(amount / maxAmount) * 100}%, rgb(121, 116, 126) ${(amount / maxAmount) * 100}%, rgb(121, 116, 126) 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-2 text-label-small text-on-surface-variant">
                    <span>$1,000</span>
                    <span>{formatCurrency(maxAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Plazo Slider */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-title-medium font-medium text-on-surface">
                    Plazo de pago
                  </label>
                  <div className="bg-surface-container-high px-4 py-2 rounded-full">
                    <span className="text-title-large font-medium text-primary">
                      {term} meses
                    </span>
                  </div>
                </div>
                
                {/* Material 3 Slider */}
                <div className="relative">
                  <input
                    ref={termRef}
                    type="range"
                    min="3"
                    max="36"
                    step="3"
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className="material-slider w-full h-2 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary outline-none transition-all"
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

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-high rounded-2xl p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-5 h-5 text-primary" />
                  <span className="text-label-medium text-on-surface-variant">Tasa anual</span>
                </div>
                <p className="text-headline-small font-normal text-on-surface">
                  {calculation.interestRate}%
                </p>
              </div>
              
              <div className="bg-surface-container-high rounded-2xl p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-label-medium text-on-surface-variant">Total a pagar</span>
                </div>
                <p className="text-headline-small font-normal text-on-surface">
                  {formatCurrency(calculation.totalAmount)}
                </p>
              </div>
            </div>
          </div>

          {/* Panel Lateral - Detalles Expandibles */}
          <div className="lg:col-span-1">
            <div className={`bg-surface-container rounded-3xl shadow-elevation-2 transition-all duration-300 ${
              showDetails ? 'p-6' : 'p-4'
            }`}>
              
              {/* Header del Panel */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between mb-4 hover:bg-surface-container-high rounded-xl p-2 -m-2 transition-colors"
              >
                <h3 className="text-title-large font-medium text-on-surface">
                  Detalles del crédito
                </h3>
                <ChevronRight 
                  className={`w-5 h-5 text-on-surface-variant transition-transform ${
                    showDetails ? 'rotate-90' : ''
                  }`} 
                />
              </button>

              {/* Contenido Expandible */}
              <div className={`overflow-hidden transition-all duration-300 ${
                showDetails ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-4">
                  
                  {/* Resumen de Términos */}
                  <div className="bg-surface-container-high rounded-2xl p-4">
                    <h4 className="text-title-small font-medium text-on-surface mb-3">
                      Resumen de términos
                    </h4>
                    <div className="space-y-2 text-body-medium text-on-surface-variant">
                      <div className="flex justify-between">
                        <span>Monto solicitado</span>
                        <span className="text-on-surface font-medium">{formatCurrency(amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Plazo</span>
                        <span className="text-on-surface font-medium">{term} meses</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tasa de interés</span>
                        <span className="text-on-surface font-medium">{calculation.interestRate}% anual</span>
                      </div>
                      <div className="h-px bg-outline-variant my-2" />
                      <div className="flex justify-between">
                        <span className="text-on-surface font-medium">Total a pagar</span>
                        <span className="text-on-surface font-bold text-lg">{formatCurrency(calculation.totalAmount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Desglose de Intereses */}
                  <div className="bg-surface-container-high rounded-2xl p-4">
                    <h4 className="text-title-small font-medium text-on-surface mb-3">
                      Desglose de intereses
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-body-medium">
                        <span className="text-on-surface-variant">Capital</span>
                        <span className="text-on-surface">{formatCurrency(amount)}</span>
                      </div>
                      <div className="flex justify-between text-body-medium">
                        <span className="text-on-surface-variant">Intereses totales</span>
                        <span className="text-on-surface">{formatCurrency(calculation.totalInterest)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Próximas Cuotas Preview */}
                  <div className="bg-surface-container-high rounded-2xl p-4">
                    <h4 className="text-title-small font-medium text-on-surface mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Próximas cuotas
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {Array.from({ length: Math.min(term, 6) }, (_, i) => {
                        const month = i + 1
                        const date = new Date()
                        date.setMonth(date.getMonth() + month)
                        
                        return (
                          <div 
                            key={i} 
                            className="flex items-center justify-between p-2 bg-surface rounded-xl hover:bg-surface-container transition-colors"
                          >
                            <div>
                              <p className="text-body-small font-medium text-on-surface">Cuota {month}</p>
                              <p className="text-label-small text-on-surface-variant">
                                {date.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                            <p className="text-body-medium font-medium text-primary">
                              {formatCurrency(calculation.monthlyPayment)}
                            </p>
                          </div>
                        )
                      })}
                      {term > 6 && (
                        <p className="text-label-small text-on-surface-variant text-center py-2">
                          ... y {term - 6} cuotas más
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Información de Seguridad */}
                  <div className="bg-primary-container/20 rounded-2xl p-4 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-body-small font-medium text-on-surface mb-1">
                          Información importante
                        </p>
                        <p className="text-body-small text-on-surface-variant">
                          Esta es una simulación estimada. Los términos finales pueden variar según tu perfil crediticio y documentación presentada.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Material 3 */}
            <div className="mt-6 space-y-3">
              <button className="w-full bg-primary text-on-primary px-6 py-4 rounded-full text-label-large font-medium shadow-elevation-1 hover:shadow-elevation-2 hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Solicitar este crédito
              </button>
              
              <button className="w-full bg-surface-container-high text-on-surface px-6 py-4 rounded-full text-label-large font-medium border border-outline-variant hover:bg-surface-container transition-all duration-200">
                Guardar simulación
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimulatorScreenM3


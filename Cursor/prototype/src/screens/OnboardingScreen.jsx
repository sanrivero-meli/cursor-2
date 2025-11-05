import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  User, 
  DollarSign, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  AlertCircle,
  Sparkles,
  TrendingUp,
  Shield
} from 'lucide-react'

const OnboardingScreen = ({ onComplete }) => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    savingsGoal: '',
    goalAmount: '',
    goalTimeframe: '6',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const steps = [
    {
      id: 'welcome',
      title: '¡Bienvenido a LANA!',
      subtitle: 'Tu asistente financiero inteligente',
      icon: Sparkles,
    },
    {
      id: 'personal',
      title: 'Información Personal',
      subtitle: 'Cuéntanos sobre ti',
      icon: User,
    },
    {
      id: 'financial',
      title: 'Situación Financiera',
      subtitle: 'Ayúdanos a entender tus finanzas',
      icon: DollarSign,
    },
    {
      id: 'goals',
      title: 'Tus Objetivos',
      subtitle: '¿Qué quieres lograr?',
      icon: Target,
    },
    {
      id: 'complete',
      title: '¡Todo listo!',
      subtitle: 'Comencemos tu viaje financiero',
      icon: CheckCircle,
    },
  ]

  const validateField = (name, value) => {
    let error = ''

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'El nombre es requerido'
        } else if (value.trim().length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres'
        }
        break
      case 'email':
        if (!value.trim()) {
          error = 'El email es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Ingresa un email válido'
        }
        break
      case 'phone':
        if (!value.trim()) {
          error = 'El teléfono es requerido'
        } else if (!/^[0-9+\-\s()]+$/.test(value)) {
          error = 'Ingresa un teléfono válido'
        } else if (value.replace(/\D/g, '').length < 8) {
          error = 'El teléfono debe tener al menos 8 dígitos'
        }
        break
      case 'monthlyIncome':
        if (!value.trim()) {
          error = 'El ingreso mensual es requerido'
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          error = 'Ingresa un monto válido'
        }
        break
      case 'monthlyExpenses':
        if (!value.trim()) {
          error = 'Los gastos mensuales son requeridos'
        } else if (isNaN(value) || parseFloat(value) < 0) {
          error = 'Ingresa un monto válido'
        } else if (parseFloat(value) > parseFloat(formData.monthlyIncome || 0)) {
          error = 'Los gastos no pueden ser mayores a tus ingresos'
        }
        break
      case 'savingsGoal':
        if (!value.trim()) {
          error = 'Selecciona un objetivo de ahorro'
        }
        break
      case 'goalAmount':
        if (!value.trim()) {
          error = 'El monto objetivo es requerido'
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          error = 'Ingresa un monto válido'
        }
        break
      default:
        break
    }

    return error
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const validateStep = (step) => {
    const newErrors = {}
    const newTouched = {}

    switch (step) {
      case 1: // Personal info
        ['name', 'email', 'phone'].forEach(field => {
          newTouched[field] = true
          const error = validateField(field, formData[field])
          if (error) newErrors[field] = error
        })
        break
      case 2: // Financial info
        ['monthlyIncome', 'monthlyExpenses'].forEach(field => {
          newTouched[field] = true
          const error = validateField(field, formData[field])
          if (error) newErrors[field] = error
        })
        break
      case 3: // Goals
        ['savingsGoal', 'goalAmount'].forEach(field => {
          newTouched[field] = true
          const error = validateField(field, formData[field])
          if (error) newErrors[field] = error
        })
        break
      default:
        break
    }

    setTouched(prev => ({ ...prev, ...newTouched }))
    setErrors(prev => ({ ...prev, ...newErrors }))
    
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 0 || currentStep === 4) {
      if (currentStep === 4) {
        onComplete(formData)
        // Redirect to chat after completing
        setTimeout(() => {
          navigate('/chat')
        }, 500)
      } else {
        setCurrentStep(prev => prev + 1)
      }
    } else {
      if (validateStep(currentStep)) {
        setCurrentStep(prev => prev + 1)
      }
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  const formatCurrency = (value) => {
    if (!value) return ''
    const num = parseFloat(value)
    if (isNaN(num)) return value
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target
    // Remove all non-digit characters
    const numericValue = value.replace(/[^\d]/g, '')
    setFormData(prev => ({ ...prev, [name]: numericValue }))
    
    if (touched[name]) {
      const error = validateField(name, numericValue)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleCurrencyBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const numericValue = value.replace(/[^\d]/g, '')
    const error = validateField(name, numericValue)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const savingsOptions = [
    { value: 'emergency', label: 'Fondo de emergencia', icon: Shield },
    { value: 'vacation', label: 'Vacaciones', icon: Sparkles },
    { value: 'house', label: 'Compra de casa', icon: Target },
    { value: 'education', label: 'Educación', icon: TrendingUp },
    { value: 'other', label: 'Otro', icon: DollarSign },
  ]

  const renderStepContent = () => {
    const step = steps[currentStep]

    switch (currentStep) {
      case 0: // Welcome
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-full p-6 shadow-elevation-3">
                <Sparkles className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">¡Bienvenido a LANA!</h2>
            <p className="text-surface-300 text-lg mb-8 max-w-md mx-auto">
              Tu asistente financiero inteligente que te ayudará a alcanzar tus objetivos financieros
            </p>
            <div className="space-y-4 max-w-md mx-auto">
              <div className="flex items-start gap-3 text-left">
                <div className="bg-primary-500/20 rounded-full p-2 mt-1">
                  <Target className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Establece objetivos</h3>
                  <p className="text-sm text-surface-400">Define metas claras y alcanzables</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left">
                <div className="bg-primary-500/20 rounded-full p-2 mt-1">
                  <TrendingUp className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Sigue tu progreso</h3>
                  <p className="text-sm text-surface-400">Visualiza tu crecimiento financiero</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left">
                <div className="bg-primary-500/20 rounded-full p-2 mt-1">
                  <Shield className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Toma decisiones inteligentes</h3>
                  <p className="text-sm text-surface-400">Recibe recomendaciones personalizadas</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 1: // Personal Info
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-surface-200">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-xl bg-surface-container border-2 transition-all ${
                    errors.name
                      ? 'border-error-500 focus:border-error-400'
                      : 'border-surface-variant focus:border-primary-500'
                  } text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                  placeholder="Ej: María González"
                />
                {errors.name && (
                  <div className="flex items-center gap-2 mt-2 text-error-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-surface-200">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-xl bg-surface-container border-2 transition-all ${
                    errors.email
                      ? 'border-error-500 focus:border-error-400'
                      : 'border-surface-variant focus:border-primary-500'
                  } text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                  placeholder="ejemplo@correo.com"
                />
                {errors.email && (
                  <div className="flex items-center gap-2 mt-2 text-error-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-surface-200">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-xl bg-surface-container border-2 transition-all ${
                    errors.phone
                      ? 'border-error-500 focus:border-error-400'
                      : 'border-surface-variant focus:border-primary-500'
                  } text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                  placeholder="+54 11 1234-5678"
                />
                {errors.phone && (
                  <div className="flex items-center gap-2 mt-2 text-error-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 2: // Financial Info
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="monthlyIncome" className="block text-sm font-medium mb-2 text-surface-200">
                  Ingresos mensuales *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400">$</span>
                  <input
                    type="text"
                    id="monthlyIncome"
                    name="monthlyIncome"
                    value={formData.monthlyIncome ? formatCurrency(formData.monthlyIncome) : ''}
                    onChange={handleCurrencyChange}
                    onBlur={handleCurrencyBlur}
                    className={`w-full pl-8 pr-4 py-3 rounded-xl bg-surface-container border-2 transition-all ${
                      errors.monthlyIncome
                        ? 'border-error-500 focus:border-error-400'
                        : 'border-surface-variant focus:border-primary-500'
                    } text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                    placeholder="0"
                  />
                </div>
                {errors.monthlyIncome && (
                  <div className="flex items-center gap-2 mt-2 text-error-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.monthlyIncome}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="monthlyExpenses" className="block text-sm font-medium mb-2 text-surface-200">
                  Gastos mensuales estimados *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400">$</span>
                  <input
                    type="text"
                    id="monthlyExpenses"
                    name="monthlyExpenses"
                    value={formData.monthlyExpenses ? formatCurrency(formData.monthlyExpenses) : ''}
                    onChange={handleCurrencyChange}
                    onBlur={handleCurrencyBlur}
                    className={`w-full pl-8 pr-4 py-3 rounded-xl bg-surface-container border-2 transition-all ${
                      errors.monthlyExpenses
                        ? 'border-error-500 focus:border-error-400'
                        : 'border-surface-variant focus:border-primary-500'
                    } text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                    placeholder="0"
                  />
                </div>
                {errors.monthlyExpenses && (
                  <div className="flex items-center gap-2 mt-2 text-error-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.monthlyExpenses}</span>
                  </div>
                )}
                {formData.monthlyIncome && formData.monthlyExpenses && (
                  <div className="mt-2 text-sm">
                    <span className="text-surface-400">Ahorro potencial mensual: </span>
                    <span className={`font-semibold ${
                      parseFloat(formData.monthlyIncome) - parseFloat(formData.monthlyExpenses) >= 0
                        ? 'text-primary-400'
                        : 'text-error-400'
                    }`}>
                      {formatCurrency(parseFloat(formData.monthlyIncome || 0) - parseFloat(formData.monthlyExpenses || 0))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 3: // Goals
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-4 text-surface-200">
                ¿Cuál es tu principal objetivo de ahorro? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savingsOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, savingsGoal: option.value }))
                        if (touched.savingsGoal) {
                          const error = validateField('savingsGoal', option.value)
                          setErrors(prev => ({ ...prev, savingsGoal: error }))
                        }
                      }}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.savingsGoal === option.value
                          ? 'border-primary-500 bg-primary-500/20 shadow-elevation-2'
                          : 'border-surface-variant bg-surface-container hover:border-primary-500/50 hover:bg-surface-container-high'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          formData.savingsGoal === option.value
                            ? 'bg-primary-500'
                            : 'bg-surface-variant'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            formData.savingsGoal === option.value
                              ? 'text-white'
                              : 'text-surface-400'
                          }`} />
                        </div>
                        <span className={`font-medium ${
                          formData.savingsGoal === option.value
                            ? 'text-white'
                            : 'text-surface-300'
                        }`}>
                          {option.label}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
              {errors.savingsGoal && (
                <div className="flex items-center gap-2 mt-2 text-error-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.savingsGoal}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="goalAmount" className="block text-sm font-medium mb-2 text-surface-200">
                Monto objetivo *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400">$</span>
                  <input
                    type="text"
                    id="goalAmount"
                    name="goalAmount"
                    value={formData.goalAmount ? formatCurrency(formData.goalAmount) : ''}
                    onChange={handleCurrencyChange}
                    onBlur={handleCurrencyBlur}
                    className={`w-full pl-8 pr-4 py-3 rounded-xl bg-surface-container border-2 transition-all ${
                      errors.goalAmount
                        ? 'border-error-500 focus:border-error-400'
                        : 'border-surface-variant focus:border-primary-500'
                    } text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                    placeholder="0"
                  />
              </div>
              {errors.goalAmount && (
                <div className="flex items-center gap-2 mt-2 text-error-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.goalAmount}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="goalTimeframe" className="block text-sm font-medium mb-2 text-surface-200">
                Plazo para alcanzarlo
              </label>
              <select
                id="goalTimeframe"
                name="goalTimeframe"
                value={formData.goalTimeframe}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-surface-container border-2 border-surface-variant text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="3">3 meses</option>
                <option value="6">6 meses</option>
                <option value="12">12 meses</option>
                <option value="24">24 meses</option>
                <option value="36">36 meses</option>
              </select>
            </div>
          </div>
        )

      case 4: // Complete
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-full p-6 shadow-elevation-3">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">¡Todo listo!</h2>
            <p className="text-surface-300 text-lg mb-8 max-w-md mx-auto">
              Hemos configurado tu perfil financiero. Estás listo para comenzar tu viaje hacia tus objetivos.
            </p>
            <div className="bg-surface-container rounded-xl p-6 max-w-md mx-auto text-left space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-surface-400">Nombre</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-surface-400">Email</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-surface-400">Ingresos mensuales</span>
                <span className="font-medium">{formatCurrency(formData.monthlyIncome)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-surface-400">Objetivo</span>
                <span className="font-medium">
                  {savingsOptions.find(o => o.value === formData.savingsGoal)?.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-surface-400">Monto objetivo</span>
                <span className="font-medium text-primary-400">{formatCurrency(formData.goalAmount)}</span>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const currentStepData = steps[currentStep]
  const StepIcon = currentStepData.icon

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.slice(0, -1).map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      index < currentStep
                        ? 'bg-primary-500 text-white shadow-elevation-2'
                        : index === currentStep
                        ? 'bg-primary-500 text-white shadow-elevation-3'
                        : 'bg-surface-container border-2 border-surface-variant text-surface-500'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{index + 1}</span>
                    )}
                  </div>
                </div>
                {index < steps.length - 2 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      index < currentStep ? 'bg-primary-500' : 'bg-surface-variant'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-surface-container rounded-3xl p-8 shadow-elevation-3 border border-surface-variant">
          {/* Step Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 mb-4">
              <StepIcon className="w-8 h-8 text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{currentStepData.title}</h1>
            <p className="text-surface-400">{currentStepData.subtitle}</p>
          </div>

          {/* Step Body */}
          <div className="mb-8 min-h-[300px]">
            {renderStepContent()}
          </div>

          {/* Step Actions */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 0
                  ? 'bg-surface-variant text-surface-500 cursor-not-allowed'
                  : 'bg-surface-container-high text-surface-200 hover:bg-surface-container-highest'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Atrás
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-all shadow-elevation-2 hover:shadow-elevation-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 4 ? 'Comenzar' : 'Siguiente'}
              {currentStep !== 4 && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-surface-500 text-sm mt-6">
          Paso {currentStep + 1} de {steps.length}
        </p>
      </div>
    </div>
  )
}

export default OnboardingScreen


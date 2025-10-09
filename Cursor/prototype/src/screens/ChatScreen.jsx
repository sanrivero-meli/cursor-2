import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff, DollarSign, TrendingUp, Target, CreditCard } from 'lucide-react'

const ChatScreen = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: `¡Hola ${user.name}! 👋 Soy LANA, tu asistente financiero inteligente. ¿En qué puedo ayudarte hoy?`,
      time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 2,
      type: 'suggestions',
      suggestions: [
        { icon: CreditCard, text: 'Solicitar crédito', action: 'credit' },
        { icon: TrendingUp, text: 'Ver mi situación financiera', action: 'dashboard' },
        { icon: Target, text: 'Crear un objetivo', action: 'goal' },
        { icon: DollarSign, text: 'Enviar dinero', action: 'send' }
      ]
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputText.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, newMessage])
    setInputText('')
    
    // Simular respuesta del asistente
    setIsTyping(true)
    setTimeout(() => {
      const responses = [
        '¡Claro! Te puedo ayudar con eso. Basándome en tu historial, tienes un score de 750 y puedes acceder a créditos de hasta $50,000 con tasas preferentes.',
        'Entiendo. Déjame mostrarte algunas opciones personalizadas para ti.',
        'Perfecto. He analizado tu situación y tengo algunas recomendaciones que pueden ayudarte.',
        'Excelente idea. Te voy a guiar paso a paso para que logres ese objetivo.'
      ]
      
      const assistantMessage = {
        id: messages.length + 2,
        type: 'assistant',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (action) => {
    const suggestionTexts = {
      credit: '¿Cómo puedo solicitar un crédito?',
      dashboard: 'Muéstrame mi situación financiera',
      goal: 'Quiero crear un nuevo objetivo de ahorro',
      send: '¿Cómo envío dinero a otra persona?'
    }

    const text = suggestionTexts[action]
    if (text) {
      setInputText(text)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    
    if (!isRecording) {
      // Simular grabación de voz
      setTimeout(() => {
        setIsRecording(false)
        setInputText('¿Cuánto dinero tengo disponible para gastar este mes?')
      }, 2000)
    }
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-dark-950">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => {
          if (message.type === 'suggestions') {
            return (
              <div key={message.id} className="flex justify-center">
                <div className="grid grid-cols-2 gap-2 max-w-md w-full">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion.action)}
                      className="glass-effect border border-dark-700 rounded-xl p-3 flex items-center gap-2 hover:bg-primary-500/10 hover:border-primary-500/50 transition-all group"
                    >
                      <suggestion.icon className="w-4 h-4 text-primary-400 group-hover:scale-110 transition-transform" />
                      <span className="text-xs text-left">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] sm:max-w-[60%] rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-primary-600 text-white rounded-br-sm'
                    : 'glass-effect border border-dark-700 rounded-bl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-primary-200' : 'text-dark-500'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          )
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="glass-effect border border-dark-700 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-effect border-t border-dark-800 px-4 py-4">
        <div className="container mx-auto max-w-4xl">
          {/* Voice Recording Indicator */}
          {isRecording && (
            <div className="mb-3 flex items-center justify-center gap-2 text-primary-400 animate-pulse">
              <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
              <span className="text-sm">Escuchando...</span>
            </div>
          )}

          <div className="flex items-end gap-2">
            {/* Voice Button */}
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-xl transition-all ${
                isRecording
                  ? 'bg-red-500 text-white'
                  : 'glass-effect border border-dark-700 text-primary-400 hover:bg-primary-500/10'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <div className="flex-1 glass-effect border border-dark-700 rounded-xl focus-within:border-primary-500 transition-all">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Escribe tu mensaje..."
                rows="1"
                className="w-full bg-transparent px-4 py-3 text-sm outline-none resize-none"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-dark-700 disabled:text-dark-500 text-white p-3 rounded-xl transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-dark-500 text-center mt-2">
            LANA puede cometer errores. Verifica información importante.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatScreen


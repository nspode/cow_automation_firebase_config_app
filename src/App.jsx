import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSSID } from './redux/actions/actions'
import './index.css'

function App() {
  const dispatch = useDispatch()
  const ssid = useSelector(state => state.volatileState?.ssid || '')
  
  const [showPassword, setShowPassword] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Funcionalidade será implementada posteriormente
  }

  const handleSSIDChange = (e) => {
    dispatch(setSSID(e.target.value))
  }

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header">
        <div className="logo-container">
          <img src="/logo.png" alt="CowMed Logo" className="logo" />
        </div>
        <p className="subtitle">Configure seu dispositivo</p>
      </header>

      {/* Form Container */}
      <div className="form-container">
        {/* Status Indicator */}
        <div className="status-indicator">
          <div className={`indicator-dot ${isConnected ? 'connected' : 'disconnected'}`}></div>
          <span className="status-text">
            {isConnected ? 'Dispositivo conectado' : 'Dispositivo desconectado'}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="form">
          {/* SSID Field */}
          <div className="form-field">
            <label htmlFor="ssid" className="field-label">
              Nome da Rede Wi-Fi (SSID)
            </label>
            <input
              type="text"
              id="ssid"
              placeholder="Digite o nome da rede"
              value={ssid}
              onChange={handleSSIDChange}
              required
              className="text-input"
            />
            <p className="help-text">Nome da rede Wi-Fi que o dispositivo irá conectar</p>
          </div>

          {/* Password Field */}
          <div className="form-field">
            <label htmlFor="password" className="field-label">
              Senha da Rede
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Digite a senha"
                required
                className="text-input password-input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <p className="help-text">Senha da rede Wi-Fi (deixe em branco se não houver)</p>
          </div>

          {/* Device Code Field */}
          <div className="form-field">
            <label htmlFor="deviceCode" className="field-label">
              Código do Dispositivo
            </label>
            <input
              type="text"
              id="deviceCode"
              placeholder="Ex: COW001234"
              required
              className="text-input"
            />
            <p className="help-text">Código único encontrado na etiqueta do dispositivo</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`primary-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Conectando...
              </>
            ) : (
              <>
                📶 Conectar e Configurar
              </>
            )}
          </button>
        </form>

        {/* Message Container */}
        {message && (
          <div className={`message-container ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  )
}

export default App

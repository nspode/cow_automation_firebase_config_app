import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  setSSID, 
  connectAndGetProtocolVersion, 
  scanWifiNetworks, 
  configureWifi, 
  disconnectProvisioning
} from './redux/actions/actions';
import './index.css'

function App() {
  const dispatch = useDispatch()
  const ssid = useSelector(state => state.volatileState?.ssid || '')
  const bluetoothConnection = useSelector(state => state.volatileState?.bluetoothConnection || false)
  const bluetoothDevice = useSelector(state => state.volatileState?.bluetoothDevice || null)
  const bluetoothStatus = useSelector(state => state.volatileState?.bluetoothStatus || 'Não conectado')
  
  const [showPassword, setShowPassword] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [isConnectingBluetooth, setIsConnectingBluetooth] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Funcionalidade será implementada posteriormente
  }

  const handleSSIDChange = (e) => {
    dispatch(setSSID(e.target.value))
  }

  // Função para conectar Bluetooth
  const handleBluetoothConnect = async () => {
    try {
      setIsLoading(true);
      setMessage('');
      setProvisioningError('');
      
      const provManager = await dispatch(connectAndGetProtocolVersion());
      
      if (provManager) {
        setMessage('Dispositivo conectado e versão do protocolo obtida!');
      }
    } catch (error) {
      console.error('Erro na conexão Bluetooth:', error);
      setMessage('Erro na conexão: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para desconectar Bluetooth
  const handleBluetoothDisconnect = () => {
    console.log('Dispositivo Bluetooth desconectado')
    dispatch(setBluetoothDevice(null))
    dispatch(setBluetoothConnection(false))
    dispatch(setBluetoothStatus('Desconectado'))
    
    setMessage({
      type: 'warning',
      text: 'Dispositivo Bluetooth foi desconectado'
    })
  }

  // Função para desconectar manualmente
  const handleBluetoothDisconnectManual = () => {
    if (bluetoothDevice && bluetoothDevice.gatt.connected) {
      bluetoothDevice.gatt.disconnect()
    }
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
        {/* Bluetooth Connection Section */}
        <div className="bluetooth-section">
          <h3 className="section-title">Conexão Bluetooth</h3>
          <div className="bluetooth-status">
            <div className={`indicator-dot ${bluetoothConnection ? 'connected' : 'disconnected'}`}></div>
            <span className="status-text">
              {bluetoothStatus}
            </span>
          </div>
          
          <div className="bluetooth-buttons">
            {!bluetoothConnection ? (
              <button
                type="button"
                className={`primary-button ${isConnectingBluetooth ? 'loading' : ''}`}
                onClick={handleBluetoothConnect}
                disabled={isConnectingBluetooth}
              >
                {isConnectingBluetooth ? (
                  <>
                    <div className="spinner"></div>
                    Conectando...
                  </>
                ) : (
                  <>
                    📱 Buscar PROV_82D988
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                className="secondary-button"
                onClick={handleBluetoothDisconnectManual}
              >
                🔌 Desconectar
              </button>
            )}
          </div>
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

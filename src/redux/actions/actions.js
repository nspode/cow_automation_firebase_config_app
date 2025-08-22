import ACTION_TYPES from "./actionTypes";

export const set_token = (value) => ({
  type: ACTION_TYPES.ACTION1,
  payload: value,
});

export const setSSID = (ssid) => ({
  type: ACTION_TYPES.SET_SSID,
  payload: ssid,
});

export const setBluetoothConnection = (isConnected) => ({
  type: ACTION_TYPES.SET_BLUETOOTH_CONNECTION,
  payload: isConnected,
});

export const setBluetoothDevice = (device) => ({
  type: ACTION_TYPES.SET_BLUETOOTH_DEVICE,
  payload: device,
});

export const setBluetoothStatus = (status) => ({
  type: ACTION_TYPES.SET_BLUETOOTH_STATUS,
  payload: status,
});

// Action básica para conectar e obter versão do protocolo
export const connectAndGetProtocolVersion = (deviceName = 'PROV_82D988') => {
  return async (dispatch) => {
    try {
      dispatch(setBluetoothStatus('Conectando...'));
      
      // Importar Provisioning Manager
      const Provisioning = (await import('../../services/Provisioning_Manager')).default;
      const provManager = new Provisioning();
      
      // Conectar ao dispositivo
      await provManager.connect(deviceName);
      
      // Verificar características encontradas
      const characteristics = Object.keys(provManager.lookup);
      console.log('Características encontradas:', characteristics);
      
      let statusMessage = `Conectado: ${provManager.device.name}`;
      if (characteristics.length > 0) {
        statusMessage += ` (${characteristics.length} características)`;
      } else {
        statusMessage += ' (sem características de provisionamento)';
      }
      
      dispatch(setBluetoothStatus(statusMessage));
      
      // Salvar no Redux
      dispatch(setProvisioningManager(provManager));
      dispatch(setBluetoothConnection(true));
      dispatch(setProvisioningStep('connected'));
      
      // Obter versão do protocolo
      if (characteristics.includes('proto-ver')) {
        dispatch(setBluetoothStatus('Obtendo versão do protocolo...'));
        const protocolVersion = await provManager.getProtocolVersion();
        console.log('Versão do protocolo:', protocolVersion);
        dispatch(setBluetoothStatus(`Conectado - Protocolo: ${protocolVersion}`));
      } else {
        console.warn('Característica proto-ver não encontrada');
        dispatch(setBluetoothStatus('Conectado - Protocolo não disponível'));
      }
      
      return provManager;
      
    } catch (error) {
      console.error('Erro ao conectar e obter versão:', error);
      
      let errorMessage = error.message;
      if (error.message.includes('No Services')) {
        errorMessage = 'Dispositivo não possui serviços Bluetooth. Verifique se está em modo de provisionamento (pairing mode).';
      } else if (error.message.includes('not found')) {
        errorMessage = 'Dispositivo não encontrado. Verifique se está ligado e visível.';
      }
      
      dispatch(setBluetoothStatus('Erro na conexão'));
      dispatch(setProvisioningError(errorMessage));
      throw new Error(errorMessage);
    }
  };
};



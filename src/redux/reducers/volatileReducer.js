import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  teams: [],
  password: '',
  ssid: 'teste',
  message: null,
  messageType: null,
  bluetoothConnection: false,
  bluetoothDevice: null,
  bluetoothStatus: 'Não conectado',
};

const volatileReducer = (state = initialState, action) => {
  switch (action.type) {
    // Set SSID
    case ACTION_TYPES.SET_SSID:
      return {
        ...state,
        ssid: action.payload
      };
    
    // Set Bluetooth Connection
    case ACTION_TYPES.SET_BLUETOOTH_CONNECTION:
      return {
        ...state,
        bluetoothConnection: action.payload
      };
    
    // Set Bluetooth Device
    case ACTION_TYPES.SET_BLUETOOTH_DEVICE:
      return {
        ...state,
        bluetoothDevice: action.payload
      };
    
    // Set Bluetooth Status
    case ACTION_TYPES.SET_BLUETOOTH_STATUS:
      return {
        ...state,
        bluetoothStatus: action.payload
      };
    
    default:
      return state;
  }
};

export default volatileReducer; 
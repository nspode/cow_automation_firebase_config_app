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



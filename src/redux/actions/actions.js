import ACTION_TYPES from "./actionTypes";

export const set_token = (value) => ({
  type: ACTION_TYPES.ACTION1,
  payload: value,
});

export const setSSID = (ssid) => ({
  type: ACTION_TYPES.SET_SSID,
  payload: ssid,
});



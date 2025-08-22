import ACTION_TYPES from "./actionTypes";

export const set_token = (value) => ({
  type: ACTION_TYPES.ACTION1,
  payload: value,
});

export const setSSID = (ssid) => ({
  type: ACTION_TYPES.SET_SSID,
  payload: ssid,
});

export const fetchSSIDsStart = () => ({
  type: ACTION_TYPES.FETCH_SSIDS_START,
});

export const fetchSSIDsSuccess = (ssids) => ({
  type: ACTION_TYPES.FETCH_SSIDS_SUCCESS,
  payload: ssids,
});

export const fetchSSIDsFailure = (error) => ({
  type: ACTION_TYPES.FETCH_SSIDS_FAILURE,
  payload: error,
});

// Thunk action para buscar SSIDs
export const fetchSSIDs = () => {
  return async (dispatch) => {
    dispatch(fetchSSIDsStart());
    
    try {
      // Simular busca de SSIDs (substitua pela API real)
      const mockSSIDs = [
        'WiFi_Casa',
        'WiFi_Empresa',
        'WiFi_Vizinho',
        'iPhone_Hotspot',
        'Android_Hotspot'
      ];
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(fetchSSIDsSuccess(mockSSIDs));
    } catch (error) {
      dispatch(fetchSSIDsFailure(error.message));
    }
  };
};



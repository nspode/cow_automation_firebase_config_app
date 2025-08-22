import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  teams: [],
  password: '',
  ssid: 'teste',
  message: null,
  messageType: null,
};

const volatileReducer = (state = initialState, action) => {
  switch (action.type) {
    // Set SSID
    case ACTION_TYPES.SET_SSID:
      return {
        ...state,
        ssid: action.payload
      };
    
    default:
      return state;
  }
};

export default volatileReducer; 
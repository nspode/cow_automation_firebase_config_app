import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  teams: [],
  password: '',
  ssid: 'teste',
  message: null,
  messageType: null,
  availableSSIDs: [],
  isFetchingSSIDs: false,
  ssidError: null
};

const volatileReducer = (state = initialState, action) => {
  switch (action.type) {
    // Set SSID
    case ACTION_TYPES.SET_SSID:
      return {
        ...state,
        ssid: action.payload
      };
    
    // Fetch SSIDs
    case ACTION_TYPES.FETCH_SSIDS_START:
      return {
        ...state,
        isFetchingSSIDs: true,
        ssidError: null
      };
    
    case ACTION_TYPES.FETCH_SSIDS_SUCCESS:
      return {
        ...state,
        isFetchingSSIDs: false,
        availableSSIDs: action.payload,
        ssidError: null
      };
    
    case ACTION_TYPES.FETCH_SSIDS_FAILURE:
      return {
        ...state,
        isFetchingSSIDs: false,
        ssidError: action.payload
      };
    
    // Fetch teams
    
    // Clear message
    // case ACTION_TYPES.CLEAR_TEAM_MESSAGE:
    //   return {
    //     ...state,
    //     message: null,
    //     messageType: null
    //   };

    default:
      return state;
  }
};

export default volatileReducer; 
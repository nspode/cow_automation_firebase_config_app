import ACTION_TYPES from "../actions/actionTypes";


const initState = {
    token: ''
};

export const persistReducer = (state = initState, action) => {
  switch (action.type) {

    default:
      return state;
  }
}; 
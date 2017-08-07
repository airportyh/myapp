const INITIAL_STATE = {
  token: null,
  error: '',
  message: ''
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'login-token':
      return {
        ...state,
        token: action.token
      };
    case 'error':
      return {
        ...state,
        error: action.error
      };
    case 'message':
      return { ...state, message: action.message };
    default:
      return state;
  }
}

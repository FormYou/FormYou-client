import Cookies from 'js-cookie';

const initialState = {
  name: Cookies.get('userName'),
  role: Cookies.get('userRole'),
  token: Cookies.get('token'),
  checked: Cookies.get('checked')
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      Cookies.set('userName', action.name);
      Cookies.set('userRole', action.role);
      Cookies.set('token', action.token);
      Cookies.set('checked', action.checked);
      return {
        ...state,
        name: action.name,
        role: action.role,
        checked: action.checked,
        token: action.token
      }
    case "SET_LOGOUT":
      Cookies.remove('userName');
      Cookies.remove('userRole');
      Cookies.remove('token');
      Cookies.remove('checked');
      return {
        ...state,
        name: null,
        role: null,
        checked: false,
        token: null
      }
    default:
      return state;
  }
};

export default userReducer;

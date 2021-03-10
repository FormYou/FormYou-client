export const setUser = (name, role, checked, token) => ({
    type: "SET_USER",
    name,
    role,
    checked,
    token
});

export const setLogout = () => ({
  type: "SET_LOGOUT"
});

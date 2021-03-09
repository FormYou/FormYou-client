export const setUser = (name, role, token) => {
  return {
    type: "SET_USER",
    name,
    role,
    token
  };
};

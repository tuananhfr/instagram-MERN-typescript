export const getTokenFromLocalStorage: any = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!) // Use the "!" operator to tell TypeScript that the value is not null.
    : null;
};

export const config = () => ({
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage().refreshToken}`,
    Accept: "application/json",
  },
});

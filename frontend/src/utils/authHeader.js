export const authHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: token } : {};
  };
  
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        token: localStorage.getItem("token") || null,
        role: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.user.role;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem('token');
        },
        updateAvatar: (state, action) => {
            if (state.user) {
                state.user.avatar = action.payload;
                localStorage.setItem("user", JSON.stringify(state.user)); // Cập nhật lại localStorage
            }
        },
    },
});

export const { loginSuccess, logout, updateAvatar } = authSlice.actions;
export default authSlice.reducer;

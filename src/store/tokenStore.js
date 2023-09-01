import { createSlice } from "@reduxjs/toolkit";

export const tokenStore = createSlice({
  name: "tokenStore",
  initialState: {
    //startedtime: null,?
    expireTime: null,
    token: null,
  },
  reducers: {
    setTokenInfo: (state, actions) => {
      //check if i have already the item in the array
      state.expireTime = actions.payload.expireTime;
      state.token = actions.payload.token;
    },

    //settoken?
    /*setSessionUser: (state, actions) => {
      var modifiedUser = JSON.parse(JSON.stringify(actions.payload.user));

      delete modifiedUser.password;
      if (modifiedUser.telefono === "") delete modifiedUser.telefono;
      if (modifiedUser.indirizzo === "") delete modifiedUser.indirizzo;
      if (modifiedUser.data === "") delete modifiedUser.data;
      if (modifiedUser.cap === "") delete modifiedUser.cap;
      if (modifiedUser.citta === "") delete modifiedUser.citta;
      if (modifiedUser.provincia === "") delete modifiedUser.provincia;

      state.user = modifiedUser;
      console.log({ actions });
    },*/

    emptyStore: (state, actions) => {
      console.log("store svuotato");
      delete state.token 
      delete state.expireTime
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTokenInfo, emptyStore } =
  tokenStore.actions;

export default tokenStore.reducer;
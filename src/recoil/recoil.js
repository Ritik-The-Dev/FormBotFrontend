import { atom } from "recoil";

export const USERDATA = atom({
  key: "userData",
  default: {},
});

export const UPDATEUSERDATA = atom({
  key: "updateUserData",
  default: true
})

export const ACCESSTYPE = atom({
  key: "accessType",
  default: "edit"
})

export const THEME = atom({
  key: "Theme",
  default: 'dark',
});
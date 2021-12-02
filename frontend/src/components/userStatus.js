import { createContext } from "react";

const userStatus = createContext({
  auth: false,
  setAuth: (a) => {},
});

export default userStatus;

// import { createContext } from "react";

// function getCookie(cname) {
//   var arrayb = document.cookie.split(";");
//   for (const item of arrayb) {
//     if (item.startsWith("jwt=")) {
//       return item.substr(4);
//     }
//   }
// }
// //dosn't work
// let token = getCookie("jwt");
// const userStatus = createContext({
//   auth: token === undefined ? false : true,
//   setAuth: (a) => {},
// });

// export default userStatus;

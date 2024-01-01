import { App } from "./view/app";

const msg = "kuchh toh hua hai, kuchh ho gaya hai";

export const runApp = () => {
  const initialTodos = [
    "saat baje hi uth gaye",
    "nahana tha, parn nahaya nahi",
    "khana thoos liya waise",
    "ab kabhi nahi kochenge",
  ];
  document.getElementById("root")!.appendChild(App({ todos: initialTodos }));
};

runApp();

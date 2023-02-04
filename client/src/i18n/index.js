import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import en from "./en";
import vi from "./vi"
const _ = i18n
.use(initReactI18next)
.init({
    resources:{
        en,
        vi
    },
    lng: "vi", 
    interpolation: {
      escapeValue: false 
    }
  });
export default _;
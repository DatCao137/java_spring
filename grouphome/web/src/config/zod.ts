import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/ja/zod.json";
import custom from "@/trans/ja.json";

/*
* How to check custom translations ?
* Please read this https://www.npmjs.com/package/zod-i18n-map
* Or open file zod-i18n-map/locales/ja/zod.json and check "custom" field.
* If you find custom translations, they will be merged with default translations.
* If not, you can add custom translations in this file.
* Other way find field here https://github.com/colinhacks/zod/blob/main/src/locales/en.ts
*/

i18next.init({
  lng: "ja",
  resources: {
    ja: { zod: { ...translation, ...custom } },
  },
});
z.setErrorMap(zodI18nMap);

export { z }
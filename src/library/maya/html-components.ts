import { htmlTagNames } from "./constants";
import { createEl } from "./core";
import { MayaElement, MayaMap, MayaTagName } from "./types";

export const MAYA: MayaMap = htmlTagNames.reduce((map, tagName) => {
  const mayaTag = tagName
    .split("")
    .map((char, index) => (!index ? char.toUpperCase() : char))
    .join("") as MayaTagName;

  map[mayaTag] = (props: Record<string, unknown>): MayaElement =>
    createEl(tagName, props);

  return map;
}, {} as MayaMap);

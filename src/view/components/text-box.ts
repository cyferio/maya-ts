import { MAYA, MayaInputElement } from "../../library/index";

type TextBoxProps = {
  onkeypress: (e: KeyboardEvent) => void;
};

export const TextBox = ({ onkeypress }: TextBoxProps) => {
  return MAYA.Input({
    type: "text",
    onkeypress: onkeypress,
    classNames: "border2-dark rad5 p2 h2",
  }) as MayaInputElement;
};

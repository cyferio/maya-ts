import { MAYA } from "../../library/maya";

type ButtonProps = {
  onclick: (e: MouseEvent) => void;
  label: string;
};

export const Button = ({ onclick, label }: ButtonProps) =>
  MAYA.Button({
    onclick: onclick,
    children: label,
    classNames: "border2-dark rad5 ml2 p2 h4 bcol-teal col-white",
  });

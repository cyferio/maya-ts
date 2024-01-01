import { MAYA } from "../../library/maya";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) =>
  MAYA.H2({
    children: title,
    classNames: "p2 m2",
  });

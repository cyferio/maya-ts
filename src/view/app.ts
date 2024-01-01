import { MAYA, MayaInputElement, Mutate } from "../library/maya";
import { Dispatch, State } from "../library/store";
import { Button, TextBox, Todos } from "./components";

type AppInitialProps = {
  todos: string[];
};

export const App = (firstRenderprops: AppInitialProps) => {
  const { todos } = firstRenderprops;
  let textbox: MayaInputElement;
  let addTodo;

  const initialRender = MAYA.Div({
    children: [
      MAYA.Div({
        classNames: "mb2",
        children: [
          (textbox = TextBox({
            onkeypress: (keyEvent) => Dispatch("UPDATE_SEARCH_TEXT", keyEvent),
          })),
          Button({
            label: "add todo",
            onclick: () => Dispatch("ADD_TODO", State.searchText),
          }),
        ],
      }),
      Todos({
        title: "Your todos list",
        todos: todos,
      }),
    ],
  });

  Mutate(textbox.mayaId, "CLEAR_SEARCH_TEXT", () => {
    textbox.value = "";
  });

  return initialRender;
};

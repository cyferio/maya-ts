import { MAYA, MayaElement, Mutate } from "../../../library/maya";
import { Header } from "../header";
import { TodoTile } from "./todo-tile";

type TodosProps = {
  title: string;
  todos: string[];
};

export const Todos = (firstRenderprops: TodosProps) => {
  const { title, todos } = firstRenderprops;
  let todosContainer: MayaElement;
  const baseCss = "pl5 pr5 m2 bcol-lgrey rad10";
  const paddingCss = "pt2 pb2";

  const firstRender = MAYA.Div({
    classNames: "border2-light rad15",
    children: [
      Header({ title }),
      (todosContainer = MAYA.Ul({
        children: todos.map((task, i) =>
          TodoTile({ task, isLast: i === todos.length - 1 })
        ),
        classNames: `${baseCss} ${paddingCss}`,
      })),
    ],
  });

  Mutate(todosContainer.mayaId, "DELETE_TODO_TILE", (todo) => {
    const todoTile = todo as MayaElement;
    todosContainer.removeChild(todoTile);

    if (!todosContainer.childNodes.length) {
      todosContainer.setAttribute("class", `${baseCss}`);
    }
  });

  Mutate(todosContainer.mayaId, "ADD_TODO_TILE", (task) => {
    if (!todosContainer.childNodes.length) {
      todosContainer.setAttribute("class", `${baseCss} ${paddingCss}`);
    }
    const todo = TodoTile({ task: task as string, isLast: true });
    todosContainer.appendChild(todo);
  });

  return firstRender;
};

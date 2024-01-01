import { MAYA, MayaElement, Mutate } from "../../../library/maya";
import { Dispatch } from "../../../library/store";

type TodoTileProps = {
  task: string;
  isLast: boolean;
};

export const TodoTile = (firstRenderprops: TodoTileProps) => {
  const { task, isLast } = firstRenderprops;
  const plainStyle = "display: flex; justify-content: space-between;";
  const styleWithBorder = `${plainStyle} border-bottom: 1px solid #ddd;`;

  const tile = MAYA.Div({
    classNames: `mt2 pb2`,
    style: ` ${isLast ? plainStyle : styleWithBorder}`,
    children: [
      MAYA.Span({
        children: task,
      }),
      MAYA.Button({
        children: "x",
        style: "display: inline-block;",
        onclick: () => {
          Dispatch("DELETE_TODO", tile);
        },
      }),
    ],
  });

  Mutate(tile.mayaId, "CHANGE_TILE_STYLE", () => {
    const lastChildSibling = tile.parentNode?.lastChild as
      | MayaElement
      | null
      | undefined;
    const isLastTile = lastChildSibling?.innerText === tile.innerText;
    const style = isLastTile ? plainStyle : styleWithBorder;
    tile.setAttribute("style", style);
  });

  return tile;
};

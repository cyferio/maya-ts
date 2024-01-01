import { Mutations, Action } from "../maya";

type StateProps = {
  searchText?: string;
};

export const State: StateProps = {};

export const Actions = {
  UPDATE_SEARCH_TEXT: "UPDATE_SEARCH_TEXT",
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
  SET_TILE_BORDER: "SET_TILE_BORDER",
};

export const Dispatch = (action: Action, payload: unknown) => {
  switch (action) {
    case Actions.UPDATE_SEARCH_TEXT:
      const event = payload as KeyboardEvent;
      if (event.key === "Enter") {
        Dispatch("ADD_TODO", State.searchText);
        Mutations.CLEAR_SEARCH_TEXT();
        break;
      }
      State.searchText = (event.target as HTMLInputElement).value;
      break;
    case Actions.ADD_TODO:
      const task = payload;
      Mutations.ADD_TODO_TILE(task);
      Mutations.CLEAR_SEARCH_TEXT();
      Mutations.CHANGE_TILE_STYLE();
      break;
    case Actions.DELETE_TODO:
      const todoTile = payload;
      Mutations.DELETE_TODO_TILE(todoTile);
      Mutations.CHANGE_TILE_STYLE();
      break;
    default:
      break;
  }
};

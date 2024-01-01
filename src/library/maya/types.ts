declare global {
  interface Window {
    prototypeAlteringDone: boolean;
  }
}

export type GlobalEventKey = keyof GlobalEventHandlers;

export type HtmlTagName = keyof HTMLElementTagNameMap;

export type MayaTagName = Capitalize<HtmlTagName>;

export type MayaId = number;

export interface MayaElement extends HTMLElement {
  mayaId: MayaId;
}

export interface MayaInputElement extends HTMLInputElement {
  mayaId: MayaId;
}

// export interface MayaNode extends Node {}

export type MayaMap = Record<
  MayaTagName,
  (x: Record<string, unknown>) => MayaElement
>;

export type Action =
  | "UPDATE_SEARCH_TEXT"
  | "ADD_TODO"
  | "DELETE_TODO"
  | "SET_TILE_BORDER";

export type MutationKey =
  | "CLEAR_SEARCH_TEXT"
  | "CHANGE_TILE_STYLE"
  | "ADD_TODO_TILE"
  | "DELETE_TODO_TILE";

export type TagArray = Array<keyof HTMLElementTagNameMap>;

export enum MutationKeyEnum {
  CLEAR_SEARCH_TEXT,
  CHANGE_TILE_STYLE,
  ADD_TODO_TILE,
  DELETE_TODO_TILE,
}

export type MutationsRegisterType = Record<MayaId, MutationKey[]>;

export type MutationCallbackObject = {
  nodeId: MayaId;
  callback: (x: unknown) => void;
};

export type MutationCallbacksType = Record<
  MutationKey,
  MutationCallbackObject[]
>;

export type MutationsType = Record<MutationKey, (...args: unknown[]) => void>;

import { eventKeys } from "./constants";
import {
  MayaId,
  MayaElement,
  MutationKey,
  MutationsType,
  MutationsRegisterType,
  MutationCallbacksType,
  MutationCallbackObject,
  HtmlTagName,
  GlobalEventKey,
} from "./types";

window.prototypeAlteringDone = false;

if (!window.prototypeAlteringDone) {
  const remover = HTMLElement.prototype.removeChild;
  HTMLElement.prototype.removeChild = function <T extends Node>(child: T) {
    const context = this;
    remover.call(context, child);
    const nodeId = (child as unknown as MayaElement).mayaId;
    removeMutationCallback(nodeId);

    return child;
  };

  const appender = HTMLElement.prototype.appendChild;
  HTMLElement.prototype.appendChild = function <T extends Node>(child: T) {
    const context = this;
    appender.call(context, child);
    const nodeId = (child as unknown as MayaElement).mayaId;

    return child;
  };

  window.prototypeAlteringDone = true;
}

let elId: MayaId = 0;
const getNewId = (): MayaId => elId++;
const MutationsRegister: MutationsRegisterType = {};
const MutationCallbacks: MutationCallbacksType = {
  CLEAR_SEARCH_TEXT: [],
  CHANGE_TILE_STYLE: [],
  ADD_TODO_TILE: [],
  DELETE_TODO_TILE: [],
};
export const Mutations: MutationsType = {
  CLEAR_SEARCH_TEXT: () => {},
  CHANGE_TILE_STYLE: () => {},
  ADD_TODO_TILE: () => {},
  DELETE_TODO_TILE: () => {},
};

export const Mutate = (
  nodeId: MayaId,
  mutationKey: MutationKey,
  callback: MutationCallbackObject["callback"]
) => {
  const callbackObject = { nodeId, callback };
  if (MutationsRegister[nodeId]) {
    MutationsRegister[nodeId].push(mutationKey);
  } else {
    MutationsRegister[nodeId] = [mutationKey];
  }

  MutationCallbacks[mutationKey].push(callbackObject);
  Mutations[mutationKey] = (...args) => {
    MutationCallbacks[mutationKey]?.forEach((cbObject) => {
      cbObject.callback.call(null, ...args);
    });
  };
};

const removeMutationCallback = (nodeId: MayaId) => {
  const nodeMutationKeys = MutationsRegister[nodeId];
  if (!nodeMutationKeys?.length) return;

  const callbacksCount = nodeMutationKeys.length;
  for (const [key, callbacks] of Object.entries(MutationCallbacks)) {
    const mutationKey = key as MutationKey;
    let totaleDeleted = 0;
    if (nodeMutationKeys.includes(mutationKey)) {
      MutationCallbacks[mutationKey] = callbacks.filter(
        (cbObj) => cbObj.nodeId !== nodeId
      );
      totaleDeleted += 1;
    }
    if (totaleDeleted == callbacksCount) {
      delete MutationsRegister[nodeId];
      break;
    }
  }
};

export const createEl = (
  tagName: HtmlTagName,
  props: Record<string | GlobalEventKey, unknown>
) => {
  const htmlNode = document.createElement(tagName) as MayaElement;
  htmlNode.mayaId = getNewId();

  const el: MayaElement = htmlNode;

  for (const [key, value] of Object.entries(props)) {
    if (
      eventKeys.includes(key as GlobalEventKey) &&
      typeof value === "function"
    ) {
      const eventKey = key.slice(2);
      el.addEventListener(
        eventKey,
        value as EventListenerOrEventListenerObject
      );
    } else if (key === "children") {
      if (typeof value === "string") {
        el.innerText = value;
      }
      if (Array.isArray(value)) {
        value.forEach((child) => {
          el.appendChild(child);
        });
      }
    } else {
      const attrKey = key === "classNames" ? "class" : key;
      el.setAttribute(attrKey, value as string);
    }
  }

  return el;
};

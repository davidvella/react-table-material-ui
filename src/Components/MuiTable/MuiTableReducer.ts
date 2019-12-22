import { IMuiTableContext, MuiTableAction } from "./MuiTableProvider.types";
import { ValueType, OptionTypeBase } from "react-select";
import {cloneDeep} from "lodash";

/**
 * Reducer specify how the application's state changes in response to actions sent to the store. 
 * 
 * @param state The Previous context state.
 * @param action The type of action to perform.
 */
export const MuiTableReducer = (state: IMuiTableContext, action: MuiTableAction) => {
  const { columns, filterValues } = state;

  switch (action.type) {
    case "resetFilter":
      const emptyDict = new Map<
        string,
        ValueType<OptionTypeBase> | undefined
      >();

      columns
        .filter(col => !col.disableFilters)
        .forEach(col => {
          emptyDict.set(col.id, null);
        });
      return {
        ...state,
        filterValues: emptyDict
      };
    case "setFilter":
      // UseEffect use compare by reference, so a new map has to be set
      const dict = cloneDeep(filterValues);
      dict.set(action.columnId, action.filter);
      return {
        ...state,
        filterValues:dict
      };
  }
  return state;
};

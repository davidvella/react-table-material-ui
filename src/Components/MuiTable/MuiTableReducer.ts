import { IMuiTableContext, MuiTableAction } from "./MuiTableProvider.types";
import { Dictionary } from "typescript-collections";
import { ValueType, OptionTypeBase } from "react-select";

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
      const emptyDict = new Dictionary<
        string,
        ValueType<OptionTypeBase> | undefined
      >();

      columns
        .filter(col => !col.disableFilters)
        .forEach(col => {
          emptyDict.setValue(col.id, null);
        });
      return {
        ...state,
        filterValues: emptyDict
      };
    case "setFilter":
      const dict = filterValues;
      dict.setValue(action.columnId, action.filter);
      return {
        ...state,
        dict
      };
  }
  return state;
};

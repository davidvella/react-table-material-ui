import { IMuiTableContext, MuiTableAction } from "./MuiTableProvider.types";
import { Dictionary } from "typescript-collections";
import { ValueType, OptionTypeBase } from "react-select";

/**
 *
 * @param state
 * @param action
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

import React, { createContext, FC, useMemo, useReducer } from "react";
import { IMuiTableProviderProps, IMuiTableContext, MuiTableAction } from "./MuiTableProvider.types";
import { MuiTableReducer } from "./MuiTableReducer";
import { OptionTypeBase, ValueType } from "react-select";

/**
 * The Initial state for the context.
 */
const initialState: IMuiTableContext = { filterValues: new Map<string, OptionTypeBase[] | null>(), columns: [] };

/**
 * The initial context
 */
export const MuiTableContext = createContext<{ state: IMuiTableContext, dispatch: (action: MuiTableAction) => void }>({ state: initialState, dispatch: (action) => {} });

/**
 * Context Provider
 * @param props 
 */
export const MuiTableProvider: FC<IMuiTableProviderProps> = (props) => {

  /**
   * Values from the props
   */
  const {
    columns,
    children
  } = props;

  /**
   * Populate dictionary with filter values
   */
  const defaultDictionary = useMemo(() => {
    const dict = new Map<string,  ValueType<OptionTypeBase> | undefined>();

    columns.filter(col => !col.disableFilters).forEach(col => {
      dict.set(col.id, null);
    })

    return dict
  }, [columns]);

  // new
  const [state, dispatch] = useReducer(MuiTableReducer, {filterValues:defaultDictionary, columns:columns});

  return (
    <MuiTableContext.Provider
      value={{
        state: state,
        dispatch: dispatch
      }}
    >
      {children}
    </MuiTableContext.Provider>
  );
};

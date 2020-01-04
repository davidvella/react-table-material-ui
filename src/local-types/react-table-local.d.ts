import {
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseSortByOptions,
  UseRowSelectInstanceProps,
  UseRowSelectState,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseSortByColumnOptions
} from "react-table";
import { OptionsType, InputActionMeta, OptionTypeBase } from "react-select";

declare module "react-table" {
  export interface TableOptions<D extends object>
    extends UsePaginationOptions<D>,
      UseSortByOptions<D>,
      UseRowSelectOptions<D> {}

  export interface TableInstance<D extends object = {}>
    extends UsePaginationInstanceProps<D>,
      UseRowSelectInstanceProps<D> {}

  export interface TableState<D extends object = {}>
    extends UsePaginationState<D>,
      UseSortByState<D>,
      UseRowSelectState<D> {}

  export interface UseTableColumnProps<D extends object> {
    
    getToggleHiddenProps: () => any;
  }

  export interface Row<D extends object = {}> extends UseRowSelectRowProps<D> {}

  export interface Column<D extends object = {}>
    extends UseSortByColumnOptions<D> {
    /*Disable filters for the column */
    disableFilters?: boolean;
    /* The default set of options to show before the user starts searching. When
 set to `true`, the results for loadOptions('') will be autoloaded.
 Default: false. */
    defaultOptions?: OptionsType<D> | boolean;
    /* Function that returns a promise, which is the set of options to be used
 once the promise resolves. */
    loadOptions?: (
      inputValue: string,
      callback: (options: OptionsType<D>) => void
    ) => Promise<any> | void;
    /* If cacheOptions is truthy, then the loaded data will be cached. The cache
 will remain until `cacheOptions` changes value.
 Default: false. */
    cacheOptions?: any;
    /* Support multiple selected options */
    isMulti?: boolean;
    /* Provide a custom componet to render a column*/
    OptionRenderer?: ComponentType<OptionProps<any>>;
    /* Filter to be shown on top of the Filter */
    filterLabel?: string;
  }
}

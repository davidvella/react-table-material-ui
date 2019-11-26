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
  } from 'react-table'
  
  declare module 'react-table' {
    export interface TableOptions<D extends object>
      extends UsePaginationOptions<D>, UseSortByOptions<D>, UseRowSelectOptions<D> {}
  
    export interface TableInstance<D extends object = {}>
      extends UsePaginationInstanceProps<D>, UseRowSelectInstanceProps<D> {}
  
    export interface TableState<D extends object = {}>
      extends UsePaginationState<D>, UseSortByState<D>, UseRowSelectState<D>{}

    export interface Row<D extends object = {}> 
      extends UseRowSelectRowProps<D>{}

    export interface Column<D extends object = {}>
      extends UseSortByColumnOptions<D>{}
  }
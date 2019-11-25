import {
    UsePaginationInstanceProps,
    UsePaginationOptions,
    UsePaginationState,
    UseSortByOptions
  } from 'react-table'
  
  declare module 'react-table' {
    export interface TableOptions<D extends object>
      extends UsePaginationOptions<D>, UseSortByOptions<D>  {}
  
    export interface TableInstance<D extends object = {}>
      extends UsePaginationInstanceProps<D> {}
  
    export interface TableState<D extends object = {}>
      extends UsePaginationState<D>, UseSortByState<D> {}
  }
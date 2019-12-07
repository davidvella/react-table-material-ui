import { FC } from "react";
import React from "react";
import { Grid } from "@material-ui/core";
import { MuiAsyncSelect } from "../MuiAsyncSelect/MuiAsyncSelect";

export const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i: { label: { toLowerCase: () => { includes: (arg0: string) => void; }; }; }) => {
    return i.label.toLowerCase().includes(inputValue.toLowerCase());
  }
  );
};

const promiseOptions = (inputValue: any) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 200);
  });

export const MuiTableFilterList: FC<any> = (props) => {

  // Temp to 
  const columns = [1, 2, 3, 4]

  return (

    <Grid container spacing={4}>
      {columns.map((column, columnIndex) => {
        const isLastRecord = columns.length - 1 === columnIndex;
        const isOddLength = columns.length % 2 !== 0;
        const isOnlyInRow = isLastRecord && isOddLength;
        return (
          <Grid item xs={isOnlyInRow ? 12 : 6} key={columnIndex}>
            <MuiAsyncSelect
              name={"test123"}
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={promiseOptions}
            />
          </Grid>
        );
      })}
    </Grid>

  )
}
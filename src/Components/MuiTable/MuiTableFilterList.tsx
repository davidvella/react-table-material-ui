import { FC } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { MuiAsyncSelect } from "../MuiAsyncSelect/MuiAsyncSelect";

/**
 * Styles for the FilterList
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '24px 24px 36px 24px',
      fontFamily: 'Roboto',
    },
    header: {
      flex: '0 0 auto',
      marginBottom: '16px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    title: {
      display: 'inline-block',
      marginLeft: '7px',
      color: theme.palette.text.primary,
      fontSize: '14px',
      fontWeight: 500,
    },
    noMargin: {
      marginLeft: '0px',
    },
    reset: {
      alignSelf: 'left',
    },
    resetLink: {
      marginLeft: '16px',
      fontSize: '12px',
      cursor: 'pointer',
    },
    filtersSelected: {
      alignSelf: 'right',
    },
    checked: {},
    gridListTile: {
      marginTop: '16px',
    },
  }),
);

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
  const columns = [1, 2, 3,4]

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.reset}>
          <Typography
            variant="body2"
            className={classes.title}>
            FILTERS
            </Typography>
          <Button
            color="primary"
            className={classes.resetLink}
            tabIndex={0}
            aria-label={"RESET"}
            data-testid={'filterReset-button'}>
            RESET
            </Button>
        </div>
        <div className={classes.filtersSelected} />
      </div>
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
      
    </div>
  )
}
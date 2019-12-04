import { FC } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from "react";
import { Typography, Button, GridList } from "@material-ui/core";

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


export const MuiTableFilterList: FC<any> = (props) => {
    const classes = useStyles();

    return(
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
        <GridList cellHeight="auto" cols={2} spacing={34}>

        </GridList>
      </div>
    )
}
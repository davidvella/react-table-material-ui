import React, { useState } from 'react';
import makeData from './makeData';
import { CellProps, SortingRule, Column } from 'react-table';
import { MuiTable } from './Components/MuiTable/MuiTable';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { OptionTypeBase, ValueType } from "react-select";

import { darkTheme } from './theme';
import { MuiChipSelect } from './Components/MuiChipSelect/MuiChipSelect';

const serverData = makeData(1000);

export const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', disabled: true },
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


const App: React.FC = () => {
  const columns: Column<any>[] = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
        id: "1",
        filterLabel: 'First Name',
        loadOptions: promiseOptions,
        disableFilters: true
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        id: "2",
        filterLabel: 'Last Name',
        loadOptions: promiseOptions,
        disableFilters: true
      },
      {
        Header: 'Age',
        accessor: 'age',
        Cell: ({ cell: { value } }: CellProps<object>) => <div>{value}</div>,
        id: "3",
        loadOptions: promiseOptions,
        disableFilters: true
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        Cell: ({ cell: { value } }: CellProps<object>) => <div>{value}</div>,
        id: "4",
        disableFilters: true,
      },
      {
        Header: 'Status',
        accessor: 'status',
        id: "5",
        loadOptions: promiseOptions,
      },
      {
        Header: 'Profile Progress',
        id: "6",
        Cell: ({ row: { original } }: CellProps<any>) => {
          return (<span>
            {original.progress}
          </span>)
        },
        loadOptions: promiseOptions,
        isMulti: true,
        disableFilters: true
      },
    ],
    []
  )

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  //const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0);
  const sortIdRef = React.useRef(0);

  // This will get called when the table needs new data
  // You could fetch your data from literally anywhere,
  // even a server. But for this example, we'll just fake it.
  const fetchData = React.useCallback((pageIndex: number) => {
    // Give this fetch an ID
    const fetchID = ++fetchIdRef.current
    global.console.log("Fetching Data")
    // Set the loading state
    //setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchID === fetchIdRef.current) {
        const startRow = 10 * pageIndex
        const endRow = startRow + 10;
        setData(serverData.slice(startRow, endRow))

        // Your server could send back total page count.
        // For now we'll just fake it, too
        setPageCount(Math.ceil(serverData.length / 10))

        //setLoading(false)
      }
    }, 1000)
  }, [])

  // This will get called when the user click sort
  // You could fetch your data from literally anywhere,
  // even a server. But for this example, we'll just fake it.
  const sortData = React.useCallback((sortRules: Array<SortingRule<any>>) => {
    // Give this fetch an ID
    const sortID = ++sortIdRef.current

    // Set the loading state
    //setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (sortID === sortIdRef.current) {
        global.console.log(sortRules);

        // Sort Logic goes here
        //setLoading(false)
        setData(serverData.slice(0, 10))
      }
    }, 1000)
  }, [])

  // This will get called when the user click sort
  // You could fetch your data from literally anywhere,
  // even a server. But for this example, we'll just fake it.
  const filterData = React.useCallback((filterOptions: Map<string | undefined, ValueType<OptionTypeBase> | null>) => {
    global.console.log(filterOptions);
  }, [])
  
  const [fruits, setFruits] = useState([colourOptions[0]]);


  return (
    <div>
      <CssBaseline />
      <MuiThemeProvider theme={darkTheme}>
        <MuiChipSelect value={fruits as any} options={colourOptions as any} onChange={setFruits} multi/>
        <MuiTable columns={columns}
          data={data}
          initialPageSize={10}
          onChangePage={fetchData}
          pageCount={pageCount}
          serverSide={true}
          onColumnSortChange={sortData}
          onFilterChange={filterData}
          resetPageIndexOnSort={true}
        />
      </MuiThemeProvider>

    </div>
  );
}

export default App;

import React, { FC } from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { MuiTable } from './MuiTable';
// this adds custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
import "snapshot-diff";

const data = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 29,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'derek',
        lastName: 'perkins',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'bergevin',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe',
        lastName: 'bergevin',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe',
        lastName: 'bergevin',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe',
        lastName: 'bergevin',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe',
        lastName: 'bergevin',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe',
        lastName: 'bergevin',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe',
        lastName: 'bergevin',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe',
        lastName: 'bergevin',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe',
        lastName: 'bergevin',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe',
        lastName: 'bergevin',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

const columns = [
    {
        Header: 'First Name',
        accessor: 'firstName',
        id: "1",
        filterLabel: 'First Name',
        disableFilters: true,
    },
    {
        Header: 'Last Name',
        accessor: 'lastName',
        id: "2",
        filterLabel: 'Last Name',
        disableFilters: true,
    },
    {
        Header: 'Age',
        accessor: 'age',
        id: "3",
        disableFilters: true,
    },
    {
        Header: 'Visits',
        accessor: 'visits',
        id: "4",
        disableFilters: true,
    },
    {
        Header: 'Status',
        accessor: 'status',
        id: "5",
        disableFilters: true,
    },
]

describe('<MuiTable />', () => {

    afterEach(cleanup);

    it('should renders a basic table', () => {
        const { getByText, asFragment } = render(<MuiTable columns={columns} data={data} initialPageSize={10} />)

        expect(getByText('tanner')).toBeInTheDocument()
        expect(getByText('linsley')).toBeInTheDocument()
        expect(getByText('29')).toBeInTheDocument()
        expect(getByText('100')).toBeInTheDocument()
        expect(getByText('In Relationship')).toBeInTheDocument()

        expect(asFragment()).toMatchSnapshot()
    });

    it('should next page be called', () => {
        const onClick = jest.fn();

        const { container } = render(<MuiTable columns={columns} data={data} initialPageSize={10} serverSide={true} onChangePage={onClick} isRowSelectable={true}/>)

        const nextButton = container.querySelectorAll('button[type="button"]')[1];

        fireEvent.click(nextButton);

        expect(onClick).toHaveBeenCalled()
    });

    it('should serverSideSort be called', () => {
        const onClick = jest.fn();

        const { container } = render(<MuiTable columns={columns} data={data} initialPageSize={10} serverSide={true} onColumnSortChange={onClick} />)

        const sortButton = container.querySelectorAll('span[role="button"]')[1];

        fireEvent.click(sortButton);

        expect(onClick).toHaveBeenCalled()
    });
});
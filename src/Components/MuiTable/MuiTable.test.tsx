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
]

const App: FC<any> = (props) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Age',
                        accessor: 'age',
                    },
                    {
                        Header: 'Visits',
                        accessor: 'visits',
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                    },
                    {
                        Header: 'Profile Progress',
                        accessor: 'progress',
                    },
                ],
            },
        ],
        []
    )

    return <MuiTable columns={columns} data={data} initialPageSize={50} />
}

describe('<MuiTable />', () => {

    afterEach(cleanup);

    it('should renders a basic table', () => {
        const { getByText, asFragment } = render(<App />)

        expect(getByText('tanner')).toBeInTheDocument()
        expect(getByText('linsley')).toBeInTheDocument()
        expect(getByText('29')).toBeInTheDocument()
        expect(getByText('100')).toBeInTheDocument()
        expect(getByText('In Relationship')).toBeInTheDocument()

        expect(asFragment()).toMatchSnapshot()
    });

});
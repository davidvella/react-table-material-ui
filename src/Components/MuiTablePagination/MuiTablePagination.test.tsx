import React from 'react';
import {
    render,
    cleanup,
    fireEvent,
} from "@testing-library/react";
// this adds custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
import { MuiTablePagination } from './MuiTablePagination';

describe('<TablePagination />', () => {
    const noop = () => { };

    afterEach(cleanup);

    describe('mount', () => {

        it('should use labelRowsPerPage', () => {
            const { getByText } = render(
                <MuiTablePagination
                    canNextPage={true}
                    canPreviousPage={true}
                    rowsPerPage={10}
                    onClickNext={noop}
                    onClickPrevious={noop}
                    labelRowsPerPage="Zeilen pro Seite:"
                />,
            );
            expect(getByText('Zeilen pro Seite:')).toBeTruthy();
        });

        it('should disable the back button', () => {
            const { container } = render(
                <MuiTablePagination
                    canNextPage={true}
                    canPreviousPage={false}
                    rowsPerPage={10}
                    onClickNext={noop}
                    onClickPrevious={noop}
                    labelRowsPerPage="Zeilen pro Seite:"
                />);

            const backButton = container.querySelectorAll('button')[0];
            const nextButton = container.querySelectorAll('button')[1];
            expect(backButton.disabled).toEqual(true);
            expect(nextButton.disabled).toEqual(false);
        });

        it('should disable the forward button', () => {
            const { container } = render(
                <MuiTablePagination
                    canNextPage={false}
                    canPreviousPage={true}
                    rowsPerPage={10}
                    onClickNext={noop}
                    onClickPrevious={noop}
                    labelRowsPerPage="Zeilen pro Seite:"
                />);

            const backButton = container.querySelectorAll('button')[0];
            const nextButton = container.querySelectorAll('button')[1];
            expect(backButton.disabled).toEqual(false);
            expect(nextButton.disabled).toEqual(true);
        });

        it('should handle back button clicks properly', () => {
            const onClick = jest.fn();

            const { container } = render(
                <MuiTablePagination
                    canNextPage={false}
                    canPreviousPage={true}
                    rowsPerPage={10}
                    onClickNext={noop}
                    onClickPrevious={() => onClick()}
                    labelRowsPerPage="Zeilen pro Seite:"
                />);

            const backButton = container.querySelectorAll('button')[0];

            fireEvent.click(backButton);

            expect(onClick).toHaveBeenCalled();

        });

        it('should handle next button clicks properly', () => {
            const onClick = jest.fn();

            const { container } = render(
                <MuiTablePagination
                    canNextPage={true}
                    canPreviousPage={true}
                    rowsPerPage={10}
                    onClickNext={() => onClick()}
                    onClickPrevious={noop}
                    labelRowsPerPage="Zeilen pro Seite:"
                />);

            const nextButton = container.querySelectorAll('button')[1];

            fireEvent.click(nextButton);

            expect(onClick).toHaveBeenCalled();

        });

        it('should hide the rows per page selector if there are less than two options', () => {

            const { queryByText } = render(
                <MuiTablePagination
                    canNextPage={true}
                    canPreviousPage={true}
                    rowsPerPageOptions={[12]}
                    rowsPerPage={10}
                    onClickNext={noop}
                    onClickPrevious={noop}
                    labelRowsPerPage="Zeilen pro Seite:"
                />,
            );
            expect(queryByText('Zeilen pro Seite:')).toBeNull();
        });

    });

});
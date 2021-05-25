import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './index';
describe('Main', () => {
    test('renders Button component', () => {
        const { getByTestId } = render(<Main />);
        expect(getByTestId("startButton")).toBeTruthy()

    });
    test('Main component has a title ', () => {
        const { getByTestId } = render(<Main />);
        expect(getByTestId('title').textContent).toBe('Henry Food')
    });
});
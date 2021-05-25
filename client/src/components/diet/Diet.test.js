import React from 'react';
import { render, screen } from '@testing-library/react';
import Diet from './index';

describe('Diet', () => {
    test('no se renderiza si no se le pasa un nombre', () => {
        const { queryByTestId } = render(<Diet />);
        expect(queryByTestId('dietCompDiv')).toEqual(null);
    });

    test('se renderiza si no se le pasa un nombre', () => {
        const { queryByTestId } = render(<Diet name="paleo" />);
        expect(queryByTestId('dietCompDiv')).not.toEqual(null);
    });

    test('muestra el nombre pasado por parametro', () => {
        let diet = "vegan"
        const { getByTestId } = render(<Diet name={diet} />);
        expect(getByTestId("dietCompData").textContent).toBe(diet)
    });
});
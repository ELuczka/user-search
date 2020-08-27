import React from 'react';

import renderer from 'react-test-renderer';

import MainCard from './MainCard';

it('MainCard to match snapshot', () => {
    const component = renderer
    .create(<MainCard/>)
    .toJSON();

    expect(component).toMatchSnapshot();
});
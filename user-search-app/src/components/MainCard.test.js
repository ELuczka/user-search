import React from 'react';

import renderer from 'react-test-renderer';

import MainCard from './MainCard';

it('Test', () => {
    const component = renderer
    .create(<MainCard/>)
    .toJSON();

    expect(component).toMatchSnapshot();
});
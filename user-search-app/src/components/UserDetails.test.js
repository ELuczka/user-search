import React from 'react';

import renderer from 'react-test-renderer';

import UserDetails from './UserDetails';

const memoizedUserDetails = {
    name: "Test User",
    bio: "Hello World, I am React Developer!",
    avatarUrl: "https://avatars1.githubusercontent.com/u/129108?v=4",
    login: "Test",
  };

it('Test', () => {
    const component = renderer
    .create(<UserDetails user={memoizedUserDetails}/>)
    .toJSON();

    expect(component).toMatchSnapshot();
});
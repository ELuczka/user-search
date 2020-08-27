import React from 'react';

import renderer from 'react-test-renderer';

import UserRepositories from './UserDetails';

const memoizedUserDetails = {
    name: "Test User",
    bio: "Hello World, I am React Developer!",
    avatarUrl: "https://avatars1.githubusercontent.com/u/129108?v=4",
    login: "Test",
  };

it('UserRepositories to match snapshot', () => {
    const component = renderer
    .create(<UserRepositories user={memoizedUserDetails}/>)
    .toJSON();

    expect(component).toMatchSnapshot();
});
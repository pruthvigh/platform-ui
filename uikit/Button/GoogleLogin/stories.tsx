import { storiesOf } from '@storybook/react';
import React from 'react';
import Google from '.';

const GoogleStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <Google link="/">Skeleton</Google>
));

export default GoogleStories;

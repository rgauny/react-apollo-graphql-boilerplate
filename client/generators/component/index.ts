/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

import componentExists from '../utils/componentExists';

export default {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantHooks',
      default: false,
      message: 'Do you want to use React Hooks methods?',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
    {
      type: 'confirm',
      name: 'wantStyle',
      default: false,
      message: 'Do you want to use styled-components for styling?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../src/app/components/{{properCase name}}/index.js',
        templateFile: './component/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/app/components/{{properCase name}}/tests/index.test.js',
        templateFile: './component/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If the user wants i18n messages
    // if (data.wantMessages) {
    //   actions.push({
    //     type: 'add',
    //     path: '../src/app/components/{{properCase name}}/messages.js',
    //     templateFile: './component/messages.js.hbs',
    //     abortOnFail: true,
    //   });
    // }

    // If the user wants Loadable.js to load the component asynchronously
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../src/app/components/{{properCase name}}/Loadable.js',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    // actions.push({
    //   type: 'prettify',
    //   path: '/components/',
    // });

    return actions;
  },
};
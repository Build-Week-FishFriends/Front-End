# Front-End

## Getting Started

`yarn install` to get all dependencies
`yarn start` to start a dev server
[production url](https://fish-friends.netlify.com/)

## Dependencies

- `react` for user-interface state management
- `react-map-gl` for map ui and user location management
- `react-router` for in-app routing
- `axios` for api interactions
- `formik` for simpler form management
- `yup` for client-side form validation
- `styled-components` for custom styling
- `material-ui/core` for pre-built components
- `semantic-ui` for pre-built components

## Production deploys and repo management

When you merge into master, netlify kicks off a new production build. All pull requests will go through a build check on netlify. If the build fails, you cannot merge the pull request into master.

// import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { auth } from '../utils/firebase';
// import { userState } from '../Recoil';
// import { useRecoilState } from 'recoil';

export function PrivateRoute({ children, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return authenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
      }}
    />
  );
}

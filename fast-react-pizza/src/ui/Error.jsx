import { useRouteError } from 'react-router-dom';
import { Fragment } from 'react';
import LinkButton from './LinkButton';

function NotFound() {
  const { error } = useRouteError();

  return (
    <Fragment>
      {error && (
        <div>
          <h1>Something went wrong 😢</h1>
          <p>{error.message}</p>
          <LinkButton to={-1}>&larr; Go back</LinkButton>
        </div>
      )}
    </Fragment>
  );
}

export default NotFound;

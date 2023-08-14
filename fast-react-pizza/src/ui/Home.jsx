import { useSelector } from 'react-redux';
import { Fragment } from 'react';

import CreateUser from '../features/User/CreateUser';
import Button from './Button';

function Home() {
  const userName = useSelector(state => state.user.userName);

  return (
    <div className='my-10 px-4 text-center sm:my-16'>
      <h1 className='mb-4 text-center text-xl font-semibold md:text-3xl'>
        The best pizza.
        <br />
        <span className='text-yellow-400'>
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!userName ? (
        <CreateUser />
      ) : (
        <Fragment>
          <h1 className='mb-4 text-center text-xl font-semibold md:text-3xl'>
            Welcome{userName}
          </h1>
          <Button to={'/menu'} type={'primary'}>Start Ordering</Button>
        </Fragment>
      )}
    </div>
  );
}

export default Home;

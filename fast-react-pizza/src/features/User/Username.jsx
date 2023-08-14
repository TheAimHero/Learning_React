import { useSelector } from 'react-redux';

export default function Username() {
  const userName = useSelector(state => state.user.userName);

  return (
    <div className='hidden text-sm font-semibold sm:block '>{userName}</div>
  );
}

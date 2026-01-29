import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { getUserData } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(getUserData);
  const userName = user?.name;
  return <AppHeaderUI userName={userName} />;
};

import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUserApi, TRegisterData } from '@api';
import { useDispatch, useSelector } from '@store';
import {
  clearError,
  getError,
  registerUser
} from '../../services/slices/userSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const error = useSelector(getError) as string;

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const registerData: TRegisterData = {
    name: userName,
    email: email,
    password: password
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(registerData));
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};

// import { FC, SyntheticEvent, useState } from 'react';
// import { RegisterUI } from '@ui-pages';

// export const Register: FC = () => {
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//   };

//   return (
//     <RegisterUI
//       errorText=''
//       email={email}
//       userName={userName}
//       password={password}
//       setEmail={setEmail}
//       setPassword={setPassword}
//       setUserName={setUserName}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

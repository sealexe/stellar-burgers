import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import {
  getIngredients,
  getIngredientsLoading
} from '../../services/slices/ingredientSlice';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '@store';
import { checkUserAuth } from '../../services/actions';
import { ProtectedRoute } from '../protected-route';

const App = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(getIngredientsLoading);

  const navigate = useNavigate();
  const onClose = () => {
    navigate(-1);
  };

  const location = useLocation();
  const orderId = location.pathname.split('/').pop();

  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, []);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        {isIngredientsLoading ? (
          <Preloader />
        ) : (
          <>
            <Routes location={backgroundLocation || location}>
              <Route path='/' element={<ConstructorPage />} />
              <Route path='/ingredients/:id' element={<IngredientDetails />} />
              <Route path='/feed' element={<Feed />} />
              <Route path='/feed/:number' element={<OrderInfo />} />
              <Route
                path='/login'
                element={<ProtectedRoute onlyUnAuth component={<Login />} />}
              />
              <Route
                path='/profile'
                element={<ProtectedRoute component={<Profile />} />}
              />
              <Route
                path='/register'
                element={<ProtectedRoute onlyUnAuth component={<Register />} />}
              />
              <Route
                path='/forgot-password'
                element={
                  <ProtectedRoute onlyUnAuth component={<ForgotPassword />} />
                }
              />
              {/* <Route
                path='/profile/orders'
                element={<ProtectedRoute component={<ProfileOrders />} />}
              /> */}
              <Route
                path='/reset-password'
                element={
                  <ProtectedRoute onlyUnAuth component={<ResetPassword />} />
                }
              />
              {/* <Route path='*' element={<NotFound404 />} /> */}
            </Routes>
            {backgroundLocation && (
              <Routes>
                <Route
                  path='/ingredients/:id'
                  element={
                    <Modal title='Детали ингредиента' onClose={onClose}>
                      <IngredientDetails />
                    </Modal>
                  }
                />
                <Route
                  path='/feed/:number'
                  element={
                    <Modal title={`#${orderId}`} onClose={onClose}>
                      <OrderInfo />
                    </Modal>
                  }
                />
              </Routes>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default App;

// {/* const App = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getIngredients());
//   }, []);

//   return (
//     <div className={styles.app}>
//       <AppHeader />
//       <Routes>
//         <Route path='/' element={<ConstructorPage />} />
//       </Routes>
//     </div>
//   );
// }; */}

import { ConstructorPage, Feed } from '@pages';
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

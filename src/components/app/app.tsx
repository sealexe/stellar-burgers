import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal } from '@components';
import { Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientSlice';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '@store';

const App = () => {
  const dispatch = useDispatch();
  const { isIngredientsLoading } = useSelector(
    (state) => state.ingredientsList
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        {isIngredientsLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
          </Routes>
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

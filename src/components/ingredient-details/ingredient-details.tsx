import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '@store';
import { useParams } from 'react-router-dom';
import { getAllIngredients } from '../../services/slices/ingredientSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams();
  const ingredients = useSelector(getAllIngredients);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

import { FC } from 'react';
import styles from '../../components/ui/pages/common.module.css';

export const NotFound404: FC = () => (
  <div className={styles.wrapCenter}>
    <h3 className={`pb-6 text text_type_main-large`}>
      Страница не найдена. Ошибка 404.
    </h3>
  </div>
);

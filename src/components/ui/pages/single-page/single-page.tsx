import { FC } from 'react';
import styles from '../common.module.css';

export type TSinglePageProps = {
  component: React.JSX.Element;
};

export const SinglePage: FC<TSinglePageProps> = ({ component }) => (
  <div className={styles.wrapCenter}>{component}</div>
);

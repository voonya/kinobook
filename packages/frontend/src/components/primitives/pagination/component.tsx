import { memo } from 'react';
import { IconButton, IconName } from '@components';
import styles from './styles.module.scss';

interface PaginationBarProps {
  page: number;
  firstPage: number;
  lastPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const PaginationBar = memo(
  ({ page, lastPage, onPrevPage, onNextPage }: PaginationBarProps) => (
    <div className={styles.wrapper}>
      <IconButton onClick={onPrevPage} icon={IconName.ARROW_LEFT} />
      <span>
        {page} of {lastPage}
      </span>
      <IconButton onClick={onNextPage} icon={IconName.ARROW_RIGHT} />
    </div>
  ),
);

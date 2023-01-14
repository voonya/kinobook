import { useState } from 'react';
import { ViewedForm } from '../form';
import { getMovie, getViewById } from 'src/services';
import type { IMovie, IViewed } from '@common';
import Modal from 'react-modal';
import { Spinner } from '@components';
import { useAppSelector, useAppDispatch } from '@hooks';
import { closeViewModal, clearViewModal } from 'src/store';
import { useEffect } from 'react';
import { customStyles } from './custom-styles';

import styles from './styles.module.scss';

export const ViewedModal = () => {
  const [movie, setMovie] = useState<IMovie>();
  const [view, setView] = useState<IViewed>();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const movieId = useAppSelector((state) => state.viewedModal.data?.movieId);
  const viewedId = useAppSelector((state) => state.viewedModal.data?.viewedId);
  const isOpen = useAppSelector((state) => state.viewedModal.isOpen);

  useEffect(() => {
    setView(undefined);
    if (!movieId) {
      return;
    }
    setIsLoading(true);
    getMovie(movieId)
      .then((data) => {
        if (!data.error) {
          setMovie(data);
        }
      })
      .finally(() => setIsLoading(false));

    if (viewedId) {
      setIsLoading(true);
      getViewById(viewedId)
        .then((data) => {
          if (!data.error) {
            setView(data);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [movieId, viewedId]);

  if (!isOpen) {
    return <></>;
  }

  const onClose = () => {
    dispatch(clearViewModal());
    dispatch(closeViewModal());
  };

  const renderModal = () => {
    if (!movie || (!view && viewedId)) {
      return <div>Error</div>;
    }

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel={viewedId ? 'Edit view' : 'Create view'}
        style={customStyles}
        appElement={document.getElementById('root') as HTMLElement}
      >
        <ViewedForm movie={movie} viewed={view} />
      </Modal>
    );
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? <Spinner /> : renderModal()}
    </div>
  );
};

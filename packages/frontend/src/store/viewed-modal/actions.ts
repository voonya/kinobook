import { createAction } from '@reduxjs/toolkit';

interface IOpenVieweModal {
  movieId: string;
  viewedId?: string;
}

export enum ViewModalActions {
  OPEN = 'VIEW_MODAL_OPEN',
  CLOSE = 'VIEW_MODAL_CLOSE',
}

const openViewModal = createAction(
  ViewModalActions.OPEN,
  (data: IOpenVieweModal) => ({ payload: { ...data } }),
);

const closeViewModal = createAction(ViewModalActions.CLOSE);

export { openViewModal, closeViewModal };

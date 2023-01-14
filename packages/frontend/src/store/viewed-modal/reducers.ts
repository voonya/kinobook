import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { openViewModal, closeViewModal, clearViewModal } from './actions';

type ViewModalData = { movieId: string; viewedId?: string };

export interface ViewModalState {
  data: ViewModalData;
  isOpen: boolean;
}

const data = createReducer<ViewModalData | null>(null, {
  [openViewModal.type]: (_, { payload }) => payload,
  [closeViewModal.type]: () => null,
  [clearViewModal.type]: () => null,
});

const isOpen = createReducer(false, {
  [openViewModal.type]: () => true,
  [closeViewModal.type]: () => false,
});

export const viewModalReducer = combineReducers({
  data,
  isOpen,
});

// src/app/reducers/index.ts
import { combineReducers } from 'redux';
import { postReducer } from './posts';
import type { RootState } from './state';
export type { RootState } from './state';

export const rootReducer = combineReducers<RootState>({
  posts: postReducer
});
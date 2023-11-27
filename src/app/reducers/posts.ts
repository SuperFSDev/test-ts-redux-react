// src/app/reducers/posts.ts
import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { PostActions } from '../actions/posts';
import { IPost } from '../index';

const initialState: RootState.PostState = [];

export const postReducer = handleActions<RootState.PostState, IPost[]>(
  {
    [PostActions.Type.SET_POSTS]: (state, action) => {
      if (Array.isArray(action.payload)) {
        return [...action.payload];
      }
      return state;
    },
    [PostActions.Type.ADD_POST]: (state, action) => {
      if (Array.isArray(action.payload)) {
        return [...action.payload, ...state];
      }
      return state;
    },
  },
  initialState
);
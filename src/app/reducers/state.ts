// src/app/reducers/state.ts
import { IPost } from '../index';

export interface RootState {
  posts: RootState.PostState;
  router?: any;
}

export namespace RootState {
  export type PostState = IPost[];
}
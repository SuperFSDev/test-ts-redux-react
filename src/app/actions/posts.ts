// src/app/actions/posts.ts
import { createAction } from 'redux-actions';
import { IPost } from '../index';

export namespace PostActions {
  export enum Type {
    SET_POSTS = 'SET_POSTS',
    ADD_POST = 'ADD_POST',
  }

  export const setPosts = createAction<IPost[]>(Type.SET_POSTS);
  export const addPost = createAction<IPost>(Type.ADD_POST);
}

// api.ts
import axios from 'axios';

const BASE_URL = 'https://graphqlzero.almansi.me/api';

export const getPosts = async () => {
  try {
    const response = await axios.post(BASE_URL, {
      query: `
        query {
          posts {
            data {
              id
              title
              body
            }
          }
        }
      `
    });
    return response.data.data.posts.data;
  } catch (error) {
    console.error('Error retrieving posts:', error);
    return [];
  }
};

export const createPost = async (title: string, body: string) => {
  try {
    const response = await axios.post(BASE_URL, {
      query: `
        mutation {
          createPost(input: {
            title: "${title}",
            body: "${body}"
          }) {
            id
            title
            body
          }
        }
      `
    });
    return response.data.data.createPost;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
};


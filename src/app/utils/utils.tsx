// Define formatPosts function to format the posts data
export const formatPosts = (posts:any[]) => {
    return posts.map((post) => {
      return {
        id: post.id,
        title: post.title,
        body: post.body,
      };
    });
  };
  
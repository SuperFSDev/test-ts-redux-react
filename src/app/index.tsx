import { useState, useEffect } from 'react';
import { getPosts, createPost } from './api';
import { formatPosts } from './utils/utils';
import { useDispatch } from 'react-redux';
import { PostActions } from './actions/posts';
import { useSelector } from 'react-redux';
import { RootState } from './reducers/state';

export interface IPost{
  id: string
  title: string
  body: string
}

export const App = (() => {
  // Define state variables
  const posts = useSelector((state: RootState) => state.posts);
  const [newPosts, setNewPosts] = useState<Omit<IPost, 'id'>[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      const formattedPosts = formatPosts(response);
      dispatch(PostActions.setPosts(formattedPosts));
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Add new post to the list of new posts
  const addNewPost = (title: string, body: string) => {
    const newPost = { title, body };
    setNewPosts([...newPosts, newPost]);
    setTitle('')
    setBody('')
  };

  // Upload all new posts to the server
  const uploadPosts = async () => {
    setIsUploading(true);
    try {
      await Promise.all(newPosts.map(async post => {
        try {
          const createdPost = await createPost(post.title, post.body);
          if (createdPost) {
            dispatch(PostActions.addPost(createdPost));
          }
        } catch (error) {
          console.error('Error creating post:', error);
        }
      }));
      setNewPosts([]);
      fetchPosts();
    } catch (error) {
      console.error('Error uploading posts:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Render the app
  return (
    <div className="container mx-auto p-7">
      <h1 className="text-4xl font-bold mb-4">Blog Post Manager</h1>
      <div className='flex flex-col w-full bg-white p-3 rounded-lg mt-2'>
        <h2 className="text-2xl font-bold mb-2">Posts</h2>
        {posts.map(post => (
          <div key={post.id} className="mb-4">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <div className='flex flex-col w-full bg-white p-3 rounded-lg mt-2'>
        <h2 className="text-2xl font-bold mb-2">New Posts</h2>
        {newPosts.map((post, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-bold underline">{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
          <div className='flex justify-end'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={uploadPosts} disabled={isUploading || newPosts.length === 0}>
              {isUploading ? 'Uploading...' : 'Upload Posts'}
            </button>
          </div>
      </div>
     
      <div className='felx flex-col w-full bg-white p-3 rounded-lg mt-2'>
        <h2 className="text-2xl font-bold mb-2">Add Post</h2>
        <input className="flex w-full border border-gray-400 rounded py-2 px-4 mb-2" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="flex w-full border border-gray-400 rounded py-2 px-4 mb-2" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
        <div className='flex w-full justify-end'>
          <button className="flex self-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addNewPost(title, body)}>Add Post</button>
        </div>
      </div>
    </div>
  );
}
);
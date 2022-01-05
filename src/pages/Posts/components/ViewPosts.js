import useAuth from '../../../common/hooks/useAuth';
import PostPanel from './PostPanel';
import { ax } from '../../../common/config/axios/axiosConfig';
import { useState, useEffect } from 'react';

const ViewPosts = () => {
  const { authState } = useAuth();
  const [posts, setPosts] = useState([]);
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let response;
      if (authState.role === 'admin') {
        response = await ax.get('/posts');
      } else {
        response = await ax.get(`/posts?author=${authState.user._id}`);
      }
      const publishedPosts = response.data.posts.filter(
        (post) => post.published
      );
      const unpublishedPosts = response.data.posts.filter(
        (post) => !post.published
      );
      setPosts(publishedPosts);
      setDrafts(unpublishedPosts);
    };
    fetchPosts();
  }, [authState]);

  return (
    <div>
      <div className="text-lg text-ship-cove-800 ml-2">Drafts:</div>
      {!drafts.length ? (
        <div className="ml-4">Draft list is empty.</div>
      ) : (
        <div className="flex flex-col gap-2 justify-center">
          {drafts.map((draft) => (
            <PostPanel post={draft} />
          ))}
        </div>
      )}
      <div className="text-lg text-ship-cove-800 ml-2">Posts:</div>
      {!posts.length ? (
        <div className="ml-4">Post list is empty.</div>
      ) : (
        <div className="flex flex-col gap-2 justify-center">
          {posts.map((post) => (
            <PostPanel post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPosts;

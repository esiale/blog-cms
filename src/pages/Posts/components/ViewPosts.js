import useAuth from '../../../common/hooks/useAuth';
import PostPanel from './PostPanel';
import { ax } from '../../../common/config/axios/axiosConfig';
import { useState, useEffect } from 'react';

const ViewPosts = () => {
  const { authState } = useAuth();
  const [loadPosts, setLoadPosts] = useState(true);
  const [posts, setPosts] = useState([]);
  const [drafts, setDrafts] = useState([]);

  const publishPost = async (postId, boolean) => {
    try {
      await ax.put(`/posts/${postId}`, {
        published: !boolean,
      });
    } catch (err) {
      console.error(err);
    }
    setLoadPosts(true);
  };

  useEffect(() => {
    if (!loadPosts) return;
    const fetchPosts = async () => {
      let response;
      try {
        if (authState.role === 'admin') {
          response = await ax.get('/posts');
        } else {
          response = await ax.get(`/posts?author=${authState.user._id}`);
        }
      } catch (err) {
        console.error(err);
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
    setLoadPosts(false);
  }, [authState, loadPosts]);

  return (
    <div>
      <div className="text-lg text-ship-cove-800 ml-2 mb-1">Drafts:</div>
      {!drafts.length ? (
        <div className="ml-4">Draft list is empty.</div>
      ) : (
        <div className="flex flex-col gap-2 justify-center">
          {drafts.map((draft) => (
            <PostPanel post={draft} publishPost={publishPost} />
          ))}
        </div>
      )}
      <div className="text-lg text-ship-cove-800 ml-2 mb-1 mt-4">Posts:</div>
      {!posts.length ? (
        <div className="ml-4">Post list is empty.</div>
      ) : (
        <div className="flex flex-col gap-2 justify-center">
          {posts.map((post) => (
            <PostPanel post={post} publishPost={publishPost} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPosts;

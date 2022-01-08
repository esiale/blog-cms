import { Routes, Route } from 'react-router-dom';
import ViewPosts from './components/ViewPosts';
import NewPost from './components/NewPost';

const Posts = () => {
  return (
    <Routes>
      <Route path="" element={<ViewPosts />} />
      <Route path="new" element={<NewPost />} />
      <Route path="new/:postId" element={<NewPost />} />
    </Routes>
  );
};

export default Posts;

import format from 'date-fns/format';
import { v4 as uuidv4 } from 'uuid';

const PostPanel = (props) => {
  const { post } = props;
  return (
    <div
      key={uuidv4()}
      className="max-w-screen-xl flex flex-col gap-1 bg-gray-100 p-3 rounded sm:grid sm:auto-cols-auto"
    >
      <div className="sm:col-span-2">{post.title}</div>
      <div className="sm:col-start-1">
        <div className="text-sm">by {post.author.username}</div>
        <div className="text-sm">{format(new Date(post.date), 'Pp')}</div>
        <div className="text-sm">id: {post._id}</div>
      </div>
      <div className="flex gap-1 justify-end sm:col-start-2 sm:self-end sm:justify-self-end">
        <button className="btn-hover w-24">Publish</button>
        <button className="btn-hover w-24">Edit</button>
        <button className="btn-hover w-24">Delete</button>
      </div>
    </div>
  );
};

export default PostPanel;

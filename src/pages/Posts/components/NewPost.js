import MDEditor from '@uiw/react-md-editor';
import useModal from '../../../common/hooks/useModal';
import useAuth from '../../../common/hooks/useAuth';
import { ax } from '../../../common/config/axios/axiosConfig';
import { useState, useEffect } from 'react';

const NewPost = () => {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const [view, setView] = useState('edit');
  const { addMessage } = useModal();
  const { authState } = useAuth();
  const breakpoint = 1024;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const validatePost = () => {
    if (!title.trim().length || !body.trim().length) {
      addMessage({ type: 'error', message: 'Please fill out all fields.' });
      return false;
    } else {
      return true;
    }
  };

  const saveAsDraft = async () => {
    if (!validatePost()) return;
    try {
      // ax.post('/posts/', {
      //   author: authState.user._id,
      //   title: title,
      //   body: body,
      // });
      addMessage({ type: 'success', message: 'Your draft has been saved.' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full mt-4 p-2 md:p-16 md:mt-0">
      <div className="flex justify-between align-center mb-4 gap-4 flex-col sm:flex-row">
        <div className="flex gap-2 justify-end sm:order-1">
          <button
            onClick={() => setView('edit')}
            className={`h-9 w-20 p-1 rounded-sm text-white font-bold ${
              view === 'edit' ? 'bg-ship-cove-500' : 'bg-ship-cove-200'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setView('preview')}
            className={`h-9 w-20 p-1 rounded-sm text-white font-bold ${
              view === 'preview' ? 'bg-ship-cove-500' : 'bg-ship-cove-200'
            }`}
          >
            Preview
          </button>
        </div>
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-200 rounded px-2 py-1 w-full max-w-xl focus:outline-none focus:border-ship-cove-400"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {view === 'edit' ? (
        <MDEditor
          value={body}
          onChange={setBody}
          height={560}
          preview={width < breakpoint ? 'edit' : 'live'}
          commandsFilter={(cmd) => {
            if (width > breakpoint) return cmd;
            if (/(live|edit|preview)/.test(cmd.name)) {
              return false;
            }
            return cmd;
          }}
        />
      ) : (
        <MDEditor.Markdown source={body} />
      )}
      <div className="flex gap-2 my-4">
        <button
          onClick={saveAsDraft}
          className={
            'h-9 w-32 p-1 rounded-sm text-white font-bold bg-ship-cove-500 hover:bg-ship-cove-600 transition-colors duration-200 ease-in-out'
          }
        >
          Save as a draft
        </button>
        <button
          className={
            'h-9 w-28 p-1 rounded-sm text-white font-bold bg-ship-cove-500 hover:bg-ship-cove-600 transition-colors duration-200 ease-in-out'
          }
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default NewPost;

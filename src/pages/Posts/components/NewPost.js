import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect } from 'react';

const NewPost = () => {
  const [value, setValue] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const [view, setView] = useState('edit');
  const breakpoint = 1024;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <div className="h-full mt-4 p-2 md:p-16 md:mt-0">
      <div className="flex justify-end align-center gap-2 mb-4">
        <button
          onClick={() => setView('edit')}
          className={`w-20 p-1 rounded-sm text-white font-bold ${
            view === 'edit' ? 'bg-ship-cove-500' : 'bg-ship-cove-200'
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setView('preview')}
          className={`w-20 p-1 rounded-sm text-white font-bold ${
            view === 'preview' ? 'bg-ship-cove-500' : 'bg-ship-cove-200'
          }`}
        >
          Preview
        </button>
      </div>
      {view === 'edit' ? (
        <MDEditor
          value={value}
          onChange={setValue}
          height={600}
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
        <MDEditor.Markdown source={value} />
      )}
    </div>
  );
};

export default NewPost;

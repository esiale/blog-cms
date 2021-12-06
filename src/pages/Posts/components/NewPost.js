import MDEditor from '@uiw/react-md-editor';
import useModal from '../../../common/hooks/useModal';
import useAuth from '../../../common/hooks/useAuth';
import CropImage from './CropImage';
import { ax } from '../../../common/config/axios/axiosConfig';
import { useState, useEffect } from 'react';

const NewPost = () => {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const [view, setView] = useState('edit');
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [showCropImage, setShowCropImage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
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
      ax.post('/posts/', {
        author: authState.user._id,
        title: title,
        body: body,
      });
      addMessage({ type: 'success', message: 'Your draft has been saved.' });
    } catch (err) {
      console.error(err);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setShowCropImage(true);
    }
  };

  const handleDeleteImage = () => {
    setShowPreview(false);
    setImageSrc(null);
    setCroppedImage(null);
  };

  if (showPreview)
    return (
      <div className="flex flex-col gap-5 items-center">
        <img
          className="lg:w-1/2 shadow rounded"
          src={croppedImage}
          alt="Cropped uploaded"
        />
        <div className="flex gap-2 self-start">
          <button
            className="btn-hover w-24"
            onClick={() => setShowPreview(false)}
          >
            Go back
          </button>
          <button className="btn-hover w-24" onClick={handleDeleteImage}>
            Delete
          </button>
        </div>
      </div>
    );

  if (showCropImage)
    return (
      <CropImage
        imageSrc={imageSrc}
        setCroppedImage={setCroppedImage}
        setShowCropImage={setShowCropImage}
      />
    );

  return (
    <div>
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
        <button onClick={saveAsDraft} className={'btn-hover w-32'}>
          Save as a draft
        </button>
        <input
          type="file"
          id="upload-btn"
          onChange={onFileChange}
          accept="image/*"
          hidden
        />
        <label
          className={'btn-hover w-32 flex items-center justify-center'}
          for="upload-btn"
        >
          Upload Image
        </label>
        {croppedImage ? (
          <button
            className={'btn-hover w-32'}
            onClick={() => setShowPreview(true)}
          >
            Preview Image
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default NewPost;

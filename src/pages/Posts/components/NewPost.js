import MDEditor from '@uiw/react-md-editor';
import useModal from '../../../common/hooks/useModal';
import useAuth from '../../../common/hooks/useAuth';
import CropImage from './CropImage';
import processFileUpload from '../../../common/utils/uploadImageUtils';
import { useParams } from 'react-router-dom';
import { ax } from '../../../common/config/axios/axiosConfig';
import { useState, useEffect } from 'react';

const NewPost = () => {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const [view, setView] = useState('edit');
  const [imageData, setImageData] = useState(null);
  const [showCropImage, setShowCropImage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { postId } = useParams();
  const { addMessage } = useModal();
  const { authState } = useAuth();
  const breakpoint = 1024;

  const validatePost = () => {
    if (!title.trim().length || !body.trim().length) {
      addMessage({ type: 'error', message: 'Please fill out all fields.' });
      return false;
    } else if (!imageData) {
      addMessage({ type: 'error', message: 'Image is required.' });
      return false;
    } else {
      return true;
    }
  };

  const saveAsDraft = async () => {
    if (!validatePost()) return;
    if (postId) {
      try {
        const response = await ax.get(`/posts/${postId}`);
        const updatedPost = {
          ...(response.data.title !== title || { title }),
          ...(response.data.body !== body || { body }),
          ...(imageData.image.search('blob:') !== -1 || {
            imageUrl: await processFileUpload(imageData.image),
          }),
        };
        if (Object.keys(updatedPost).length === 0)
          return addMessage({
            type: 'error',
            message: 'No changes were made.',
          });
        await ax.put(`/posts/${postId}`, updatedPost);
        addMessage({ type: 'success', message: 'Your post has been updated.' });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const location = await processFileUpload(imageData.image);
        await ax.post('/posts/', {
          author: authState.user._id,
          title: title,
          body: body,
          imageUrl: location,
        });
        addMessage({ type: 'success', message: 'Your draft has been saved.' });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      if (file.size > 5242880) {
        return addMessage({
          type: 'error',
          message: 'File is larger than 5mbs.',
        });
      } else if (
        file.type !== 'image/png' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg'
      ) {
        return addMessage({
          type: 'error',
          message: 'Accepted file types are: PNG, JPG and JPEG.',
        });
      }
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let image = await readFile(file);
      setImageData({
        name: file.name,
        type: file.type,
        size: file.size,
        image,
      });
      setShowCropImage(true);
    }
  };

  const handleDeleteImage = () => {
    setShowPreview(false);
    setImageData(null);
  };

  const resetForm = () => {
    setTitle('');
    setBody('');
    setImageData(null);
  };

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    if (!postId) return resetForm();
    const fetchPost = async (postId) => {
      const response = await ax.get(`/posts/${postId}`);
      setTitle(response.data.title);
      setBody(response.data.body);
      setImageData({ image: response.data.imageUrl });
    };
    fetchPost(postId);
  }, [postId]);

  if (showPreview)
    return (
      <div className="flex flex-col gap-5 items-center">
        <img
          className="lg:w-1/2 shadow rounded"
          src={imageData.image}
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
        imageData={imageData}
        setImageData={setImageData}
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
          value={title}
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
          {postId ? 'Update Post' : 'Save as a draft'}
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
          htmlFor="upload-btn"
        >
          Upload Image
        </label>
        {imageData ? (
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

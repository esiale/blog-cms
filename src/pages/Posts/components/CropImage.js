import Cropper from 'react-easy-crop';
import getCroppedImage from '../../../common/utils/canvasUtils';
import { useState, useCallback } from 'react';

const CropImage = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const { imageSrc, setCroppedImage, setShowCropImage } = props;

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const processImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
      setShowCropImage(false);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, setCroppedImage, setShowCropImage]);

  const goBack = () => {
    setCroppedImage(null);
    setShowCropImage(false);
  };

  return (
    <div className="h-full flex flex-col gap-5">
      <div className="h-1/4 sm:h-1/2 lg:h-2/3 xl:h-full relative">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          classes={'w-full'}
        />
      </div>
      <input
        type="range"
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        onChange={(e) => setZoom(e.target.value)}
      />
      <div className="flex gap-2">
        <button className={'btn-hover w-20'} onClick={() => processImage()}>
          Done
        </button>
        <button className={'btn-hover w-20'} onClick={goBack}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default CropImage;

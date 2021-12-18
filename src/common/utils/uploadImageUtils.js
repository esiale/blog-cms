import { ax } from '../config/axios/axiosConfig';

const uploadFile = async (file, fileName, signedRequest, url) => {
  const blob = await fetch(file.image).then((result) => {
    return result.blob();
  });
  const imageFromBlob = new File([blob], fileName);
  await ax.put(signedRequest, imageFromBlob, {
    transformRequest: (data, headers) => {
      delete headers.common['Authorization'];
      return data;
    },
  });
  return url;
};

const getSignedRequest = async (file) => {
  const response = await ax.get(
    `/sign-s3?file-type=${file.type}&file-size=${file.size}`
  );
  const imageUrl = await uploadFile(
    file,
    response.data.signedRequest,
    response.data.url
  );
  return imageUrl;
};

export default getSignedRequest;

import { ax } from '../config/axios/axiosConfig';
import { v4 as uuidv4 } from 'uuid';

const getLocationFromXmlResponse = (response) => {
  const parser = new DOMParser();
  const parsedResponse = parser.parseFromString(response.data, 'text/xml');
  const location =
    parsedResponse.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
  return location;
};

const uploadFileToS3 = async (presignedPostData, file) => {
  const formData = new FormData();
  Object.keys(presignedPostData.data.fields).forEach((key) => {
    formData.append(key, presignedPostData.data.fields[key]);
  });
  formData.append('file', file);
  return ax.post(presignedPostData.data.url, formData, {
    transformRequest: (data, headers) => {
      delete headers.common['Authorization'];
      return data;
    },
  });
};

const getPresignedPostData = async (file) => {
  return ax.post('sign-s3', {
    name: file.name,
    type: file.type,
  });
};

const convertBlobUrlToFile = async (file) => {
  const blob = await fetch(file).then((result) => {
    return result.blob();
  });
  const fileName = uuidv4();
  return new File([blob], fileName, {
    type: blob.type,
  });
};

const processFileUpload = async (file) => {
  const fileToUpload = await convertBlobUrlToFile(file);
  const presignedPostData = await getPresignedPostData(fileToUpload);
  const response = await uploadFileToS3(presignedPostData, fileToUpload);
  const location = getLocationFromXmlResponse(response);
  return location;
};

export default processFileUpload;

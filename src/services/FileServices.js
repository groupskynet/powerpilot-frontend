import axios from 'axios';

const FileService = {};

FileService.get = async (path) => {
  const { data } = await axios.post('file', { path });
  return data;
};

export default FileService;

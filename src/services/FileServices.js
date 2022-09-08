import axios from 'axios';

const FileService = {};

FileService.get = async (path) => {
  const { data } = await axios.post('http://localhost:8000/api/file', { path });
  return data;
};

export default FileService;

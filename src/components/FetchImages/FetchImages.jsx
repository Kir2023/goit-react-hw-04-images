import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchImages = async ({ query, page }) => {
  const response = await axios.get(
    `/?q=${query}&key=39461021-b78f7fcf8709cf48607b82d85&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
  console.log(response.data);
  return response.data;
};

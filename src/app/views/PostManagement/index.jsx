import { Box } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Posts } from './Posts';

const PostManagementPage = () => {
  const [dataPosts, setDataPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const jsonData = await response.json();
      setDataPosts(jsonData);
    };
    fetchPost();
  }, []);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {dataPosts.length > 0 && <Posts tableData={dataPosts} />}
    </Box>
  );
};

export default PostManagementPage;

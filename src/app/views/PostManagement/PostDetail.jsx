import { Box, Grid, Modal, Typography } from '@mui/material';

const DetailProductModal = ({ isOpen, onClose, product }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">Product's detail</h2>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography as="b">User ID</Typography>
            <br />
            <Typography as="b">Title</Typography>
            <br />
            <Typography as="b">Body</Typography>
            <br />
          </Grid>
          <Grid xs={6}>
            <Typography as="b">{product.userId}</Typography>
            <br />
            <Typography as="b">{product.title}</Typography>
            <br />
            <Typography as="b">{product.body}</Typography>
            <br />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DetailProductModal;

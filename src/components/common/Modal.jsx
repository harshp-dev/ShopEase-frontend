import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, Box } from '@mui/material';
import Form from './Form';
import Button from './Button';

const Modal = ({
  open,
  onClose,
  mode,
  type,
  title,
  onSubmit,
  confirmMessage,
  confirmButtonLabel = 'Delete',
  initialData = {},
}) => {
  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.25rem' }}> {title}</DialogTitle>
        <DialogContent>
          {mode === 'form' && (
            <Box sx={{ mt: 1 }}>
              <Form type={type} defaultValues={initialData} onSubmit={handleFormSubmit} />
            </Box>
          )}

          {mode === 'confirm' && <Typography>{confirmMessage}</Typography>}
        </DialogContent>
        {mode === 'confirm' && (
          <DialogActions>
            <Button label="Cancel" onClick={onClose} />
            <Button label={confirmButtonLabel} variant="contained" onClick={onSubmit} />
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};
export default Modal;

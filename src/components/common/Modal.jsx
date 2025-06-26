import { Dialog, DialogContent, DialogTitle, DialogActions, Typography } from '@mui/material';
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
      <Dialog open={open} onClose={onClose}>
        <DialogTitle> {title}</DialogTitle>
        <DialogContent>
          {mode === 'form' && (
            <Form type={type} defaultValues={initialData} onSubmit={handleFormSubmit} />
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

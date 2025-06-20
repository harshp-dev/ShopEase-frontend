import { TextField } from '@mui/material';

const InputField = ({
  name,
  label,
  type = 'text',
  disabled = false,
  register,
  error,
  helperText,
  required = true,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      disabled={disabled}
      error={!!error}
      helperText={helperText}
      {...register(name, required ? { required: `${label} is required` } : {})}
    />
  );
};

export default InputField;

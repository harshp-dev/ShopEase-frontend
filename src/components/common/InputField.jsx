import { MenuItem, TextField } from '@mui/material';

const InputField = ({
  name,
  label,
  type = 'text',
  disabled = false,
  register,
  error,
  helperText,
  required = true,
  options = [],
}) => {
  if (type === 'select') {
    return (
      <TextField
        select
        label={label}
        type={type}
        disabled={disabled}
        error={!!error}
        helperText={helperText}
        {...register(name, required ? { required: `${label} is required` } : {})}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
  if (type === 'file') {
    return (
      <input
        type="file"
        accept="image/*"
        disabled={disabled}
        {...register(name, {
          required: required ? `${label} is required` : false,
          validate: {
            isImage: (files) => {
              if (files.length === 0) {
                return true;
              }
              const file = files[0];
              return file.type.startsWith('image/') || 'Only image files are allowed';
            },
          },
        })}
      />
    );
  }
  return (
    <TextField
      label={label}
      type={type}
      disabled={disabled}
      error={!!error}
      helperText={helperText}
      fullWidth
      {...register(name, required ? { required: `${label} is required` } : {})}
    />
  );
};

export default InputField;

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
  multiple = false,
  defaultValue,
}) => {
  if (type === 'select') {
    return (
      <TextField
        select
        label={label}
        disabled={disabled}
        error={!!error}
        helperText={helperText}
        fullWidth
        defaultValue={defaultValue || ''}
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
      <div>
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          disabled={disabled}
          {...register(name, {
            required: required ? `${label} is required` : false,
            validate: {
              areImages: (files) => {
                if (!files || files.length === 0) {
                  return required ? 'At least one image is required' : true;
                }
                if (!multiple) {
                  const file = files[0];
                  return file.type.startsWith('image/') || 'Only image files are allowed';
                }
                return (
                  Array.from(files).every((file) => {
                    file.type.startsWith('image/');
                  }) || 'Only image files are allowed'
                );
              },
              fileCount: (files) => {
                if (!multiple && files && files.length > 1) {
                  return 'Only one image is allowed';
                }
                return true;
              },
            },
          })}
        />
        {error && <p style={{ color: 'red' }}>{helperText}</p>}
      </div>
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
      defaultValue={defaultValue || ''}
      {...register(name, required ? { required: `${label} is required` } : {})}
    />
  );
};

export default InputField;

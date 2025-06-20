import { useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { formtypes } from '../../constants/formTypes';
import Button from './Button';
import InputField from './InputField';

const Form = ({ type, onSubmit }) => {
  const formConfig = formtypes[type];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    console.log(`${type} form submitted`, data);
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={2}>
        {formConfig.fields.map((field) => (
          <InputField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            disabled={field.disabled}
            register={register}
            error={errors[field.name]}
            helperText={errors[field.name]?.message}
          />
        ))}
        <Button type="submit" label="Submit" />
      </Stack>
    </form>
  );
};

export default Form;

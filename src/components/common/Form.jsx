import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormTypes } from '../../constants/formTypes';
import Button from './Button';
import InputField from './InputField';
import { yupResolver } from '@hookform/resolvers/yup';

const Form = ({ type, onSubmit, defaultValues = {} }) => {
  const formConfig = FormTypes[type];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formConfig.Schema),
    defaultValues,
  });
  //  useEffect(() => {
  //   reset(defaultValues);
  // }, [defaultValues, reset]);

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
            options={field.options}
            register={register}
            error={errors[field.name]}
            helperText={errors[field.name]?.message}
          />
        ))}
        <Button type="submit" label={formConfig.submitButtonLabel} />
      </Stack>
    </form>
  );
};

export default Form;

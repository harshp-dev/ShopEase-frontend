import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormTypes } from '../../constants/formTypes';
import Button from './Button';
import InputField from './InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';

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

  const categories = useSelector((state) => state.category.categories);
  const categoryOptions = categories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const handleFormSubmit = (data) => {
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
            options={field.name === 'category' ? categoryOptions : field.options || []}
            register={register}
            error={errors[field.name]}
            helperText={errors[field.name]?.message}
            multiple={type === 'editProduct' || type === 'addProduct' ? true : false}
            defaultValue={defaultValues[field.name] || ''}
          />
        ))}
        <Button type="submit" label={formConfig.submitButtonLabel} />
      </Stack>
    </form>
  );
};

export default Form;

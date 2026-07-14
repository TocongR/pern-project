import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const schema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().max(500).optional(),
});

const ProjectForm = ({ onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Project name" {...register('name')} error={errors.name?.message} />
      <Input label="Description (optional)" {...register('description')} error={errors.description?.message} />
      <div className="flex gap-2">
        <Button type="submit" isLoading={isSubmitting}>Create</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default ProjectForm;
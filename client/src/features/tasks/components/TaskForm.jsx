import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const schema = z.object({
  title: z.string().min(1, 'Task title is required').max(150),
  description: z.string().max(500).optional(),
});

const TaskForm = ({ onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Task title" {...register('title')} error={errors.title?.message} />
      <Input label="Description (optional)" {...register('description')} error={errors.description?.message} />
      <div className="flex gap-2">
        <Button type="submit" isLoading={isSubmitting}>Add Task</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default TaskForm;
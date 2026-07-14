import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import TaskFilterBar from './components/TaskFilterBar';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import EmptyState from '../../components/EmptyState';
import Button from '../../components/Button';

const TaskList = ({ projectId }) => {
  const {
    tasks,
    search,
    setSearch,
    status,
    setStatus,
    isLoading,
    error,
    addTask,
    editTask,
    removeTask,
  } = useTasks(projectId);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data) => {
    await addTask(data);
    setShowForm(false);
  };

  const handleStatusChange = (id, newStatus) => {
    editTask(id, { status: newStatus });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this task?')) {
      removeTask(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
        {!showForm && <Button onClick={() => setShowForm(true)}>Add Task</Button>}
      </div>

      <TaskFilterBar search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus} />

      <ErrorMessage message={error} />

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <TaskForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {isLoading ? (
        <Spinner />
      ) : tasks.length === 0 ? (
        <EmptyState
          title={search || status ? 'No matching tasks' : 'No tasks yet'}
          description={search || status ? 'Try adjusting your filters.' : 'Add your first task to this project.'}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
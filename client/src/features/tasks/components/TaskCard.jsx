import TaskStatusBadge from './TaskStatusBadge';

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-900">{task.title}</h3>
          <TaskStatusBadge status={task.status} />
        </div>
        {task.description && <p className="text-sm text-gray-500">{task.description}</p>}
      </div>
      <div className="flex items-center gap-2 ml-4">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          onClick={() => onDelete(task.id)}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
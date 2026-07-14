import SearchInput from '../../../components/SearchInput';

const TaskFilterBar = ({ search, onSearchChange, status, onStatusChange }) => {
  return (
    <div className="flex gap-3 items-center mb-4">
      <SearchInput value={search} onChange={onSearchChange} placeholder="Search tasks..." />
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="text-sm border border-gray-300 rounded-md px-3 py-2"
      >
        <option value="">All statuses</option>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
};

export default TaskFilterBar;
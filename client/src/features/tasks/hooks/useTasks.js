import { useState, useEffect, useCallback } from 'react';
import {
  getTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from '../../../api/tasksApi';
import { useDebounce } from '../../../hooks/useDebounce';

export const useTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const debouncedSearch = useDebounce(search, 400);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getTasksRequest(projectId, {
        search: debouncedSearch || undefined,
        status: status || undefined,
      });
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [projectId, debouncedSearch, status]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (data) => {
    const task = await createTaskRequest(projectId, data);
    setTasks((prev) => [task, ...prev]);
  };

  const editTask = async (id, data) => {
    const updated = await updateTaskRequest(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const removeTask = async (id) => {
    await deleteTaskRequest(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, search, setSearch, status, setStatus, isLoading, error, addTask, editTask, removeTask };
};
import { useState, useEffect, useCallback } from 'react';
import {
  getProjectsRequest,
  createProjectRequest,
  updateProjectRequest,
  deleteProjectRequest,
} from '../../../api/projectsApi';
import { useDebounce } from '../../../hooks/useDebounce';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const debouncedSearch = useDebounce(search, 400);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getProjectsRequest({ search: debouncedSearch, page, limit: 10 });
      setProjects(data.projects);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, page]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Reset to page 1 whenever the search term changes — otherwise you could be
  // stuck on page 4 of a search that only has 1 page of results.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const addProject = async (data) => {
    const project = await createProjectRequest(data);
    fetchProjects(); // simplest correct option: refetch so pagination totals stay accurate
    return project;
  };

  const editProject = async (id, data) => {
    const updated = await updateProjectRequest(id, data);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const removeProject = async (id) => {
    await deleteProjectRequest(id);
    fetchProjects();
  };

  return {
    projects,
    pagination,
    search,
    setSearch,
    page,
    setPage,
    isLoading,
    error,
    addProject,
    editProject,
    removeProject,
  };
};
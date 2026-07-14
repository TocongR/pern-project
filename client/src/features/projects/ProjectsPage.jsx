import { useState } from 'react';
import { useProjects } from './hooks/useProjects';
import ProjectCard from './components/ProjectCard';
import ProjectForm from './components/ProjectForm';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import EmptyState from '../../components/EmptyState';
import Button from '../../components/Button';
import SearchInput from '../../components/SearchInput';
import Pagination from '../../components/Pagination';

const ProjectsPage = () => {
  const {
    projects,
    pagination,
    search,
    setSearch,
    page,
    setPage,
    isLoading,
    error,
    addProject,
    removeProject,
  } = useProjects();
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data) => {
    await addProject(data);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this project? This will also delete all its tasks.')) {
      await removeProject(id);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <div className="flex gap-3 items-center">
          <SearchInput value={search} onChange={setSearch} placeholder="Search projects..." />
          {!showForm && <Button onClick={() => setShowForm(true)}>New Project</Button>}
        </div>
      </div>

      <ErrorMessage message={error} />

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <ProjectForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {isLoading ? (
        <Spinner size="lg" />
      ) : projects.length === 0 ? (
        <EmptyState
          title={search ? 'No matching projects' : 'No projects yet'}
          description={search ? 'Try a different search term.' : 'Create your first project to get started.'}
        />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
            ))}
          </div>
          <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
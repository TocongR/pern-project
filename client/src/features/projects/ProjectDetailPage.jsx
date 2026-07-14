import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectRequest } from '../../api/projectsApi';
import TaskList from '../tasks/TaskList';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError('');
    getProjectRequest(id)
      .then(setProject)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <Spinner size="lg" />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <Link to="/projects" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Projects
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{project.name}</h1>
      {project.description && <p className="text-gray-500 mb-6">{project.description}</p>}

      <div className="mt-8">
        <TaskList projectId={id} />
      </div>
    </div>
  );
};

export default ProjectDetailPage;
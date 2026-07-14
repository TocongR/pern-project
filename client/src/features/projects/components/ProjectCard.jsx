import { Link } from 'react-router-dom';

const ProjectCard = ({ project, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
      <div>
        <Link to={`/projects/${project.id}`} className="font-medium text-gray-900 hover:text-blue-600">
          {project.name}
        </Link>
        {project.description && <p className="text-sm text-gray-500 mt-1">{project.description}</p>}
      </div>
      <button
        onClick={() => onDelete(project.id)}
        className="text-sm text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </div>
  );
};

export default ProjectCard;
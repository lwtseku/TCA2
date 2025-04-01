import React from 'react';
import { FaCheckCircle, FaTrash, FaClipboardList } from 'react-icons/fa';

interface Assignment {
  id: number;
  name: string;
  course: string;
  student: string;
  studentImage: string;
  totalPoints: number;
  passingPoints: number;
  duration: string;
  deadline: string;
  startDate: string;
  status: string;
}

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  return (
    <div className="bg-[--color-gray-bg] p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={assignment.studentImage}
          alt={assignment.student}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-bold text-[--color-orange]">{assignment.name}</h3>
          <p className="text-sm text-[--color-gray]">{assignment.course}</p>
        </div>
      </div>

      <div className="text-sm space-y-2 text-[--color-gray]">
        <p>
          <strong>Total Points:</strong> {assignment.totalPoints}
        </p>
        <p>
          <strong>Passing Points:</strong> {assignment.passingPoints}
        </p>
        <p>
          <strong>Duration:</strong> {assignment.duration}
        </p>
        <p>
          <strong>Deadline:</strong> {assignment.deadline}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-3 py-1 rounded text-xs font-semibold ${
            assignment.status === 'Completed'
              ? 'bg-[--color-green-bg] text-[--color-green]'
              : assignment.status === 'Pending'
              ? 'bg-[--color-yellow-bg] text-[--color-yellow]'
              : 'bg-[--color-blue-bg] text-[--color-blue]'
          }`}
        >
          {assignment.status}
        </span>

        <div className="flex space-x-2">
          <button className="text-[--color-green] hover:text-green-600">
            <FaCheckCircle />
          </button>
          <button className="text-[--color-blue] hover:text-blue-600">
            <FaClipboardList />
          </button>
          <button className="text-[--color-red] hover:text-red-600">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;

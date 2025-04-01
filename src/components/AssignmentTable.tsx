import React from 'react';

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

interface AssignmentTableProps {
  assignments: Assignment[];
}

const AssignmentTable: React.FC<AssignmentTableProps> = ({ assignments }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto w-full">
      <table className="w-full text-left border-collapse text-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-lg">
            <th className="p-4">Assignment Name</th>
            <th className="p-4">Student</th>
            <th className="p-4">Total Points</th>
            <th className="p-4">Passing Points</th>
            <th className="p-4">Duration</th>
            <th className="p-4">Date</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id} className="hover:bg-gray-50 transition duration-200">
              <td className="p-4">
                <div className="font-bold text-[--color-orange] text-xl">{assignment.name}</div>
                <div className="text-sm text-[--color-gray]">{assignment.course}</div>
              </td>
              <td className="p-4 flex items-center space-x-3">
                <img
                  src={assignment.studentImage}
                  alt={assignment.student}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-[--color-gray] text-lg">{assignment.student}</span>
              </td>
              <td className="p-4 text-[--color-gray] text-lg">{assignment.totalPoints}</td>
              <td className="p-4 text-[--color-gray] text-lg">{assignment.passingPoints}</td>
              <td className="p-4 text-[--color-gray] text-lg">{assignment.duration}</td>
              <td className="p-4 text-[--color-gray] text-lg">
                <div className="text-lg">Deadline: {assignment.deadline}</div>
                <div className="text-sm text-gray-500">Started {assignment.startDate}</div>
              </td>
              <td className="p-4 space-x-3">
                <button className="bg-[--color-blue] text-white text-lg px-4 py-2 rounded-lg hover:bg-blue-600">
                  Evaluate
                </button>
                <button className="bg-[--color-red] text-white text-lg px-4 py-2 rounded-lg hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;

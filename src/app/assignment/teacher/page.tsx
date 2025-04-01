'use client';
import { useState } from 'react';
import AssignmentTable from '@/components/AssignmentTable';
import AssignmentFilter from '@/components/AssignmentFilter';
import TabNav from '@/components/TabNav';

const initialAssignments = [
  {
    id: 1,
    name: 'Midterm Assignment',
    course: 'Wordpress for Beginners - Master Wordpress',
    student: 'Simon',
    studentImage: '/images/student1.png',
    totalPoints: 50,
    passingPoints: 25,
    duration: '2 weeks',
    deadline: 'December 19, 2022',
    startDate: 'December 5, 2022, 8:14 am',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Bonus Assignment',
    course: 'Wordpress for Beginners - Master Wordpress',
    student: 'Simon',
    studentImage: '/images/student1.png',
    totalPoints: 10,
    passingPoints: 10,
    duration: '2 days',
    deadline: 'December 7, 2022',
    startDate: 'December 5, 2022, 8:11 am',
    status: 'Pass',
  },
  {
    id: 3,
    name: 'Assignment 1',
    course: 'Secret to Master Perfect Diet & Meal Plan',
    student: 'Simon',
    studentImage: '/images/student1.png',
    totalPoints: 25,
    passingPoints: 25,
    duration: '2 weeks',
    deadline: 'December 19, 2022',
    startDate: 'December 5, 2022, 8:07 am',
    status: 'Fail',
  },
];

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [activeTab, setActiveTab] = useState('All');

  // Filter assignments based on selected tab
  const filterAssignments = assignments.filter((assignment) => {
    if (activeTab === 'All') return true;
    return assignment.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-[--color-default-bg] p-6 text-[--color-gray]">
      <div className="w-full mx-auto px-6">
        <h1 className="text-4xl font-bold text-[--color-orange] mb-8">Assignments</h1>

        {/* Tab Navigation */}
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Filter Section */}
        <AssignmentFilter />

        {/* Assignment Table */}
        <AssignmentTable assignments={filterAssignments} />
      </div>
    </div>
  );
}

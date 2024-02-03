'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import React, { useContext, useEffect, useState } from 'react';
import SubjectDisplay from '../faculty/[subject]/SubjectDisplay';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Branch = ({ params }) => {
  const router = useRouter();
  const { jwt } = useContext(AuthContext);
  const [subjects, setSubjects] = useState<any>();

  useEffect(
    function () {
      async function fetchData() {
        if (!jwt) {
          return;
        }
        const req = await fetch(
          `http://localhost:3000/api/v1/note-nestle/subjects?branch=${params.branch}&fields=_id,name`,
          {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = await req.json();
        setSubjects(data.data);
      }
      fetchData();
    },
    [jwt, params]
  );

  function getName(branch: string) {
    switch (branch) {
      case 'CSE':
        return 'Computer Science and Engineering';
      case 'ECE':
        return 'Electronics and Communication Engineering';
      case 'EEE':
        return 'Electrical and Electronics Engineering';
      case 'AE':
        return 'Aeronautical Engineering';
      case 'ME':
        return 'Mechanical Engineering';
      case 'CV':
        return 'Civil Engineering';
      case 'PHY':
        return 'Physics';
      case 'CHEM':
        return 'Chemistry';
      case 'MAT':
        return 'Mathematics';
      default:
        return 'Branch not found';
    }
  }

  console.log(subjects);
  return (
    <div className="container sm:container py-[4rem]">
      <div className="flex items-center justify-between">
        <h2 className="text-[2.5rem] font-fontPrimary leading-[1.2]">
          {getName(params.branch)}
        </h2>
        <Button onClick={() => router.push('/')}>Back</Button>
      </div>
      <div className="py-[3rem] grid lg:grid-cols-4  gap-[1.5rem] ">
        {subjects && subjects.length > 0 ? (
          subjects.map((subject) => (
            <SubjectDisplay
              key={subject._id}
              link={`${params.branch}/${subject._id}`}
              name={subject.name}
            />
          ))
        ) : (
          <p>No Subjects available</p>
        )}
      </div>
    </div>
  );
};

export default Branch;

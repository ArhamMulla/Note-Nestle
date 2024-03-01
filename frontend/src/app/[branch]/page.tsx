'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import { useContext, useState } from 'react';
import SubjectDisplay from '../faculty/[subject]/SubjectDisplay';

import Search from '@/components/Search';
import { Button } from '@/components/ui/button';
import { getBranchSubjects } from '@/services/apiBranches';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const Branch = ({ params }) => {
  const router = useRouter();
  const { jwt } = useContext<any>(AuthContext);
  const { data: subjects, isFetching } = useQuery({
    queryKey: [`branch-${params.branch}`],
    queryFn: () => getBranchSubjects(jwt, params.branch),
    enabled: Boolean(jwt),
  });
  const [finalList, setFinalList] = useState<any>();

  function getName(branch: string) {
    switch (branch) {
      case 'CSE':
        return 'Computer Science and Engineering';
      case 'ECE':
        return 'Electronics and Communication Engineering';
      case 'ISE':
        return 'Information Science and Engineering';
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
      case 'CHE':
        return 'Chemistry';
      case 'MAT':
        return 'Mathematics';
      default:
        return 'Branch not found';
    }
  }

  // if (isFetching) {
  //   return (
  //     <div className="container flex-grow py-[3rem]">
  //       <Loader2 className="mr-2 h-8 w-8 animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <div className="container flex-grow py-[3rem]">
      <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
        <h2 className="text-[2.5rem] font-fontPrimary leading-[1.2] text-center">
          {getName(params.branch)}
        </h2>
        <div className="flex gap-5">
          <div className="w-[265px]">
            {' '}
            <Search subjects={subjects} setFinalList={setFinalList} />
          </div>

          <Button onClick={() => router.push('/')}>Back</Button>
        </div>
      </div>
      <div className="py-[2rem] grid lg:grid-cols-4  gap-[1.5rem]">
        {isFetching ? (
          <Loader2 className="mr-2 h-12 w-12 animate-spin" />
        ) : subjects && subjects.length > 0 ? (
          (finalList && finalList.length > 0 ? finalList : subjects).map(
            (subject) => (
              <SubjectDisplay
                key={subject._id}
                link={`${params.branch}/${subject._id}`}
                name={subject.name}
              />
            )
          )
        ) : (
          <p className="text-[1.2rem]">No Subjects available</p>
        )}
      </div>
      <Toaster toastOptions={{ duration: 5000 }} />
    </div>
  );
};

export default Branch;

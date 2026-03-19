'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

const TeacherForm = dynamic(() => import('./forms/TeacherForm'), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import('./forms/StudentForm'), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type: 'create' | 'update', data?: any) => JSX.Element;
} = {
  teacher: (type, data) => (
    <TeacherForm type={type as 'create' | 'update'} data={data} />
  ),
  student: (type, data) => (
    <StudentForm type={type as 'create' | 'update'} data={data} />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | 'teacher'
    | 'student'
    | 'parent'
    | 'subject'
    | 'class'
    | 'lesson'
    | 'exam'
    | 'assignment'
    | 'result'
    | 'attendance'
    | 'event'
    | 'announcement';
  type: 'create' | 'update' | 'delete';
  data?: any;
  id?: number | string;
}) => {
  const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7';
  const bgColor =
    type === 'create'
      ? 'bg-lamaYellow'
      : type === 'update'
        ? 'bg-lamaSky'
        : 'bg-lamaPurple';

  const [open, setOpen] = useState(false);

  const Form = () => {
    if (type === 'delete' && id) {
      return (
        <form className="flex flex-col gap-4 my-4">
          <span className="text-left font-medium">
            Are you sure want to delete this row from{' '}
            <b className="capitalize">{table}s</b> table?
          </span>
          <button className="bg-red-700 text-white rounded-md py-2 px-4 border-none w-max self-center">
            Delete
          </button>
        </form>
      );
    }

    return forms[table](type as 'create' | 'update', data);
  };
  return (
    <>
      <button
        className={`${size} ${bgColor} rounded-full grid place-items-center p-1`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt={type} width={16} height={16} />
      </button>

      {open && (
        <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-60 z-50 grid place-items-center">
          <div className="bg-white p-4 rounded-md w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 hover:text-black w-7 h-7 grid place-items-center"
            >
              <Image src="/close.png" alt="close" width={14} height={14} />
            </button>
            <Form />
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;

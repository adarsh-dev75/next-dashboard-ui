import FormModal from '@/components/FormModal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { ITEM_PER_PAGE } from '@/lib/constants';
import { role, teachersData } from '@/lib/data';
import prisma from '@/lib/prisma';
import { Class, Prisma, Subject, Teacher } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'Teacher Id',
    accessor: 'teacherId',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Subjects',
    accessor: 'subjects',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Classes',
    accessor: 'classes',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Phone',
    accessor: 'phone',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Address',
    accessor: 'address',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
];

const renderRow = (item: TeacherList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img || '/noAvatar.png'}
        alt="photo"
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">
      {item.subjects.map((item) => item.name).join(', ')}
    </td>
    <td className="hidden md:table-cell">
      {item.classes.map((item) => item.name).join(', ')}
    </td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="bg-lamaSky grid place-items-center w-7 h-7 rounded-full">
            <Image src="/view.png" alt="view" width={16} height={16} />
          </button>
        </Link>

        {role === 'admin' && (
          <FormModal type="delete" table="teacher" id={item.id} />
        )}
      </div>
    </td>
  </tr>
);

const TeachersList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const currentPage = page ? Number(page) : 1;

  const query: Prisma.TeacherWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'classId':
            query.lessons = {
              some: { classId: parseInt(value) },
            };
            break;

          case 'search':
            query.name = { contains: value, mode: 'insensitive' };
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (currentPage - 1),
    }),
    prisma.teacher.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex gap-4 self-end">
            <button className="bg-lamaYellow w-8 h-8 rounded-full grid place-items-center p-1">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="bg-lamaYellow w-8 h-8 rounded-full grid place-items-center p-1">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === 'admin' && (
              // <button className="bg-lamaYellow w-8 h-8 rounded-full grid place-items-center p-1">
              //     <Image src="/create.png" alt="filter" width={14} height={14}/>
              // </button>
              <FormModal type="create" table="teacher" />
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* PAGINATION */}
      <Pagination page={currentPage} count={count} />
    </div>
  );
};

export default TeachersList;

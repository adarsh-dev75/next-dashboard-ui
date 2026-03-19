import FormModal from '@/components/FormModal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { ITEM_PER_PAGE } from '@/lib/constants';
import { classesData, parentsData, role } from '@/lib/data';
import prisma from '@/lib/prisma';
import { Class, Prisma, Teacher } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

type ClassList = Class & { supervisor: Teacher };

const columns = [
  {
    header: 'Class Name',
    accessor: 'class',
  },
  {
    header: 'Capacity',
    accessor: 'capacity',
  },
  {
    header: 'Grade',
    accessor: 'grade',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Super Visor',
    accessor: 'supervisor',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
];
const renderRow = (item: ClassList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.name}</td>
    <td>{item.capacity}</td>
    <td className="hidden md:table-cell">{item.gradeId}</td>
    <td className="hidden lg:table-cell">
      {item.supervisor.name + ' ' + item.supervisor.surname}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === 'admin' && (
          <>
            <FormModal type="update" table="class" data={item} />
            <FormModal type="delete" table="class" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ClassList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const currentPage = page ? Number(page) : 1;

  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'supervisorId':
            query.supervisorId = value;
            break;
          case 'search':
            query.name = { contains: value, mode: 'insensitive' };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (currentPage - 1),
    }),
    prisma.class.count({
      where: query,
    }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex gap-4 self-end">
            <button className="bg-lamaYellow w-8 h-8 rounded-full grid place-items-center p-1">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="bg-lamaYellow w-8 h-8 rounded-full grid place-items-center p-1">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === 'admin' && <FormModal type="create" table="class" />}
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

export default ClassList;

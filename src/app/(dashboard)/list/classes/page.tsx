import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { classesData, parentsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Class = {
    id: number;
    name: string;
    capacity: number;
    grade: number;
    supervisor: string;
}

const columns = [
    {
        header: "Class Name",
        accessor: "class"
    },
    {
        header: "Capacity",
        accessor: "capacity",
    },
    {
        header: "Grade",
        accessor: "grade",
        className: "hidden md:table-cell"
    },
        {
        header: "Super Visor",
        accessor: "supervisor",
        className: "hidden lg:table-cell"
    },
        {
        header: "Actions",
        accessor: "actions",
    }

]

const ClassList = () => {

  const renderRow = (item: Class) => (
    <tr key={item.id} className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-lamaPurpleLight">
        <td className="flex items-center gap-4 p-4">
          {item.name}
        </td>
        <td>{item.capacity}</td>
        <td className="hidden md:table-cell">{item.grade}</td>
        <td className="hidden lg:table-cell">{item.supervisor}</td>
        <td>
            <div className="flex items-center gap-2">
               
                {role === 'admin' && (
                    <>
                     <FormModal type="update" table="class" data={item}/>
            <FormModal type="delete" table="class" id={item.id}/>
                    </>
    
                )}
            </div>
        </td>
    </tr>
  )
 
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
        {/* TOP */}
        <div className="flex items-center justify-between">
            <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                <TableSearch/>
                <div className="flex gap-4 self-end">
                    <button className="bg-lamaYellow w-8 h-8 rounded-full grid place-items-center p-1">
                        <Image src="/filter.png" alt="filter" width={14} height={14}/>
                    </button>
                    <button className="bg-lamaYellow w-8 h-8 rounded-full grid place-items-center p-1">
                        <Image src="/sort.png" alt="filter" width={14} height={14}/>
                    </button>
                   {role === 'admin' && (
                    <FormModal type="create" table="class" />
                   )}
                </div>
            </div>
        </div>

        {/* List */}
        <Table columns={columns} renderRow={renderRow} data={classesData} />

        {/* PAGINATION */}
        <Pagination/>
    </div>
  )
}

export default ClassList
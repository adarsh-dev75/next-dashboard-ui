import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { assignmentsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Assignment = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
    dueDate: string;
}

const columns = [
    {
        header: "Subject Name",
        accessor: "subject"
    },
    {
        header: "Class",
        accessor: "class",
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell"
    },
    {
        header: "Due Date",
        accessor: "dueDate",
        className: "hidden md:table-cell"
    },
    {
        header: "Actions",
        accessor: "actions",
    }

]

const AssignmentList = () => {
  const renderRow = (item: Assignment) => (
    <tr key={item.id} className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-lamaPurpleLight">
        <td className="flex items-center gap-4 p-4">{item.subject}</td>
        <td>{item.class}</td>
        <td className="hidden md:table-cell">{item.teacher}</td>
        <td className="hidden md:table-cell">{item.dueDate}</td>
        <td>
            <div className="flex items-center gap-2">
                
                {role === 'admin' && (
                    <>
                    <FormModal type="update" table="assignment" data={item}/>
                                    <FormModal type="delete" table="assignment" id={item.id}/>
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
            <h1 className="hidden md:block text-lg font-semibold">All Assingment</h1>
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
                     <FormModal type="create" table="assignment" />
                   )}
                </div>
            </div>
        </div>

        {/* List */}
        <Table columns={columns} renderRow={renderRow} data={assignmentsData} />

        {/* PAGINATION */}
        <Pagination/>
    </div>
  )
}

export default AssignmentList
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { assignmentsData, examsData, lessonsData, resultsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Result = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
    student: string;
    date: string;
    type: "exam" | "assignment";
    score: number
}

const columns = [
    {
        header: "Subject Name",
        accessor: "subject"
    },
    {
        header: "Student",
        accessor: "student",
    },
    {
        header: "Score",
        accessor: "score",
        className: "hidden md:table-cell"
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell"
    },
    {
        header: "Class",
        accessor: "class",
        className: "hidden md:table-cell"
    },
    {
        header: "Date",
        accessor: "date",
        className: "hidden md:table-cell"
    },
    {
        header: "Actions",
        accessor: "actions",
    }

]

const ResultList = () => {
  const renderRow = (item: Result) => (
    <tr key={item.id} className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-lamaPurpleLight">
        <td className="flex items-center gap-4 p-4">{item.subject}</td>
        <td>{item.student}</td>
        <td className="hidden md:table-cell">{item.score}</td>
        <td className="hidden md:table-cell">{item.teacher}</td>
        <td className="hidden md:table-cell">{item.class}</td>
        <td className="hidden md:table-cell">{item.date}</td>
        <td>
            <div className="flex items-center gap-2">
                

                {role === 'admin' && (
                    <>
                    <FormModal type="update" table="result" data={item}/>
                                    <FormModal type="delete" table="result" id={item.id}/>
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
            <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
                    <FormModal type="create" table="result"/>
                   )}
                </div>
            </div>
        </div>

        {/* List */}
        <Table columns={columns} renderRow={renderRow} data={resultsData} />

        {/* PAGINATION */}
        <Pagination/>
    </div>
  )
}

export default ResultList
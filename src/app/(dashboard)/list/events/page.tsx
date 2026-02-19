import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { eventsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Event = {
    id: number;
    title: string;
    class: string;
    date: string;
    startTime: string;
    endTime: string;
}

const columns = [
    {
        header: "Event Name",
        accessor: "event"
    },
    {
        header: "Class",
        accessor: "class",
    },
    {
        header: "Date",
        accessor: "date",
        className: "hidden md:table-cell"
    },
    {
        header: "Start Time",
        accessor: "startTime",
        className: "hidden md:table-cell"
    },
    {
        header: "End Time",
        accessor: "endTime",
        className: "hidden md:table-cell"
    },
    {
        header: "Actions",
        accessor: "actions",
    }

]

const EventList = () => {
  const renderRow = (item: Event) => (
    <tr key={item.id} className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-lamaPurpleLight">
        <td className="flex items-center gap-4 p-4">{item.title}</td>
        <td>{item.class}</td>
        <td className="hidden md:table-cell">{item.date}</td>
        <td className="hidden md:table-cell">{item.startTime}</td>
        <td className="hidden md:table-cell">{item.endTime}</td>
        <td>
            <div className="flex items-center gap-2">
                <Link href={`/list/teachers/${item.id}`}>
                    <button className="bg-lamaSky grid place-items-center w-7 h-7 rounded-full">
                        <Image src="/edit.png" alt="view" width={16} height={16}/>
                    </button>
                </Link>

                {role === 'admin' && (
                <button className="bg-lamaPurple grid place-items-center w-7 h-7 rounded-full">
                    <Image src="/delete.png" alt="view" width={16} height={16}/>
                </button>
                )}
            </div>
        </td>
    </tr>
  )
 
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
        {/* TOP */}
        <div className="flex items-center justify-between">
            <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
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
                     <button className="bg-lamaYellow w-8 h-8 rounded-full grid place-items-center p-1">
                        <Image src="/plus.png" alt="filter" width={14} height={14}/>
                    </button>
                   )}
                </div>
            </div>
        </div>

        {/* List */}
        <Table columns={columns} renderRow={renderRow} data={eventsData} />

        {/* PAGINATION */}
        <Pagination/>
    </div>
  )
}

export default EventList
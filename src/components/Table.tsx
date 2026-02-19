
const Table = ({columns, renderRow, data}: {columns: {header: string; accessor: string; className?: string}[]; renderRow: React.ReactNode|JSX.Element; data: any[]}) => {
  return (
    <table className='w-full mt-4'>
        <thead>
            <tr className="text-sm text-left text-gray-500 ">
                {columns.map(column => (
                <th className={`${column.className}`} key={column.accessor}>{column.header}</th>
            ))}
            </tr>
        </thead>
        <tbody>
          {data.map(item => renderRow(item))}
        </tbody>
    </table>
  )
}

export default Table
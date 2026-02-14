"use client";

import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// #region Sample data
const data = [
  {
    name: 'Mon',
    present: 60,
    absent: 40,
  },
  {
    name: 'Tue',
    present: 70,
    absent: 30,
  },
  {
    name: 'Wed',
    present: 75,
    absent: 25,
  },
  {
    name: 'Thu',
    present: 80,
    absent: 20,
  },
  {
    name: 'Fri',
    present: 60,
    absent: 40,
  },
];

const AttendenceChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* TITLE */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Attendence</h1>
                <Image src="/moreDark.png" alt='student-chart' width={20} height={20}/>
            </div>
    
            {/* CHART */}
              <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        barSize={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} color='#ddd'/>
                        <XAxis dataKey="name" axisLine={false} tick={{fill: "#d1d5db"}} tickLine={false} />
                        <YAxis width="auto" axisLine={false} tick={{fill: "#d1d5db"}} tickLine={false}/>
                        <Tooltip contentStyle={{borderRadius: "10px", borderColor: "lightgray"}}/>
                        <Legend align='left' verticalAlign='top' wrapperStyle={{paddingTop: "20px", paddingBottom: "40px"}} />
                        <Bar dataKey="present" fill="#C3EBFA" radius={[10, 10, 0, 0]} legendType='circle' />
                        <Bar dataKey="absent" fill="#FAE27C" radius={[10, 10, 0, 0]} legendType='circle' />
                    </BarChart>
              </ResponsiveContainer>
        </div>
  )
}

export default AttendenceChart
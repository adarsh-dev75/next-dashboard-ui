"use client";

import Image from 'next/image';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Total',
    count: 100,
    fill: 'white',
  },
  {
    name: 'Boys',
    count: 53,
    fill: '#C3EBFA',
  },
  {
    name: 'Girls',
    count: 47,
    fill: '#FAE27C',
  },
];

const CountChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        {/* TITLE */}
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Student</h1>
            <Image src="/moreDark.png" alt='student-chart' width={20} height={20}/>
        </div>

        {/* CHART */}
        <div className='relative w-full h-[75%]'>
          <ResponsiveContainer>
            <RadialBarChart
            cx="50%"
            cy="50%"
            barSize={32}
            data={data}
            innerRadius="40%"
            outerRadius="100%"
            >
              <RadialBar background dataKey="count" />
            </RadialBarChart>
          </ResponsiveContainer>

            <Image src="/maleFemale.png" alt='logo' width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
        </div>

        {/* BOTTOM */}
        <div className='flex justify-center gap-16'>
          <div className='grid place-items-center gap-1'>
            <div className='bg-lamaSky rounded-full w-5 h-5'/>
            <h1 className='font-bold'>1,234</h1>
            <h2 className='text-xs text-gray-300'>Boys (55%)</h2>
          </div>
          <div className='grid place-items-center gap-1'>
            <div className='bg-lamaYellow rounded-full w-5 h-5'/>
            <h1 className='font-bold'>947</h1>
            <h2 className='text-xs text-gray-300'>Girls (45%)</h2>
          </div>
        </div>
    </div>
  )
}

export default CountChart
"use client";

import Image from 'next/image';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
    {
        id: 1,
        title: "Title Event 1",
        time: "12:00 PM - 2:00 PM",
        description: "This is a description regarding title event 1"
    },
    {
        id: 1,
        title: "Title Event 2",
        time: "12:00 PM - 2:00 PM",
        description: "This is a description regarding title event 2"
    },
    {
        id: 1,
        title: "Title Event 3",
        time: "12:00 PM - 2:00 PM",
        description: "This is a description regarding title event 3"
    }
]

const EventCalender = ()  => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='bg-white p-4 rounded-md'>
      <Calendar onChange={onChange} value={value} />
      <div className='flex justify-between items-center my-4'>
        <h1 className='font-semibold text-xl'>Events</h1>
        <Image src="/moreDark.png" alt='more' width={20} height={20}/>
      </div>
      <div className='flex flex-col gap-4'>
        {events.map(event => (
            <div className='p-4 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple' key={event.id}>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold text-gray-600'>{event.title}</h1>
                    <span className='text-xs text-gray-300'>{event.time}</span>
                </div>
                <p className='mt-2 text-sm text-gray-400'>{event.description}</p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default EventCalender;
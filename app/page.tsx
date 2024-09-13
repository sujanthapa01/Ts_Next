"use client"
import React, { useState } from 'react'
import Button from './component/button'
import { set } from 'zod';

interface Type {
  saves: { count: number, color: string }[];
  count: number;

}

function Page() {
  const [count, setCount] = useState<number>(0);
  const [save, setSave] = useState<Type['saves']>([]);
  const color = {
    color1: "yellow",
    color2: "pink"
  }

  const handleCount = () => {
    setCount(prevCount => prevCount + 1);
  }

  const handleCountDown = () => {
    setCount(prevCount => prevCount - 1);
  }

  const savearr = (count: number) => {
    // Set background color based on whether count is even or odd
    const bgColor = count % 2 === 0 ? color.color1 : color.color2;


    const isCounted = save.some(items => items.count === count)

if(!isCounted) setSave(prevSave => [...prevSave, { count, color: bgColor }]);

  }

  const handleReset = () => {
    setSave([]);
  }

  return (
    <main className='flex justify-center items-center h-screen gap-[200px]' >
      <section className='flex justify-center flex-col items-center'>
        <h1 className='text-center h-12'>{count}</h1>
        <div className='flex justify-center flex-col gap-4'>
          <div className='flex gap-2'>
            <div>
              <Button
                text='up'
                onClick={handleCount}  // Corrected to onClick
                className='bg-green-300 py-2 px-5 rounded-md active:translate-y-1 duration-300 shadow-lg'
              />
            </div>
            <div>
              <Button
                text='down'
                onClick={handleCountDown}  // Corrected to onClick
                className='bg-red-300 py-2 px-5 rounded-md active:translate-y-1 duration-300 shadow-lg'
              />
            </div>
          </div>
          <Button
            text='save'
            onClick={() => savearr(count)}  // Pass count to savearr
            className='bg-sky-300 py-2 px-5 rounded-md active:translate-y-1 duration-300 shadow-lg'
          />
        </div>
      </section>

      <section className='w-[200px] '>
        <div className='h-[300px] flex flex-col gap-1 text-center overflow-y-scroll'>
          {save.map((arr, indx) => (
            <p className='bg-pink-300 rounded-xl' style={{ backgroundColor: arr.color }} key={indx}>{arr.count}</p>
          ))}
        </div>
        <Button
          text="reset"
          onClick={handleReset}  // Corrected to onClick
          className='bg-red-300 py-2 px-5 rounded-md active:translate-y-1 duration-300 shadow-lg'
        />
      </section>
    </main>
  )
}

export default Page;

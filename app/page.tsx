"use client"
import React, { useState } from 'react'
import Button from './component/button'
import Image from 'next/image';
import search from '@/app/public/search.png'

interface Type {
  saves: { count: number, color: string }[];
  count: number;
}

function Page() {
  const [count, setCount] = useState<number>(0);
  const [save, setSave] = useState<Type['saves']>([]);
  const [even, setEven] = useState<number>(0);
  const [odd, setOdd] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Type['saves']>([]);
  const [dragItem, setDragItem] = useState<number | null>(null);
  const [droppedItem, setDroppedItem] = useState<Type['saves']>([]);

  const color = {
    color1: "yellow",
    color2: "pink"
  };

  const handleCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleCountDown = () => {
    setCount(prevCount => prevCount - 1);
  };

  const savearr = (count: number) => {
    const bgColor = count % 2 === 0 ? color.color1 : color.color2;
    const evenNum = count % 2 === 0;
    const isCounted = save.some(items => items.count === count);

    if (evenNum && !isCounted) setEven(prev => prev + 1);
    if (!evenNum && !isCounted) setOdd(prev => prev + 1);

    if (!isCounted) setSave(prevSave => [...prevSave, { count, color: bgColor }]);
  };

  const handleReset = () => {
    setSave([]);
    setEven(0);
    setOdd(0);
    setSearchResult([]);
    setSearchInput('');
  };

  const handleDroppedReset = () => setDroppedItem([]);

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      alert("Please enter something to search!");
      return;
    }
    const filteredResults = save.filter(item => item.count.toString().includes(searchInput));
    setSearchResult(filteredResults);
  };

  const dragItems = (item: number) => {
    setDragItem(item);
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropItems = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragItem !== null) {
      const draggedObject = save.find(items => items.count === dragItem);
      if (draggedObject) setDroppedItem(prev => [...prev, draggedObject]);
    }
  };



  return (
    <main className='flex justify-center items-center h-screen gap-[200px]' >
      <section className='flex justify-center flex-col items-center'>
        <h1 className='text-center h-12'>{count}</h1>
        <div className='flex justify-center flex-col gap-4'>
          <div className='flex gap-2'>
            <div>
              <Button
                text='up'
                onClick={handleCount}
                className='bg-green-300 py-2 px-5 rounded-md active:translate-y-1 duration-300 shadow-lg'
              />
            </div>
            <div>
              <Button
                text='down'
                onClick={handleCountDown}
                className='bg-red-300 py-2 px-5 rounded-md active:translate-y-1 duration-300 shadow-lg'
              />
            </div>
          </div>
          <Button
            text='save'
            onClick={() => savearr(count)}
            className='bg-sky-300 py-2 px-5 rounded-md active:translate-y-1 duration-300 shadow-lg'
          />
        </div>
      </section>

      <section className='w-[300px] bg-cyan-200 flex flex-col items-center rounded-lg p-4'>
        <h1 className='px-4 py-1 rounded-full bg-orange-200 mb-4'> <span>even : {even} </span> | <span> odd : {odd}</span> </h1>

        <div className='flex items-center'>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className='search h-6 w-40 rounded-3xl border-[1px] border-black outline-none pl-2 '
          />
          <button className='p-2 hover:scale-[1.1]' onClick={handleSearch}>
            <Image alt='img' height={28} src={search}></Image>
          </button>
        </div>

        <div className='w-full flex flex-col items-center justify-center'>
          <div className='h-[300px] w-full flex flex-col gap-1 text-center overflow-y-scroll'>
            {(searchInput.trim() ? searchResult : save).map((arr, indx) => (
              <p className='bg-pink-300 rounded-xl' style={{ backgroundColor: arr.color }} key={indx} draggable onDragStart={() => dragItems(arr.count)}>
                {arr.count}
              </p>
            ))}
          </div>
          <Button
            text="reset"
            onClick={handleReset}
            className='bg-red-300 py-2 px-5 rounded-md active:translate-y-1 duration-300 shadow-lg w-[90px]'
          />
        </div>
      </section>

      <section className='w-[300px] bg-cyan-200 flex flex-col items-center rounded-lg p-4' onDragOver={dragOver} onDrop={dropItems}>
        <div className='w-full flex flex-col items-center justify-center'>
          <div className='h-[300px] w-full flex flex-col gap-1 text-center overflow-y-scroll'>
            {droppedItem.length === 0 ? (
              <div>drop item</div>
            ) : (
              droppedItem.map((item, indx) => (
                <p key={indx} className='bg-green-300 rounded-xl p-2'>
                  {item.count}
                </p>
              ))
            )}
          </div>
          <Button
            text="reset"
            onClick={handleDroppedReset}
            className='bg-red-300 py-2 px-5 rounded-md active:translate-y-1 duration-300 shadow-lg w-[90px]'
          />
        </div>
      </section>
    </main>
  )
}

export default Page;

import React from 'react'

const Story = () => {
  return (
    <div>
      <div className="flex  flex-col items-center justify-center w-screen ">
        <h1>Story</h1>
    <div className="w-screen max-w-md bg-white  p-4 rounded-lg overflow-hidden">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
                    <img src="https://via.placeholder.com/150" alt="User 1" className="w-full h-full rounded-full object-cover"/>
                </div>
                <p className="text-xs mt-1 text-center">Your Story</p>
            </div>

            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
                    <img src="https://via.placeholder.com/150" alt="User 2" className="w-full h-full rounded-full object-cover"/>
                </div>
                <p className="text-xs mt-1 text-center">John</p>
            </div>

            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
                    <img src="https://via.placeholder.com/150" alt="User 3" className="w-full h-full rounded-full object-cover"/>
                </div>
                <p className="text-xs mt-1 text-center">Alice</p>
            </div>

            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
                    <img src="https://via.placeholder.com/150" alt="User 4" className="w-full h-full rounded-full object-cover"/>
                </div>
                <p className="text-xs mt-1 text-center">David</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
                    <img src="https://via.placeholder.com/150" alt="User 4" className="w-full h-full rounded-full object-cover"/>
                </div>
                <p className="text-xs mt-1 text-center">David</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
                    <img src="https://via.placeholder.com/150" alt="User 4" className="w-full h-full rounded-full object-cover"/>
                </div>
                <p className="text-xs mt-1 text-center">David</p>
            </div>
        </div>
    </div>
</div>

    </div>
  )
}

export default Story

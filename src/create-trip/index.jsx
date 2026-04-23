import React from 'react'

function CreateTrip() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <h2 className="text-4xl md:text-6xl font-bold">Tell us your travel preferences</h2>
            <p className='m-3 text-gray-500'>Write more here!</p>

            <div className='mt-20'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your place to go?</h2>
                </div>
            </div>
        </div>
    )
}

export default CreateTrip
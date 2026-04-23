import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <div className='flex flex-col items-center justify-center mt-20 gap-9 px-4 max-w-5xl mx-auto'>
            <h1 className='font-extrabold text-[40px] md:text-[60px] text-center leading-tight'>
                <span className='text-[#f56551]'>Discover Your Next Adventure with Ai</span><br />Personalized Travel Recommendations</h1>

            <Link to={'/create-trip'}>
                <Button>Get Started, For Free</Button>
            </Link>
        </div>
    )
}

export default Hero
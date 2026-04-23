import React, { useState, useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "@/components/ui/input"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';


function CreateTrip() {
    const [place, setplace] = useState();

    const [formData, setFormData] = useState([]);

    const handleInputChange = (name, value) => {

        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const OnGenerateTrip = async () => {
        if (formData?.noOfDays > 8 && !formData?.location || !formData?.budget || !formData?.traveler) {
            toast("Please fill all the fields")
            return;
        }

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)

        console.log(FINAL_PROMPT);

        const result = await chatSession.sendMessage(FINAL_PROMPT);

        console.log(result?.response?.text());
    }


    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
            <p className='mt-3 text-gray-500 text-lg'>Write more here!</p>


            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your place to go?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => { setplace(v); handleInputChange('location', v) }
                        }}
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you going?</h2>
                    <Input placeholder={'Ex.3'} type="number"
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border cursor-pointer
                                rounded-lg hover:shadow-lg
                                ${formData?.budget == item.title && 'shadow-lg border-black'}
                                `}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>Who is traveling?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectTravelsList.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('traveler', item.people)}
                                className={`p-4 border cursor-pointer
                                rounded-lg hover:shadow-lg
                                ${formData?.traveler == item.people && 'shadow-lg border-black'}
                                `}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='my-10 justify-end flex'>
                <Button onClick={OnGenerateTrip}>Generate Trip</Button>
            </div>
        </div>


    )
}

export default CreateTrip
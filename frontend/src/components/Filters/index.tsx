import { FunctionComponent } from "react";

interface FiltersProps {
    type: 'events' | 'cafeitems' | 'users';
}

const Filters: FunctionComponent<FiltersProps> = ({ type }) => {
    return (
        <div className="sticky top-0 left-0 md:relative h-72 md:h-96 max-h-96 flex flex-col items-center w-full md:w-2/5 border rounded-md px-6 pb-6 mr-6 lg:mr-12 overflow-y-auto hover:shadow-md shadow-sm">
            <h2 className='sticky top-0 left-0 bg-white text-xl font-light w-full h-fit p-3 text-center'>
                Filters
            </h2>
            <div className='flex flex-col w-full h-fit'>
                {type === 'events' && (
                    <>
                        <div className='flex flex-col'>
                            <label className="my-2">Date</label>
                            <input type="date" className="border p-2 rounded-md" />
                        </div>
                        <div className='flex flex-col'>
                            <label className="my-2">Location</label>
                            <input type="text" className="border p-2 rounded-md" />
                        </div>
                        <div className='flex flex-col'>
                            <label className="my-2">Attendee Count</label>
                            <input type="number" className="border p-2 rounded-md" />
                        </div>
                        <div className='flex flex-col'>
                            <label className="my-2">Type</label>
                            <select className="border p-2 rounded-md">
                                <option value="">Select Type</option>
                                <option value="concert">Concert</option>
                                <option value="conference">Conference</option>
                                <option value="workshop">Workshop</option>
                            </select>
                        </div>
                    </>
                )}
                {type === 'cafeitems' && (
                    <>
                        <div className='flex flex-col'>
                            <label className="my-2">Category</label>
                            <select className="border p-2 rounded-md">
                                <option value="">Select Category</option>
                                <option value="coffee">Coffee</option>
                                <option value="tea">Tea</option>
                                <option value="pastry">Pastry</option>
                            </select>
                        </div> 
                        <div className='flex flex-col'>
                            <label className="my-2">Price Range</label>
                            <input type="text" className="border p-2 rounded-md" placeholder="e.g., $5 - $15" />
                        </div>
                    </>
                )}
                {type === 'users' && (
                    <>
                        <div className='flex flex-col'>
                            <label className="my-2">Username</label>
                            <input type="text" className="border p-2 rounded-md" />
                        </div>
                        <div className='flex flex-col'>
                            <label className="my-2">Email</label>
                            <input type="email" className="border p-2 rounded-md" />
                        </div>
                        <div className='flex flex-col'>
                            <label className="my-2">Date Joined</label>
                            <input type="date" className="border p-2 rounded-md" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Filters;
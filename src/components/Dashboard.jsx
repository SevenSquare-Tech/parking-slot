import { ParkingCircle, Car, CheckCircle } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Theme } from './Theme';
import { GetSlotApi } from './AxiosData';

const Dashboard = () => {

    const { theme } = useContext(Theme)
    const [slots, setSlots] = useState([]);
    const [vacant, setVacant] = useState(0);
    const [occupied, setOccupied] = useState(0);

    // get slots details 
    useEffect(() => {
        async function getSlotData() {
            const resp = await GetSlotApi();
            setSlots(resp.data);
        }

        getSlotData();

    }, [])

    // vacant, occupied 
    useEffect(() => {
        let vacantCount = 0;
        let OccupiedCount = 0;
        slots.forEach((value) => {
            if (value.status == "vacant") {
                vacantCount++;
            }
            else OccupiedCount++;
        })
        setVacant(vacantCount);
        setOccupied(OccupiedCount);
    }, [slots, vacant, occupied])


    return (
        <>
            <div className={`space-y-6 max-w-7xl h-screen mx-auto px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900 ' : 'bg-gray-100'} py-3`}>

                <h1 className='text-red-600 font-semibold text-3xl'>Note : Start Json Server at Port 5000</h1>

                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100 ' : ' text-gray-500'} py-6`}>Dashboard Overview</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-600 text-sm font-medium">Total Slots</p>
                                <p className="text-3xl font-bold text-blue-800">{slots.length}</p>
                            </div>
                            <ParkingCircle className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-red-600 text-sm font-medium">Occupied</p>
                                <p className="text-3xl font-bold text-red-800">{occupied}</p>
                            </div>
                            <Car className="h-8 w-8 text-red-600" />
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-600 text-sm font-medium">Vacant</p>
                                <p className="text-3xl font-bold text-green-800">{vacant}</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                {/* <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Occupancy Rate</h3>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-gradient-to-r from-green-400 to-red-500 h-4 rounded-full"
                            style={{ width: `${(parkingStats.occupied / parkingStats.total) * 100}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        {Math.round((occupied / slots.length) * 100)}% occupied
                    </p>
                </div> */}
            </div>

        </>
    );
};

export default Dashboard;

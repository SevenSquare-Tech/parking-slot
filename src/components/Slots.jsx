import { useContext, useEffect, useState } from 'react';
import { ParkingCircle } from 'lucide-react';
import { GetSlotApi, PostSlotApi, GetVehiclesData, PostVehiclesData, PutVehiclesData } from './AxiosData';
import { Theme } from './Theme';

const Slots = () => {

    const [slots, setSlots] = useState({
        inputValue: '',
        slotsData: [],
        sortedData: [],
    });

    const [vehiclesData, setVehiclesData] = useState({
        originalData: '',
        filteredData: '',
    })

    // get data from api 
    async function getData() {
        try {
            const resp = await GetSlotApi();
            setSlots({ ...slots, slotsData: resp.data, sortedData: resp.data });
        } catch (error) {
            console.error(`Adding slots - Error - ${error}`)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    // 
    useEffect(() => {
        async function takenSlots() {
            const takenSlots = await GetVehiclesData();
            setVehiclesData((prev) => ({ ...prev, originalData: takenSlots.data }));
        }

        takenSlots();
    }, [])

    useEffect(() => {
        const data = vehiclesData.originalData && vehiclesData.originalData.map(v => {
            if (v.selectedSlot && v.status == "parked") {
                return v.selectedSlot
            }
        });
        // console.log(data)
        // console.log(vehiclesData.originalData);
        slots.sortedData && slots.sortedData.map((v2, index) => {
            if (data.includes(v2.slotNumber)) {
                slots.sortedData[index].status = "occupied";
            }
            PutVehiclesData(slots.sortedData[index]);
        })

        console.log(slots.sortedData)
    }, [vehiclesData.originalData, slots.sortedData])

    // theme 
    const { theme } = useContext(Theme)

    // add slot
    async function handleAddSlots() {
        try {
            if (slots.inputValue != '') {
                const inputValueRegex = /^[a-zA-Z][0-9]$/
                const slotNumber = slots.inputValue[0].toUpperCase() + slots.inputValue.slice(1,);

                if (inputValueRegex.test(slots.inputValue) && !slots.slotsData.find((value) => value.slotNumber == slotNumber)) {
                    const newItem = { slotNumber: slotNumber, status: "vacant" }
                    await PostSlotApi(newItem);
                    getData();
                    slots.inputValue = '';
                } else {
                    alert("The Slot number is already present or enter it in correct sequence(one character and a number)")
                }
            }
        } catch (error) {
            console.error(`Adding slots - Error - ${error}`)
        }
    }

    // sorting function 
    async function handleSorting(e) {
        if (e == "vacant") {
            const values = slots.slotsData.filter((value) => value.status == "vacant");
            setSlots((prev) => ({ ...prev, sortedData: values }))
        }
        else if (e == "occupied") {
            const values = slots.slotsData.filter((value) => value.status == "occupied");
            setSlots((prev) => ({ ...prev, sortedData: values }))
        }
        else {
            const resp = await GetSlotApi();
            setSlots({ ...slots, sortedData: resp.data });
        }
    }

    return (
        <>
            <div className={`space-y-6 font-semibold py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900  text-white' : 'bg-gray-100 text-black'}`}>

                <h1 className='text-red-600 text-3xl'>Note : Start Json Server at Port 5000</h1>

                {/* heading */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h2 className="text-2xl font-bold ">Parking Slots</h2>
                    <div className="flex gap-2">
                        <select className={`px-3 py-2 border border-gray-300 rounded-lg cursor-pointer ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black '}`}
                            onChange={(e) => handleSorting(e.target.value)}>
                            <option value=" ">All Slots</option>
                            <option value="vacant">Vacant</option>
                            <option value="occupied">Occupied</option>
                        </select>
                    </div>
                </div>

                <div className="flex shrink-0 space-x-7 flex-wrap">
                    {slots.sortedData.length > 0 ? (slots.sortedData.map(value => (
                        <div key={value.id} className={`p-4 rounded-lg border-2 text-center shrink-0 w-40 mt-3 transition-colors ${value.status === 'occupied' ? 'bg-red-50 border-red-300 text-red-800' : 'bg-green-50 border-green-300 text-green-800'}`} >
                            <ParkingCircle className="h-8 w-8 mx-auto mb-2" />
                            <p className="font-bold text-lg">{value.slotNumber}</p>
                            <p className="text-sm capitalize">{value.status}</p>
                        </div>
                    ))) : <h1 className='text-center w-full text-2xl text-red-600'>No Slots to show. Add a Slot</h1>}
                </div>

                {/* Add Slot Form */}
                <div className="border rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Add New Slot</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Slot Number (e.g., D1)"
                            className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-0 ${theme === 'dark' ? 'bg-gray-900 placeholder:text-gray-400  text-white' : 'bg-gray-100 text-black placeholder:text-gray-400'}`}
                            value={slots.inputValue}
                            onChange={(e) => setSlots({ ...slots, inputValue: e.target.value })}
                        />
                        <button className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            onClick={handleAddSlots}>
                            Add Slot
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Slots;
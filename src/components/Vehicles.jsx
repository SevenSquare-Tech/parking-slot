// pages/Vehicles.js
import { useContext, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { GetSlotApi, GetVehiclesData, PostVehiclesData, PutVehiclesData, DeleteVehiclesData } from './AxiosData';
import { Theme } from './Theme';

const Vehicles = () => {

    // vehicles
    const [vehiclesData, setVehiclesData] = useState({
        originalData: '',
        filteredData: '',
    })

    const [inputValue, setInputValue] = useState({
        vehicleNumber: '',
        ownerName: '',
        selectedSlot: '',
    })

    // theme 
    const { theme } = useContext(Theme)

    // get vehicles
    async function getVehicles() {
        const resp = await GetVehiclesData();
        setVehiclesData((prev) => ({ ...prev, originalData: resp.data, filteredData: resp.data }));
    }
    useEffect(() => {
        getVehicles();
    }, [])

    // Add Vehicles
    async function handleAddVehicles() {
        try {
            if (inputValue.vehicleNumber != '' && inputValue.ownerName != '' && inputValue.selectedSlot != '') {
                // if (vehiclesData.filteredData.map((value) => value.vehicleNumber.includes())) { }

                // validation - check if vehicle already present
                const numberRegex = /^[a-zA-Z]{2}[0-9]{2}[a-zA-Z]{2}[0-9]{4}$/;
                const ownerName = /^[a-zA-Z\s]+$/;

                if (numberRegex.test(inputValue.vehicleNumber) && ownerName.test(inputValue.ownerName)) {
                    const correctNumber = inputValue.vehicleNumber.toUpperCase();
                    const correctName = inputValue.ownerName[0].toUpperCase() + inputValue.ownerName.slice(1,);
                    const newItem = { "vehicleNumber": correctNumber, "ownerName": correctName, "selectedSlot": inputValue.selectedSlot, "status": "parked" }
                    await PostVehiclesData(newItem)
                    getVehicles();
                    inputValue.vehicleNumber = '';
                    inputValue.ownerName = '';
                    inputValue.selectedSlot = '';
                }
                else {
                    alert("Enter correct vehicle number(Eg - GJ05AB1525) and owner name");
                    return;
                }

            }
            else {
                alert("Enter Vehicle number and Owner name and also select slot number");
            }
        }
        catch (error) {
            console.error(`Adding vehicles - Error - ${error}`);
        }
    }

    // slots
    const [slots, getSlotData] = useState({
        originalData: [],
        sortedData: [],
    });

    // get slots 
    useEffect(() => {
        async function getSlots() {
            const resp = await GetSlotApi();
            getSlotData((prev) => ({ ...prev, sortedData: resp.data, originalData: resp.data }));
        }
        getSlots()
    }, [])

    // only showing available slots
    useEffect(() => {
        const data =
            vehiclesData.originalData &&
            vehiclesData.originalData
                .filter((v) => v.selectedSlot && v.status === "parked")
                .map((v) => v.selectedSlot);

        slots.sortedData &&
            slots.sortedData.forEach(async (v2) => {
                if (data.includes(v2.slotNumber)) {
                    const updatedSlot = { ...v2, status: "occupied" };
                    await PutVehiclesData(v2.id, updatedSlot);
                }
            });
    }, [vehiclesData.originalData, slots.sortedData]);


    // Handle searching
    function handleSearching(e) {
        if (e != '') {
            const correctSearchInput = e.toUpperCase();
            const value = vehiclesData.originalData.filter((number) =>
                number.vehicleNumber.match(correctSearchInput)
            )
            // console.log(value);
            setVehiclesData((prev) => ({ ...prev, filteredData: value }));
        }
        else {
            setVehiclesData((prev) => ({ ...prev, filteredData: vehiclesData.originalData }));
        }
    }

    // handle sorting 
    function handleSorting(e) {
        if (e == 'parked') {
            console.log()
            const value = vehiclesData.originalData.filter((value) => value.status == 'parked');
            setVehiclesData((prev) => ({ ...prev, filteredData: value }));
        }
        else if (e == 'left') {
            const value = vehiclesData.originalData.filter((value) => value.status == 'left');
            setVehiclesData((prev) => ({ ...prev, filteredData: value }));
        }
        else {
            setVehiclesData((prev) => ({ ...prev, filteredData: vehiclesData.originalData }));
        }
    }

    // handle delete 
    async function handleDelete(id) {
        await vehiclesData.filteredData.map((value) => {
            if (value.id == id) {
                const newData = {
                    id: value.id,
                    vehicleNumber: value.vehicleNumber,
                    ownerName: value.ownerName,
                    selectedSlot: value.selectedSlot,
                    status: 'left'
                };
                PutVehiclesData(id, newData);
            }
        })
        getVehicles();
    }

    return (
        <>
            <div className={`space-y-6 py-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900  text-white' : 'bg-gray-100 text-black'}`}>
                <h1 className='text-red-600 font-semibold text-3xl'>Note : Start Json Server at Port 5000</h1>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h2 className="text-2xl font-bold ">Vehicle Management</h2>
                    {/* <button className="bg-blue-600  px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Park Vehicle
                </button> */}
                </div>

                {/* Add Vehicle Form */}
                <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-900 placeholder:text-white  text-white' : 'bg-gray-100 text-black placeholder:text-black'}`}>
                    <h3 className="text-lg font-semibold mb-4">Park New Vehicle</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* vehicle number */}
                        <input
                            type="text"
                            placeholder="Vehicle Number"
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                            value={inputValue.vehicleNumber}
                            onChange={(e) => setInputValue((prev) => ({ ...prev, vehicleNumber: e.target.value }))}
                        />

                        {/* owner name */}
                        <input
                            type="text"
                            placeholder="Owner Name"
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                            value={inputValue.ownerName}
                            onChange={(e) => setInputValue((prev) => ({ ...prev, ownerName: e.target.value }))}
                        />

                        {/* slots */}
                        <select className={`px-3 py-2 border border-gray-300 rounded-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
                            value={inputValue.selectedSlot}
                            onChange={(e) => setInputValue((prev) => ({ ...prev, selectedSlot: e.target.value }))}>
                            <option value="">Select Slot</option>
                            {
                                slots.sortedData.sort((a, b) => a.slotNumber.localeCompare(b.slotNumber)) && slots.sortedData.map((value) => {
                                    if (value.status == "vacant") {
                                        return <option key={value.id} value={value.slotNumber}>
                                            {value.slotNumber}
                                        </option>
                                    }
                                })
                            }
                        </select>
                    </div>

                    <button className={`mt-4  px-6 py-2 rounded-lg hover:bg-blue-700 bg-blue-600  text-white transition-colors`}
                        onClick={handleAddVehicles}>
                        Park Vehicle
                    </button>
                </div>

                {/* Search and Filter */}
                <div className={`flex flex-col sm:flex-row gap-4 ${theme === 'dark' ? 'bg-gray-900 placeholder:text-white  text-white' : 'bg-gray-100 text-black placeholder:text-black'}`}>
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 " />
                        <input
                            type="text"
                            placeholder="Search by vehicle number"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                            onChange={(e) => handleSearching(e.target.value)}
                        />
                    </div>
                    <select className={`px-3 py-2 border border-gray-300 rounded-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
                        onChange={(e) => handleSorting(e.target.value)}>
                        <option value=''>All Status</option>
                        <option value='parked'>Parked</option>
                        <option value='left'>Left</option>
                    </select>
                </div>

                {/* Vehicle Table */}
                <div className={`rounded-lg shadow overflow-hidden mb-6 ${theme === 'dark' ? 'bg-gray-900  text-black' : 'bg-gray-100 text-black'}`}>
                    <div className="overflow-x-auto">
                        <table className="w-full">

                            <thead className="bg-gray-300">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Vehicle Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Owner Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Slot
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Remove Vehicle
                                    </th>
                                </tr>
                            </thead>

                            <tbody className={`divide-y ${theme === 'dark' ? 'bg-gray-900 text-white divide-white border border-white' : 'bg-gray-100 text-black divide-gray-700 border-black'}`}>
                                {vehiclesData.filteredData.length > 0 ?
                                    (vehiclesData.filteredData.map((vehicle, index) => (
                                        <tr key={vehicle.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                                                {vehicle.vehicleNumber}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                                {vehicle.ownerName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                                {vehicle.selectedSlot}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${vehicle.status === 'parked'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {vehicle.status}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${vehicle.status == 'left' ? "hidden" : ''}`}>
                                                <button
                                                    className='text-red-500'
                                                    onClick={() => handleDelete(vehicle.id)}
                                                >
                                                    Remove Vehicle
                                                </button>
                                            </td>
                                        </tr>
                                    ))) : <tr className='text-center w-full'>
                                        <td colSpan="5" className='px-6 py-4 text-md text-red-500 font-semibold text-center'>No Vehicles Data found. Add Vehicles to show</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>


            </div >
        </>
    );
};

export default Vehicles;

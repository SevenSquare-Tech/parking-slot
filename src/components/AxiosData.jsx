import axios from "axios";

// slots api
export const SlotsApi = axios.create({
    baseURL: 'http://localhost:5000',
})

export const GetSlotApi = () => {
    return SlotsApi.get("/slots")
};

export const PostSlotApi = (data) => {
    return SlotsApi.post("/slots", data)
};

// vehicles api
export const VehiclesApi = axios.create({
    baseURL: 'http://localhost:5000',
})

export const GetVehiclesData = () => {
    return VehiclesApi.get('/vehicles');
}

export const PostVehiclesData = (data) => {
    return VehiclesApi.post('/vehicles', data);
}

export const PutVehiclesData = (index, newData) => {
    return VehiclesApi.put(`/vehicles/${index}`, newData);
}

export const DeleteVehiclesData = (index) => {
    return VehiclesApi.delete(`/vehicles/${index}`)
}
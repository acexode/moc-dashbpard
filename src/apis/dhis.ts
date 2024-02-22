import axiosInstance from "../services/api_service"

export const getDHISData = async() => {
    try {
        const response = await axiosInstance.get('/dhis/utilization')
        return response
    } catch (error) {
        console.log(error);
    }
}

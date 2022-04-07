import axios from "axios";

const urlAPI = "https://fastfoodserver.herokuapp.com";

export const getAllUsers = async () => {
    return await axios.get(urlAPI +"/api/users");
};

export const deleteUsers = async (phone) => {
    return await axios.post(urlAPI + "/api/deleteUser" ,{phone : phone});
};
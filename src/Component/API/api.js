import axios from "axios";

const urlAPI = "https://fastfoodserver.herokuapp.com";

export const getAllUsers = async () => {
    return await axios.get(urlAPI +"/api/users");
};

export const deleteUsers = async (phone) => {
    return await axios.post(urlAPI + "/api/deleteUser" ,{phone : phone});
};

export const addUsers = async (data) => {
    return await axios.post(urlAPI + "/api/addUser" ,{
        phone : data.phone,
        password: data.password,
        role: data.role,
        email: data.email ?? '',
        full_name : data.full_name ?? '',
        address : data.address ?? '',
        avatar : data.avatar ?? '',
        birthOfDate : data.birthOfDate ?? '', /////////////////////////////
        sex : data.sex ?? '',
    });
};
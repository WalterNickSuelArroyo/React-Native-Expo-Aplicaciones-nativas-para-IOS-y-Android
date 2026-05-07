import axios from "axios";
import type { UserListResponse } from "../interfaces/reqres.response";

export const loadUsersAction = async (page: number) => {
    try {
        const { data } = await axios.get<UserListResponse>(`https://reqres.in/api/users`, {params: {
            page: page
        },
        headers: {
            'x-api-key': 'free_user_3DNGeLMZ1y8wHYjDnAW0R5QyqD8'
        }   
    });
        return data.data;
    } catch (error) {
        console.log(error);
        return [];
    }   
}

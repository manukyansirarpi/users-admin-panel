import { UserI } from "./UsersSlice"; 

const ROOT_URL = 'https://brainstorm-interview-task.herokuapp.com'

export type fetchUsersParams = {
    _page?: string;
    _limit?: string;
    _order?: string;
    _sort?: string;
}

export function fetchUsers(params: fetchUsersParams) : Promise<UserI[]> { 
    let url = new URL(`${ROOT_URL}/users`);
    url.search = new URLSearchParams(params).toString();
    return fetch(url).then((res) => res.json()); 
}

export function deleteUser(userId: number) {
    fetch(`${ROOT_URL}/users/${userId}`, {
        method: 'DELETE'
    }).then(res => res);
}
import { UserI } from "./UsersSlice"; 

export type fetchUsersParams = {
    _page?: string;
    _limit?: string;
    _order?: string;
    _sort?: string;
}

export function fetchUsers(params: fetchUsersParams) : Promise<UserI[]> { 
    let url = new URL('https://brainstorm-interview-task.herokuapp.com/users');
    url.search = new URLSearchParams(params).toString();
    return fetch(url).then((res) => res.json()); 
}

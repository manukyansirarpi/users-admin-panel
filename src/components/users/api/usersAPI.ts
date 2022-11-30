import { UserI, DummyUserI } from "./UsersI";
import { ROOT_URL } from "../../../utils/consts";

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
    return fetch(`${ROOT_URL}/users/${userId}`, {
        method: 'DELETE'
    }).then(res => res);
}

export function addUser(user: DummyUserI): Promise<UserI> {
    debugger;
    return fetch(`${ROOT_URL}/users/`, {
        method: "POST",
        body: JSON.stringify(user)
    }).then((res) => res.json());
}
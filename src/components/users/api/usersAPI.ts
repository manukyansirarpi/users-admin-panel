import { UserI } from "./UsersI";
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

export function addUser(user: UserI): Promise<UserI> {
    return fetch(`${ROOT_URL}/users/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        body: JSON.stringify(user)
    }).then((res) => res.json());
}

export function updateUser(user: UserI): Promise<UserI> {
    return fetch(`${ROOT_URL}/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user)
    }).then((res) => res.json());
}

export function toggleUserAvailability(id: number): Promise<UserI> {
    return fetch(`${ROOT_URL}/users/${id}`, {
        method: "PATCH",
        // body: JSON.stringify(user)
    }).then((res) => res.json());
}

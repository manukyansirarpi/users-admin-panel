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
    return fetch(url).then((res) => res.json()).catch(e => console.log(e));
}

export function deleteUser(userId: number) {
    return fetch(`${ROOT_URL}/users/${userId}`, {
        method: 'DELETE'
    }).then(res => res).catch(e => console.log(e));
}

export function addUser(user: UserI): Promise<UserI> {
    user.lastActiveDate = user.registeredDate = (new Date()).toISOString();
    return fetch(`${ROOT_URL}/users/`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
    }).then((res) => res.json()).catch(e => console.log(e));
}
export function updateUser(user: UserI): Promise<UserI> {
    return fetch(`${ROOT_URL}/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
    }).then((res) => res.json()).catch(e => console.log(e));
}

export function toggleUserAvailability(id: number, disable: boolean) : Promise<UserI> {
    return fetch(`${ROOT_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        body: JSON.stringify({ disabled: disable})
    }).then((res) => res.json()).catch(e => console.log(e));
}
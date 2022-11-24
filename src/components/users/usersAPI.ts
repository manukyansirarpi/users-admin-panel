import { UserI } from "./UsersSlice"; 

export function fetchUsers() : Promise<UserI[]> { 
    return fetch('https://brainstorm-interview-task.herokuapp.com/users?_page=1&_limit=20').then((res) => res.json()); 
}

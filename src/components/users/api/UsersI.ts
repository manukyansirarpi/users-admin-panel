export interface DummyUserI {
    name: string;
    email: string;
    photo: string;
    location: string;
}

export interface UserI extends DummyUserI {
    id: number;
    registeredDate: string;
    lastActiveDate: string;
    disabled: boolean;
 }
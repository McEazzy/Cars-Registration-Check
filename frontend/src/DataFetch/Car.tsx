/**
 * Fetching car data from the backend API
 */
export interface Car {
    id: number;
    owner: string;
    make: string;
    model: string;
    regoExpiry: string;
}
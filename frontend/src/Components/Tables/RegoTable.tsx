import type { Car } from '../../DataFetch/Car';

interface Props {
    car: Car;
}

const RegoTable = ({car}: Props) => {
    const now = new Date();
    const localRegoDate = new Date(car.regoExpiry);

    return (
        <div>
            <table className="single-row-table">
                <thead>
                    <tr>
                        <th>Car ID</th>
                        <th>Owner</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={car.id}>
                        <th>{car.id}</th>
                        <th>{car.owner}</th>
                        <th>{car.make}</th>
                        <th>{car.model}</th>
                        <th>{car.regoExpiry}</th>
                        <th>
                            {localRegoDate < now ? "Expired" : "Active"}
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
        
    )
}

export default RegoTable
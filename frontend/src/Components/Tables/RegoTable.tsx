import type { Car } from '../../DataFetch/Car';

interface Props {
    car: Car;
}

const RegoTable = ({car}: Props) => {
    const now = new Date();
    const localRegoDate = new Date(car.regoExpiry);

    return (
        <div className="w-full flex justify-center mt-10">
            <div className= "bg-white shadow rounded p-4 sm:p-6 xl:p-8">
                <table className ="table-auto border-collapse mx-auto">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-center font-semibold text-gray-900 whitespace-nowrap">Car ID</th>
                            <th className="px-6 py-3 text-center font-semibold text-gray-900 whitespace-nowrap">Owner</th>
                            <th className="px-6 py-3 text-center font-semibold text-gray-900 whitespace-nowrap">Make</th>
                            <th className="px-6 py-3 text-center font-semibold text-gray-900 whitespace-nowrap">Model</th>
                            <th className="px-6 py-3 text-center font-semibold text-gray-900 whitespace-nowrap">Expiry Date</th>
                            <th className="px-6 py-3 text-center font-semibold text-gray-900 whitespace-nowrap">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="px-6 py-4 whitespace-nowrap text-gray-700" key={car.id}>
                            <th>{car.id}</th>
                            <th>{car.owner}</th>
                            <th>{car.make}</th>
                            <th>{car.model}</th>
                            <th>{car.regoExpiry}</th>
                            <th className= {localRegoDate > now ? "text-green-500" : "text-red-500"}>
                                {localRegoDate < now ? "Expired" : "Active"}
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RegoTable
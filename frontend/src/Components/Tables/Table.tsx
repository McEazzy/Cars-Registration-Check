import {type JSX} from 'react'
import { Link } from 'react-router-dom';

interface Props {
    cars: any[];
}

const TableConfigs = [
    { 
        label: "Car id",
        render: (car: any) => car.id
    },
    {
        label: "owner",
        render: (car: any) => car.owner
    },
    { 
        label: "make",
        render: (car: any) => car.make
    },
    {
        label: "model",
        render: (car: any) => car.model
    },
    {
        label: "Expiry date",
        render: (car: any) => car.regoExpiry
    }
];


const Table = ({cars}: Props): JSX.Element => {
    const renderedRows = cars.map((car) => {
        return (
            <tr key={car.id}>
                {TableConfigs.map((val: any) => {
                    return <td className="px-6 py-4 whitespace-nowrap text-gray-700 " key={val.label}>
                        <Link to="/rego" >{val.render(car)}</Link>
                        </td>
                })}
            </tr>
        )
    });

    const renderedHeader = (
        <tr>
            {TableConfigs.map((config: any) => {
                return (
                    <th className="px-6 py-3 text-left font-semibold text-gray-900 whitespace-nowrap " key = {config.label}>
                        {config.label}
                    </th>
                )
            })}
        </tr>
    );

    return (
        <div className="w-full flex justify-center mt-10">
            <div className= "bg-white shadow rounded p-4 sm:p-6 xl:p-8">
                <table className ="table-auto border-collapse mx-auto">
                    <thead className="min-w-full divide-y divide=gray-200 m-5">{renderedHeader}</thead>
                    <tbody className="">{renderedRows}</tbody>
                </table>       
            </div>
        </div> 
    )
};

export default Table
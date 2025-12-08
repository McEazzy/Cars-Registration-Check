import {type JSX} from 'react'

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
                    return <td className="p-4 whitespace-nowrap" key={val.label}>{val.render(car)}</td>
                })}
            </tr>
        )
    });

    const renderedHeader = TableConfigs.map((config: any) => {
        return (
            <tr>
                <th className="p-4 text-left font-medium text-fray-900" key = {config.label}>
                    {config.label}
                </th>
            </tr>
        )
    });

    return ( 
        <div className= "bg-white shadow rounded p-4 sm:p-6 xl:p-8">
            <table>
                <thead className="min-w-full divide-y divide=gray-200 m-5">{renderedHeader}</thead>
                <tbody className="">{renderedRows}</tbody>
            </table>       
        </div>
    )
};

export default Table
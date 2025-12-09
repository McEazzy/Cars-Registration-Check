import { type JSX } from 'react'
import { Link } from 'react-router-dom'

const navItem = [
    {label: 'Home', to: '/'},
    {label: 'Registration Status', to: '/rego'}
]

const NavBar = (): JSX.Element => {
  return (
    <nav className="w-full bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-semibold hover: text-gray-300">
                Car Registration View
            </Link>


            <ul className="flex space-x-6">
                {navItem.map((item) => (
                    <li key={item.to}>
                        <Link to={item.to} className="hover:text-gray-300 text-sm font-medium">{item.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    </nav>   
  )
}

export default NavBar
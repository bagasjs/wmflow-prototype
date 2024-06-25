import { Link } from "react-router-dom"

export default function Layout({ children }) {
    return (
        <>
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div className="drawer-content flex flex-col items-center justify-center">
                        <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle drawer-button lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                    </div> 
                </div>
                <a className="text-xl">WM Flow</a>
            </div>
            <div className="navbar-end">
            </div>
        </div>

        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/ledger">Ledger</Link></li>
                    <li><Link to="/journal">Journal</Link></li>
                </ul>
            </div>
            <div className="drawer-content p-5">
                { children }
            </div>
        </div>
        </>
    )
}

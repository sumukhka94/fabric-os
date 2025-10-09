
export default function Marketing() {
    return (
        <div>
            <nav className="bg-green-200 rounded-full p-2 flex items-center gap-5 justify-between m-1">
                <h1 className="p-3 border-2 border-black rounded-full">Fabric OS</h1>
                <h1 className="text-2xl">Marketing</h1>
                <ul className="flex items-center justify-center gap-2">
                    <li className="border-2 border-black p-3 rounded-full"> Home </li>
                    <li className="border-2 border-black p-3 rounded-full"> Manage Templates </li>
                </ul>
            </nav>
            <div className="flex bg-cyan-200 m-1 rounded-full p-3 gap-1">
                <p className="border-2 border-black p-3 rounded-full"> Total Number of Customers : 100</p>
                <p className="border-2 border-black p-3 rounded-full"> Last Marketing Run : 1 day ago</p>
                <p className="border-2 border-black p-3 rounded-full"> Number of customers contacted in the last run : 5</p>
                <p className="border-2 border-black p-3 rounded-full"> Templates available : 5</p>
            </div>
        </div>
    )
}
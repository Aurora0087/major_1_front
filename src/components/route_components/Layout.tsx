import { Outlet } from "react-router-dom"
import Header from "./common/Header"
import Footer from "./common/Footer"

function Layout() {
    return (
        <div className=" bg-slate-100 w-screen min-h-screen overflow-x-hidden">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
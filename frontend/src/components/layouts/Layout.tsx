import { Outlet } from "react-router";
import SiteNavBar from "../elements/SiteNavBar";

export default function Layout() {
    return (
        <>
            <SiteNavBar />
            <Outlet />
        </>
    )
}
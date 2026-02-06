import { Outlet } from "react-router";
import SiteNavBar from "../components/elements/SiteNavBar";

export default function Layout() {
    return (
        <>
            <SiteNavBar />
            <Outlet />
        </>
    )
}
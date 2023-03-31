import { Outlet } from "react-router-dom";
import NavBar from "../ui/NavBar";
import Footer from "../ui/Footer";

const NavBarFooterSandwichLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}

export default NavBarFooterSandwichLayout;
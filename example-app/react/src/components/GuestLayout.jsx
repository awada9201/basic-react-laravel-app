import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import { Navigate } from "react-router-dom";

export default function GuestLayout (){
    const {token} = useStateContext();
    if (token){
        return <Navigate to="/users" />
    }
    return (
        <div>
            <Outlet />
        </div>

    );
}
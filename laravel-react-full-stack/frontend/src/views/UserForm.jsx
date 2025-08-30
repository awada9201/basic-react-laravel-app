import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Userform() {
    const {id} = useParams();
    const [loading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    if (id) {
        useEffect(()=>{
            axiosClient.get(`/users/${id}`)
            .then(({data}) =>{
                console.log(data)
                setIsLoading(false);
                setUser(data.data);
                /*
                  - to prevent the data.data, in the backend side under
                    UserResource, add the line 'public static $wrap = false;'
                */
            })
            .catch(() =>{
                setIsLoading(false);
            })
        }, [])
    }

    const onSubmit = (ev) =>{
        ev.preventDefault();
    }

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading...</div>
                )}
                {
                    errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
                        <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
                        <input value={user} onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
                        <input value={user} onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
                        <button className="btn">Save</button>
                    </form>}
            </div>
        </>

    );
}
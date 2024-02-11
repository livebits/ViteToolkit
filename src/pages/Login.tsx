import { useNavigate } from 'react-router-dom'; // import useHistory
import { SubmitHandler, useForm } from "react-hook-form";
import "../styles/Login.css"
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface LoginForm {
    username: string,
    password: string,
}

const Login = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginForm>();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate])

    const onSubmit: SubmitHandler<LoginForm> = (data) => {
        login(data.username, data.password)
            .then(() => {
                navigate('/');
            }).catch((error) => {
                setError('root.serverError', { message: error });
            })
    }

    return (
        <form className="Login" onSubmit={handleSubmit(onSubmit)}>
            <label>Username:</label>
            <input {...register('username', { required: true, minLength: 3 })} type="text" placeholder="username" />
            {errors.username && <span className="error">Username is required</span>}

            <label>Password:</label>
            <input {...register('password', { required: true, minLength: 5 })} type="password" placeholder="password" />
            {errors.password && <span className="error">Password is required</span>}

            <button type="submit">Login</button>
            {errors.root && <span className="error">{errors.root.serverError.message}</span>}
        </form>
    )
}

export default Login;
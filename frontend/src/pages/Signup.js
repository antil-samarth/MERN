import {useState} from 'react';
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);

    };

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Email</label>
            <input type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
            
            <label>Password</label>
            <input type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
        
            <button type='submit' disabled={isLoading}>Sign Up</button>
            {error && <p className='error'>{error}</p>}
        </form>
    );
}

export default Signup;
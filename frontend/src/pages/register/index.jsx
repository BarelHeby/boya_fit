import React, { useState } from 'react';
import User from '../User/Index';
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fitnessLevel, setFitnessLevel] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [picture, setPicture] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        User.add(name, email, password, fitnessLevel, weight, height, picture);
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <label>
                    Fitness Level:
                    <input type="text" value={fitnessLevel} onChange={(e) => setFitnessLevel(e.target.value)} />
                </label>
                <br />
                <label>
                    Weight:
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </label>
                <br />
                <label>
                    Height:
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                </label>
                <br />
                <label>
                    Picture:
                    <input type="file" accept="image/*" onChange={(e) => setPicture(e.target.files[0])} />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
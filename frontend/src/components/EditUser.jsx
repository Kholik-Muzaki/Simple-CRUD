import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";

const EditUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [initialName, setInitialName] = useState("");
    const [initialEmail, setInitialEmail] = useState("");
    const [initialGender, setInitialGender] = useState("Male"); // Pastikan ini sesuai dengan nilai default yang digunakan di backend
    const navigate = useNavigate();
    const { id } = useParams();

    const secretKey = import.meta.env.VITE_SECRET_KEY;

    const decryptData = (encryptedData) => {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    useEffect(() => {
        getUserById();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const encryptedName = CryptoJS.AES.encrypt(name, secretKey).toString();
            const encryptedEmail = CryptoJS.AES.encrypt(email, secretKey).toString();
            const encryptedGender = CryptoJS.AES.encrypt(gender, secretKey).toString();

            await axios.put(`http://localhost:5000/users/${id}`, {
                name: encryptedName,
                email: encryptedEmail,
                gender: encryptedGender
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const getUserById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${id}`);
            const decryptedName = decryptData(response.data.name);
            const decryptedEmail = decryptData(response.data.email);
            const decryptedGender = decryptData(response.data.gender);

            setName(decryptedName);
            setInitialName(decryptedName); // Simpan nilai awal name
            setEmail(decryptedEmail);
            setInitialEmail(decryptedEmail); // Simpan nilai awal email
            setGender(decryptedGender);
            setInitialGender(decryptedGender); // Simpan nilai awal gender
        } catch (error) {
            console.log(error);
        }
    };

    const resetForm = () => {
        // Mengatur kembali nilai form ke nilai awal sebelum diedit
        setName(initialName);
        setEmail(initialEmail);
        setGender(initialGender);
    };

    return (
        <>
            <div className="columns mt-5 is-centered">
                <div className="column is-half">
                    <form onSubmit={updateUser}>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type="text"
                                    className="input"
                                    placeholder="Name"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="text"
                                    className="input"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Gender</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-success" type="submit">
                                    Update
                                </button>
                            </div>
                            <div className="control">
                                <button
                                    className="button is-light"
                                    type="button"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditUser;

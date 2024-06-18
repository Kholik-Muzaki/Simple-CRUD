import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useParams } from "react-router-dom";

const UserDetail = () => {
    const [user, setUser] = useState({}); // State untuk menyimpan data user
    const { id } = useParams(); // Mengambil id dari URL menggunakan useParams
    const secretKey = import.meta.env.VITE_SECRET_KEY; // Pastikan secretKey Anda telah diatur dengan benar

    useEffect(() => {
        getUserDetail(); // Panggil fungsi untuk mengambil detail user saat komponen di-mount atau id berubah
    }, [id]); // Efek ini akan dipanggil kembali ketika id berubah

    // Fungsi untuk mengambil detail user dari backend
    const getUserDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${id}`);

            // Set state user dengan data yang sudah didekripsi
            setUser({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                gender: response.data.gender,
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Render komponen dengan data user yang sudah diambil
    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <div className="box">
                    <h1 className="title is-4">User Detail</h1>
                    <div>
                        <strong>ID:</strong> {user.id}<br />
                        <strong>Name:</strong> {user.name}<br />
                        <strong>Email:</strong> {user.email}<br />
                        <strong>Gender:</strong> {user.gender}<br />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;

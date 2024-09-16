import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface FormData {
    username:string
    name:string
    password:string
    rpassword:string

}

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const {setUser} = useUser();
    const [formData, setFormData] = useState<FormData>({
        username: "",
        name: "",
        password: "",
        rpassword: "",
    });

   const baseFormData = {
    username:"",
    name:"",
    password:"",
    rpassword:""
   }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.rpassword) {
            alert("Şifreler eşleşmiyor!");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', {
              username: formData.username,
              name: formData.name,
              password: formData.password,
            });
            console.log('Kayıt başarılı:', response.data);
            localStorage.setItem("uuid",response.data.id)
            setUser(response.data)
            setFormData(baseFormData);
            navigate('/chats')
          } catch (error) {
            console.error('Kayıt hatası:', error);
          }
    };

    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-backColor px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-5 flex flex-col items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-primaryColor">Hoş Geldiniz</h1>
                    </div>
                    <div className="space-y-4 w-[80%] flex flex-col ">
                        <div className="flex flex-col items-start justify-center ">
                            <label className="text-primaryColor font-semibold" htmlFor="username">Kullanıcı Adı</label>
                            <input
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border-2 rounded-md py-2 px-2"
                                placeholder="Kullanıcı adınızı girin"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center ">
                            <label className="text-primaryColor font-semibold" htmlFor="name">Adınız</label>
                            <input
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border-2 rounded-md py-2 px-2"
                                placeholder="Adınızı girin"
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-primaryColor font-semibold" htmlFor="password">Şifre</label>
                            </div>
                            <input
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border-2 rounded-md py-2 px-2"
                                type="password"
                                placeholder="Şifrenizi girin"
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-primaryColor font-semibold" htmlFor="rpassword">Şifre Tekrar</label>
                            </div>
                            <input
                                id="rpassword"
                                value={formData.rpassword}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border-2 rounded-md py-2 px-2"
                                type="password"
                                placeholder="Şifrenizi tekrar girin"
                            />
                        </div>
                        <button type="submit" className="w-full text-center transition-all p-2 rounded-md bg-primaryColor text-white hover:bg-primaryColorVol2">
                            Kayıt Ol
                        </button>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                        Kayıtlı hesabınız mı var?
                        <Link to="/" className="text-primaryColor pl-2 hover:underline">
                            Giriş Yap
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;

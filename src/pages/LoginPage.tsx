import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";




const LoginPage: React.FC = () => {
    
    const { setUser } = useUser();
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate();


    const handleSubmit =async (e: FormEvent) => {
        
        e.preventDefault(); 
        try {
             await axios.post('http://localhost:3000/api/auth/login', {
              username: username,
              password: password,
            }).then(async (res)=>{
                console.log('Giriş başarılı:', res.data);
                const response:any = await axios.get('http://localhost:3000/api/auth/authdetail')
                setUser(response.data);
            })
           
            navigate('/chats')
          } catch (error) {
            console.error('Giriş hatası:', error);
          }
    };
    

    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-backColor px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <div className="space-y-6 flex flex-col items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-primaryColor">Hoş Geldiniz</h1>
                    </div>
                    <form  onSubmit={handleSubmit} className="space-y-4 w-[80%] flex gap-y-2 flex-col ">
                        <div className="flex flex-col items-start justify-center ">
                            <label className="text-primaryColor font-semibold" htmlFor="username">Kullanıcı Adı</label>
                            <input id="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} className="w-full bg-gray-50 border-2 rounded-md py-2 px-2" placeholder="Kullanıcı adınızı girin" />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-primaryColor font-semibold" htmlFor="password">Şifre</label>
                                <Link to={""} className="text-sm text-[#6200ee] hover:underline" >
                                    Şifremi Unuttum
                                </Link>
                            </div>
                            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password"  className="w-full bg-gray-50 border-2 rounded-md py-2 px-2" id="password" type="password" placeholder="Şifrenizi girin" />
                        </div>
                        <button  type="submit" className="w-full text-center transition-all p-2 rounded-md bg-primaryColor text-white hover:bg-primaryColorVol2">Giriş Yap</button>
                    </form>
                    <div className="text-center text-sm text-muted-foreground">
                        Hesabınız yok mu?{" "}
                        <Link to={"/register"} className="text-primaryColor hover:underline" >
                            Kayıt Ol
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default LoginPage;

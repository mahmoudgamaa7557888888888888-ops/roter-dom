import { WarehouseManger } from "../../context/WarehouseManager";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { loginUser } from "./authService";
import LoginOrRegisterPage from "./LoginOrRegisterPage";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [dayName, setDayName] = useState([])
  const [active ,setActive] = useState("")

  const handleLogin = async () => {
    if (email !== "" && password !== "") {
      try {
        const { user, role } = await loginUser(email, password);
        setRole(role);
        setRedirect(true);
       
      } catch (error) {
        if (error.code === "auth/internal-error") {
          alert("اسم الحساب او كلمة المرور خاطئه");
        } else if (error.code === "auth/invalid-email") {
          alert("هاذا الحساب غير موجود");
          console.log(error.code);
        } else if (error.code === "auth/network-request-failed") {
          alert(`فشل الاتصال برجاء التحقق من الانترنت`);
        } else {
          alert(`حدث خطاء غير متوقع ${error.message}`);
        }
      }
    } else {
      alert("برجاء تعبئه البينات");
    }
 
  };
  useEffect(() => {
    async function getDayName() {
      const m = new WarehouseManger();
      const d = await m.getAllStock();
      setDayName(d);
    }
    getDayName();
  }, []);

  if (redirect && dayName.length > 0) {
    
    return <Navigate to={`/home?dayName=${dayName.at(-1).id}`}/>;
  }

  return (
    <>
      <LoginOrRegisterPage />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-200 to-indigo-200">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] max-w-sm flex flex-col gap-5 text-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            تسجيل الدخول
          </h2>

          <input
            className="border border-gray-300 rounded-xl px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500 transform duration-150 focus:scale-110  transition-all"
            type="email"
            placeholder="البريد الإلكتروني"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border border-gray-300 rounded-xl px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-indigo-400 transform duration-150 focus:scale-110 transition-all"
            type="password"
            placeholder="كلمة المرور"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition-all shadow-md hover:shadow-lg"
            onClick={handleLogin}
          >
            تسجيل الدخول
          </button>

          <p className="text-sm text-gray-500 mt-2">
            ليس لديك حساب؟{" "}
            <span className="text-indigo-600 hover:underline cursor-pointer">
              التواصل مع المسؤول
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

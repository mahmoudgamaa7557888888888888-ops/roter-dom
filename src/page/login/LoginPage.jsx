import { WarehouseManger } from "../../context/WarehouseManager";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { loginUser } from "./authService";
import LoginOrRegisterPage from "./LoginOrRegisterPage";
import { useToast } from "../../hoks/useToast"

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRole] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [dayName, setDayName] = useState([])
  const [loading ,setLoading] = useState(false)
  const { showToast } = useToast()

  const handleLogin = async () => {
    if (email !== "" && password !== "") {
      setLoading(true)
      try {
        const { user, role } = await loginUser(email, password);
        setRole(role);
        setRedirect(true);
        
       
      } catch (error) {
        if (error.code === "auth/internal-error") {
          showToast("اسم الحساب او كلمة المرور خاطئه","error");
        } else if (error.code === "auth/invalid-email") {
          showToast("هاذا الحساب غير موجود","error");
          console.log(error.code);
        } else if (error.code === "auth/network-request-failed") {
          showToast(`فشل الاتصال برجاء التحقق من الانترنت`,"error");
        } else {
          showToast(`حدث خطاء غير متوقع `,"error");
        }
      }
      setLoading(false)
    } else {
      showToast(`برجاء تعبئه جميع الاحقال`,"warn");
    }
 
  };
 


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
            disabled={loading}
            className={`bg-indigo-600 text-white font-semibold py-2 rounded-xl transition-all shadow-md 
            ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700 hover:shadow-lg"}
          `}
            onClick={handleLogin}
          >
            {loading ? "جاري تسجيل الدخول" : " تسجيل الدخول"}
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

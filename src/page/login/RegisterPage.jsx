import { useState } from "react";
import { Navigate } from "react-router-dom";
import { registerUser } from "./authService";
import LoginOrRegisterPage from "./LoginOrRegisterPage";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  const handleRegister = async () => {
    if (email !== "" && password !== "") {
      try {
        await registerUser(email, password, role);
        alert("تم إنشاء الحساب بنجاح ✅");
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          alert("هاذا الحساب مستخدم بالفعل");
        } else if (err.code === "auth/invalid-email") {
          alert("برجاء التاكد من صحة البريد الالكتروني ");
        } else if (err.code === "auth/weak-password") {
          alert("يجب ان تكون كلمة المرور اكبر من 6");
        } else if (err.code === "auth/network-request-failed") {
          alert(`فشل الاتصال برجاء التحقق من الانترنت`);
        } else {
          alert(`حدث خطاء غير متوقع ${err.message}`);
        }
      }
    } else {
      alert("برجاء تعبئه البينات");
    }
  };

  return (
    <>
      <LoginOrRegisterPage />
      <div className="flex flex-col items-center gap-3 mt-40">
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          onChange={(e) => setPassword(e.target.value)}
        />
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="employee">موظف</option>
          <option value="admin">مسؤول</option>
        </select>
        <button onClick={handleRegister}>تسجيل حساب</button>
      </div>
    </>
  );
}

export default RegisterPage;

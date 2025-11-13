import { Link } from "react-router-dom";


export default function LoginOrRegisterPage() {
  return (
    <div>
      <nav className="flex gap-4 p-3 bg-gradient-to-br from-indigo-300 to-purple-300"  >
        <Link  className="font-bold text-gray-50 hover:text-indigo-700 hover:underline" to="/login">تسجيل الدخول</Link>
        <Link className="font-bold text-gray-50 hover:text-indigo-700 hover:underline" to="/register">إنشاء حساب</Link>
      </nav>
    </div>
  );
}

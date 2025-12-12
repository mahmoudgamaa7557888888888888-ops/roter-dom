
import "./detilse.css"

export default function Section({ children, title }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl section-title font-bold text-gray-800 dark:text-gray-100 mb-6 relative  ">
       {title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start shadow-lg m-2 p-5 rounded-xl bg-gray-50 dark:bg-gray-600">
        {children}
      </div>
    </div>
  );
}



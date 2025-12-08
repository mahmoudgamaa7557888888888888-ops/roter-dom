import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useAllDays } from "../../../../context/AllDaysProvider";



const ITEM_HEIGHT = 75;

export default function AllDaysList() {
  const { allDays, daysLoading, setSelectedDay } = useAllDays();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 text-right">

      {/* زر القائمة */}
      <button
        onClick={handleClick}
        className="
          w-full text-right px-4 py-3 rounded-xl 
          font-semibold text-gray-800 bg-gray-200 
          hover:bg-gray-300 transition-all 
          dark:text-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600
        "
      >
        اختر يوم عمل
      </button>

      {/* القائمة MUI */}
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          className:
            "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl shadow-lg",
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "220px",
          },
        }}
        MenuListProps={{
          className: "py-2",
        }}
      >
        {daysLoading ? (
          <MenuItem className="text-gray-600 dark:text-gray-300 text-sm">
            جاري التحميل...
          </MenuItem>
        ) : (
          allDays.map((day) => (
            <MenuItem
              key={day.id}
              onClick={() => {
                setSelectedDay(day.id);
                handleClose();
              }}
              className="
                !text-right font-medium
                hover:bg-gray-200 dark:hover:bg-gray-700 
                rounded-lg transition-all
              "
            >
              {day.id}
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
}

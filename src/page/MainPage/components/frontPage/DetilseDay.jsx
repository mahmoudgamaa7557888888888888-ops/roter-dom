import {FaBoxOpen, FaDollarSign, FaUsers, FaTruck,  FaMoneyBillWave,} from "react-icons/fa";
import DaySummaryCards from "./detilseComponents/DaySummaryCards";
import Section from "./detilseComponents/Section";
import { useStock } from "../../../../hoks/useStock";
import TraderCard from "./detilseComponents/TraderCard";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function AnalyticsDataCards() {
  const [traderID, setTraderID]=useState(null)

  const {
    data: stock,
    isFetching,
    isLoading: stockLoading,
    invalidData,
  } = useStock();

  console.log(stockLoading ? " جاري التحميل": stock ? "" : stock);
  const toggle = (id)=> setTraderID(traderID === id ? null : id)

  const fakeData = [
    {
      label: "المليان المتوفر",
      value: stock?.stockData.available_mlian,
      icon: <FaBoxOpen className="text-green-500" />,
      color: "green",
    },
    {
      label: "المليان المباع",
      value: stock?.stockData?.sold_mlian?? 0,
      icon: <FaBoxOpen className="text-red-500" />,
      color: "red",
    },
    {
      label: "الفرداني المباع",
      value: 15,
      icon: <FaUsers className="text-yellow-500" />,
      color: "yellow",
    },
    {
      label: "الفاضي المستلم",
      value: stock?.stockData.available_fadi,
      icon: <FaTruck className="text-blue-500" />,
      color: "blue",
    },
    {
      label: "الفاضي اللي برا",
      value: 12,
      icon: <FaTruck className="text-purple-500" />,
      color: "purple",
    },
    {
      label: "الفلوس المستلمة",
      value: stock?.stockData.available_money,
      icon: <FaDollarSign className="text-indigo-500" />,
      color: "indigo",
    },
    {
      label: "الفلوس عند التجار",
      value: stock?.stockData.traders_money?? 0,
      icon: <FaMoneyBillWave className="text-pink-500" />,
      color: "pink",
    },
  ];

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen ">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-right">
        تحليل بيانات اليوم
      </h1>
     

      <Section title={"بينات النقله"} >
        {fakeData.map((detilse, i) => (
          <Link to={"/home/log"}>
          <DaySummaryCards
            key={i}
            label={detilse.label}
            value={detilse.value}
            icon={detilse.icon}
            color={detilse.color}
          />
          </Link>
        ))}
        
        </Section>

      <Section title={"التجار"}>
        {stock?.traders.length > 0 && stock.traders.map((trader)=>(
          <TraderCard
          key={trader.waqt}
          traderName={trader.id}
          traderMlian={trader.traderMlian}
          traderFadi={trader.traderFadi}
          traderHadid={trader.totalHadid}
          traderMoney={trader.traderMoney}
          toggle={toggle}
          selectedID={traderID}
          />
        ))}

      </Section>
  

    </div>
  );
}

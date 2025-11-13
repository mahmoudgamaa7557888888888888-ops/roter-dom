import { WarehouseManger } from '../../../../context/WarehouseManager'
import { useEffect } from 'react'
import { useState } from 'react'

export default function newDay() {
    const [dayName, setDayName] = useState("")
    const [mlian , setMlian] = useState()
    const [fadi, setFadi] = useState()
    const [money , setMoney] = useState()
    const today = new Date().toDateString()
    setDayName(today)
    
 

const mangerStockData = new WarehouseManger(dayName)
  return (
    <div>
        
      
    </div>
  )
}

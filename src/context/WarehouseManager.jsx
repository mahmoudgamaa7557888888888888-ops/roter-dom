import firebase from "firebase";
import { db } from "../firebaseConfig";

export class WarehouseManger {
  
  
  constructor(dateString, useToast) {
    
    // لو التاريخ موجود استخدمه، غير كده خده من اليوم الحالي بصيغة YYYY-MM-DD
    this.toast = useToast
    this.today = dateString || new Date().toISOString().slice(0, 10);
    this.dayDocRef = db.collection("mgzan").doc(this.today);
  }

  async ensureDayDoc() {
    const doc = await this.dayDocRef.get();
    if (!doc.exists) {
      await this.dayDocRef.set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  }

  async addStock(mlian, fadi, money) {
    mlian = Number(mlian);
    fadi = Number(fadi);
    money = Number(money);
    if (
      typeof mlian !== "number" ||
      typeof fadi !== "number" ||
      typeof money !== "number"
    ) {
      throw new Error("Invalid productName or quantity");
    }
    const stockRef = this.dayDocRef.collection("stock_data").doc("main");
    const docSnap = await stockRef.get();
    try {
      if (docSnap.exists) {
        await stockRef.update({
          available_mlian: docSnap.data().available_mlian + mlian,
          available_fadi: docSnap.data().available_fadi + fadi,
          available_money: docSnap.data().available_money + money,
        });
      } else {
        this.dayDocRef.set({
          h: firebase.firestore.FieldValue.serverTimestamp(),
        });
        await stockRef.set({
          available_mlian: mlian,
          available_fadi: fadi,
          available_money: money,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async addTrader(name, mlian, fadi, money) {
    name = String(name);
    mlian = Number(mlian);
    fadi = Number(fadi);
    money = Number(money);

    const stockRef = this.dayDocRef.collection("stock_data").doc("main");
    const stockSnap = await stockRef.get();
    if (!stockSnap.exists) {
      this.toast("هاذا المخزن غير موجود","warn");
    }
 
    const stock = stockSnap.data();

    const updatestock = {
      available_mlian: stock.available_mlian - mlian,
      available_fadi: stock.available_fadi + fadi,
      available_money: stock.available_money + money,
    };

    const batch = db.batch();

    batch.update(stockRef, updatestock);
    const tradeRef = this.dayDocRef.collection("trades").doc(name);
    const traderSnap = await tradeRef.get();

    if (traderSnap.exists) {
      batch.update(tradeRef, {
        traderMlian: traderSnap.data().traderMlian + mlian,
        traderFadi: traderSnap.data().traderFadi + fadi,
        traderMoney: traderSnap.data().traderMoney + money,
        totalHadid: traderSnap.data().totalHadid + (mlian - fadi),
        waqt: new Date().toLocaleTimeString(),
      });
      this.toast("تم الاستلام من التاجر و تحديث البينات","sucs");
    } else {
      batch.set(tradeRef, {
        traderMlian: mlian,
        traderFadi: fadi,
        traderMoney: money,
        totalHadid: mlian - fadi,
        waqt: new Date().toLocaleTimeString(),
      });

      this.toast("تم اضافه تاجر و تحديث البينات","sucs");
    }
    const logRef = tradeRef.collection("logs").doc();
    batch.set(logRef, {
      mlian,
      fadi,
      money,
      waqt: new Date().toLocaleTimeString(),
    });

    await batch.commit();
  }

  async getStock() {
  try{ const data = this.dayDocRef.collection("stock_data")
   .doc("main")
   const snap = await data.get()
   if (snap.exists){
 
    return snap.data()
   }else{
    this.toast("لا يوجد بينات")
    return null
   }
  }catch(e){
    this.toast(`حدث خطاء ما ${e}`,"error")
  }
}

  async getTrader(id) {
    try {
      const traderRef = this.dayDocRef.collection("trades").doc(id);
      const snapShot = await traderRef.get();
      if (snapShot.exists) {
        return snapShot.data();
      } else {
        this.toast("لا يوجد بينات هنا","warn");
        return null;
      }
    } catch (error) {
      this.toast(`حدث خطاء عجيب ${error}`,"error");
    }
  }

  async getAllTraders() {
    const tradersRef = this.dayDocRef.collection("trades");
    const snapShot = await tradersRef.get();
    if (snapShot.empty) {
      this.toast("هاذا اليوم لا يوجد فيه تجار","warn")
      return [];
    }
    const traders = snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return traders;
  }

  async getTraderLog(id) {
    const traderRef = this.dayDocRef
      .collection("trades")
      .doc(id)
      .collection("logs");
    const traderSnap = await traderRef.get();
    if (traderSnap.empty) {
      return [];
    }
    const traderLog = traderSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return traderLog;
  }

  async getAllStock() {
    const stockRef = db.collection("mgzan");
    const snapStock = await stockRef.orderBy("h", "asc").get();

    if (snapStock.empty) {
      this.toast("مافيش أي مستندات","warn");
      return [];
    }

    const dataStocks = snapStock.docs.map((d) => ({
      id: d.id,
      data: d.data() || {},
    }));

    return dataStocks;
  }
}

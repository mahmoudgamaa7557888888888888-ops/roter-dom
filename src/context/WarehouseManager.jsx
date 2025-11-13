import firebase from "firebase";
import { db } from "../firebaseConfig";

export class WarehouseManger {
  constructor(dateString) {
    // لو التاريخ موجود استخدمه، غير كده خده من اليوم الحالي بصيغة YYYY-MM-DD
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
      alert("هاذا المخزن غير موجود");
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
      alert("تم الاستلام من التاجر و تحديث البينات");
    } else {
      batch.set(tradeRef, {
        traderMlian: mlian,
        traderFadi: fadi,
        traderMoney: money,
        totalHadid: mlian - fadi,
        waqt: new Date().toLocaleTimeString(),
      });

      alert("تم اضافه تاجر و تحديث البينات");
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

  getStock(onData) {
    const dat = db
      .collection("mgzan")
      .doc(this.today)
      .collection("stock_data")
      .doc("main")
      .onSnapshot((docSnap) => {
        if (docSnap.exists) {
          onData(docSnap.data());
        } else {
          console.log("لا يوجد بينات او حدث خطاء");
        }
      });
    return dat;
  }

  async getTrader(id) {
    try {
      const traderRef = this.dayDocRef.collection("trades").doc(id);
      const snapShot = await traderRef.get();
      if (snapShot.exists) {
        return snapShot.data();
      } else {
        alert("لا يوجد بينات هنا");
        return null;
      }
    } catch (error) {
      alert(`حدث خطاء عجيب ${error}`);
    }
  }

  async getAllTraders() {
    const tradersRef = this.dayDocRef.collection("trades");
    const snapShot = await tradersRef.get();
    if (snapShot.empty) {
      alert("هاذا اليوم لا يوجد فيه تجار");
      return [];
    }
    const traders = snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("قائمة التجار:", traders);
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
      console.warn("مافيش أي مستندات");
      return [];
    }

    const dataStocks = snapStock.docs.map((d) => ({
      id: d.id,
      data: d.data() || {},
    }));

    return dataStocks;
  }
}

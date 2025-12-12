import firebase from "firebase";
import { createContext } from "react";
import { db } from "../firebaseConfig";

export const thisDayContext = createContext(null);

export class WarehouseManger {
  constructor(dateString, useToast) {
    this.toast = useToast;
    this.today = dateString || new Date().toISOString().slice(0, 10);
    this.dayDocRef = db.collection("mgzan").doc(this.today);
    this.mgzanlog = this.dayDocRef.collection("stock_data").doc("main");
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
        this.toast("هذا اليوم موجود بالفعل", "error");
        return;
      }

      await this.dayDocRef.set({
        h: firebase.firestore.FieldValue.serverTimestamp(),
      });

      await stockRef.set({
        available_mlian: mlian,
        available_fadi: fadi,
        available_money: money,
        sold_mlian: 0,
        traders_money: 0,
        totalMoney: 0,
      });

      this.toast("تم إضافة يوم عمل جديد", "sucs");
    } catch (err) {
      console.log(err);
    }
  }

  async addTrader(name, mlian, fadi, money, salary = 235) {
    name = String(name);
    mlian = Number(mlian);
    fadi = Number(fadi);
    money = Number(money);
    salary = Number(salary);

    const stockRef = this.mgzanlog;
    const stockSnap = await stockRef.get();

    if (!stockSnap.exists) {
      this.toast("هذا المخزن غير موجود", "warn");
      return;
    }

    const stock = stockSnap.data();
    const batch = db.batch();

    // ====== LOG BEFORE UPDATE ======
    const stocklogRef = stockRef.collection("log").doc();
    batch.set(stocklogRef, {
      before_available_mlian: stock.available_mlian,
      before_available_fadi: stock.available_fadi,
      before_available_money: stock.available_money,
      before_sold_mlian: stock.sold_mlian,
      before_traders_money: stock.traders_money,
      before_totalMoney: stock.totalMoney,
      traderMlian: mlian,
      traderFadi: fadi,
      traderMoney: money,
      traderName: name,
      after_available_mlian: stock.available_mlian - mlian,
      after_available_fadi: stock.available_fadi + fadi,
      after_available_money: stock.available_money + money,
      after_sold_mlian: stock.sold_mlian + mlian,
      after_traders_money: stock.traders_money + (mlian * salary - money),
      after_totalMoney: stock.totalMoney + mlian * salary,
      h:firebase.firestore.FieldValue.serverTimestamp(),
      waqt: new Date().toLocaleTimeString(),
    });

    // ====== MAIN STOCK UPDATE (increment) ======
    batch.update(stockRef, {
      available_mlian: firebase.firestore.FieldValue.increment(-mlian),
      available_fadi: firebase.firestore.FieldValue.increment(fadi),
      available_money: firebase.firestore.FieldValue.increment(money),
      sold_mlian: firebase.firestore.FieldValue.increment(mlian),
      traders_money: firebase.firestore.FieldValue.increment(mlian * salary - money  ),
      totalMoney: firebase.firestore.FieldValue.increment(mlian * salary),
    });

    // ====== TRADER DATA ======
    const tradeRef = this.dayDocRef.collection("trades").doc(name);
    const traderSnap = await tradeRef.get();

    if (traderSnap.exists) {
      batch.update(tradeRef, {
        traderMlian: firebase.firestore.FieldValue.increment(mlian),
        traderFadi: firebase.firestore.FieldValue.increment(fadi),
        traderMoney: firebase.firestore.FieldValue.increment(money),
        totalHadid: firebase.firestore.FieldValue.increment(mlian - fadi),
        totalTraderMoney: firebase.firestore.FieldValue.increment( mlian * salary  ),
        solidTraderMoney: firebase.firestore.FieldValue.increment( mlian * salary - money ),
        waqt: new Date().toLocaleTimeString(),
      });
      this.toast("تم الاستلام من التاجر وتحديث البيانات", "sucs");
    } else {
      batch.set(tradeRef, {
        traderMlian: mlian,
        traderFadi: fadi,
        traderMoney: money,
        totalHadid: mlian - fadi,
        totalTraderMoney: mlian * salary,
        solidTraderMoney: mlian * salary - money,
        waqt: new Date().toLocaleTimeString(),
      });
      this.toast("تم إضافة تاجر وتحديث البيانات", "sucs");
    }

    // ====== ADD TRADER LOG ======
    const logRef = tradeRef.collection("logs").doc();
    batch.set(logRef, {
      mlian,
      fadi,
      money,
      waqt: new Date().toLocaleTimeString(),
      h: firebase.firestore.FieldValue.serverTimestamp(),
    });

    await batch.commit();
  }

  async getStock() {
    try {
      const data = this.mgzanlog;
      const snap = await data.get();
      if (snap.exists) return snap.data();

      this.toast("لا يوجد بيانات");
      return null;
    } catch (e) {
      this.toast(`حدث خطأ ما ${e}`, "error");
    }
  }

  async getTrader(id) {
    try {
      const traderRef = this.dayDocRef.collection("trades").doc(id);
      const snapShot = await traderRef.get();

      if (snapShot.exists) return snapShot.data();

      this.toast("لا يوجد بيانات هنا", "warn");
      return null;
    } catch (error) {
      this.toast(`حدث خطأ عجيب ${error}`, "error");
    }
  }

  async getAllTraders() {
    const tradersRef = this.dayDocRef.collection("trades");
    const snapShot = await tradersRef.get();

    if (snapShot.empty) {
      this.toast("هذا اليوم لا يوجد فيه تجار", "warn");
      return [];
    }

    return snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async getTraderLog(id) {
    const traderRef = this.dayDocRef.collection("trades").doc(id).collection("logs");
    const traderSnap = await traderRef.orderBy("h","asc").get();

    if (traderSnap.empty) return [];

    return traderSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async getAllStock() {
    const stockRef = db.collection("mgzan");
    const snapStock = await stockRef.orderBy("h", "asc").get();

    if (snapStock.empty) {
      this.toast("مفيش أي مستندات", "warn");
      return [];
    }

    return snapStock.docs.map((d) => ({
      id: d.id,
      data: d.data() || {},
    }));
  }
}

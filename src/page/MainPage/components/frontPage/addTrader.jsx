import { useEffect } from "react";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useAddNewTrader, useStock } from "../../../../hoks/useStock";

export default function AddTraderF() {
  const [open, setOpen] = useState(false);
  const { addNewTrader } = useAddNewTrader();
  const { invalidData } = useStock();
  const [traderData, setTraderData] = useState({
    traderName: "",
    traderMlian: 0,
    traderfadi: 0,
  });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addTraderHandler = async () => {
    if (traderData.traderName != "" ) {
      try {
        await addNewTrader(
          traderData.traderName,
          traderData.traderMlian,
          traderData.traderfadi,
          0
        );
        invalidData();
      } catch (e) {
        console.log(e);
      }
    
    }
   
    setOpen(false);
    return;
  };

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="fixed bottom-6 right-6  bg-blue-600 text-white p-4 rounded-full shadow-lg text-5xl"
      >
        <IoMdAddCircleOutline />
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">اضافه تاجر</DialogTitle>
        <DialogContent>
          <DialogContentText>
            برجاء ملء البينات الاتيه لاضافه التاجر
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="الاسم"
            type="email"
            value={traderData.traderName}
            onChange={(e) => {
              setTraderData({ ...traderData, traderName: e.target.value });
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="المليان"
            type="number"
            value={traderData.traderMlian}
            onChange={(e) => {
              setTraderData({
                ...traderData,
                traderMlian:  e.target.value ,
              });
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="الفاضي"
            type="number"
            value={traderData.traderfadi}
            onChange={(e) => {
              setTraderData({
                ...traderData,
                traderfadi: e.target.value,
              });
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            اغلاق
          </Button>
          <Button onClick={addTraderHandler} color="primary">
            اتمام العمليه
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

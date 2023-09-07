import React, { useState } from "react";
import {
  TrashIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";

interface Note {
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

function MyComponent() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("1");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const handleAddNote = () => {
    // TODO : add Validations & Error handling
    const qty = parseFloat(quantity);
    const itemPrice = parseFloat(price);
    const itemSubtotal = qty * itemPrice;
    const newTotal = total + itemSubtotal;
    const newNote: Note = {
      productName,
      quantity: qty,
      price: itemPrice,
      subtotal: itemSubtotal,
    };
    setNotes([...notes, newNote]);
    setProductName("");
    setQuantity("1");
    setPrice("1");
    setSubtotal(0);
    setTotal(newTotal);
  };

  const handleEditNote = (index: number) => {
    setProductName(notes[index].productName);
    setQuantity(notes[index].quantity.toString());
    setPrice(notes[index].price.toString());
    handleDeleteNote(index);
  };

  const handleIncreaseQuantity = (index: number) => {
    const newNotes = [...notes];
    newNotes[index].quantity += 1;
    newNotes[index].subtotal = newNotes[index].quantity * newNotes[index].price;
    setNotes(newNotes);
    let newTotal = newNotes.reduce((acc, note) => acc + note.subtotal, 0);
    setTotal(newTotal);
  };

  const handleDecreaseQuantity = (index: number) => {
    const newNotes = [...notes];
    if (newNotes[index].quantity > 0) {
      newNotes[index].quantity -= 1;
      newNotes[index].subtotal =
        newNotes[index].quantity * newNotes[index].price;
      setNotes(newNotes);
      let newTotal = newNotes.reduce((acc, note) => acc + note.subtotal, 0);
      setTotal(newTotal);
    }
  };

  const handleDeleteNote = (index: number) => {
    // TODO : add Confirmation
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    let newTotal = newNotes.reduce((acc, note) => acc + note.subtotal, 0);
    setTotal(newTotal);
  };

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Product Name</span>
        </label>
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Quantity</span>
        </label>
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Price</span>
        </label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          className="input input-bordered"
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddNote}>
        Save
      </button>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((item, index) => (
              <tr key={`${item.productName}-${index}`}>
                <td>{item.productName}</td>
                <td>Rp.{item.price.toLocaleString()}</td>
                <td>Rp.{item.subtotal.toLocaleString()}</td>
                <td className="px-2 whitespace-nowrap">
                  <button onClick={() => handleEditNote(index)}>
                    <PencilSquareIcon className="h-6 w-6 text-gray-200" />
                  </button>
                  <button onClick={() => handleDecreaseQuantity(index)}>
                    <MinusCircleIcon className="h-6 w-6 text-gray-300" />
                  </button>
                  <span className="text-gray-500">{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(index)}>
                    <PlusCircleIcon className="h-6 w-6 text-gray-300" />
                  </button>
                  <button onClick={() => handleDeleteNote(index)}>
                    <TrashIcon className="h-6 w-6 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}>Total</td>
              <td>Rp.{total.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyComponent;

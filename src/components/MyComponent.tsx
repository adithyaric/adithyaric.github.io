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
  const [selected, setSelected] = useState<number[]>([]);

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
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    let newTotal = newNotes.reduce((acc, note) => acc + note.subtotal, 0);
    setTotal(newTotal);
  };

  const handleCheckboxSelectedAllChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = e.target;

    if (checked) {
      setSelected(notes.map((_, index) => index));
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { checked } = e.target;

    if (checked) {
      setSelected([...selected, index]);
    } else {
      setSelected(selected.filter((i) => i !== index));
    }
  };
  const handleDeleteSelected = () => {
    if (
      window.confirm("Are you sure you want to delete the selected products?")
    ) {
      const newNotes = notes.filter((_, index) => !selected.includes(index));

      setNotes(newNotes);
      let newTotal = newNotes.reduce((acc, note) => acc + note.subtotal, 0);
      setTotal(newTotal);

      setSelected([]);
    }
  };

  return (
    <div className="h-screen pt-10">
      <div className="mx-auto max-w-6xl justify-center px-2 md:flex md:space-x-6 xl:px-0">
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="input input-bordered"
              placeholder="Name of Product"
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
              placeholder="Quantity of Product"
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
              placeholder="Price of Product"
            />
          </div>
          <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            onClick={handleAddNote}
          >
            Save
          </button>
        </div>
        <div className="rounded-lg md:w-2/3">
          <div className="overflow-x-auto justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={handleCheckboxSelectedAllChange}
                        checked={selected.length > 0}
                      />
                    </label>
                  </th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((item, index) => (
                  <tr key={`${item.productName}-${index}`}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          onChange={(e) => handleCheckboxChange(e, index)}
                          checked={selected.includes(index)}
                        />
                      </label>
                    </th>
                    <td>{item.productName}</td>
                    <td>Rp.{item.price.toLocaleString()}</td>
                    <td>Rp.{item.subtotal.toLocaleString()}</td>
                    <td className="px-2 whitespace-nowrap">
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <button onClick={() => handleEditNote(index)}>
                            <PencilSquareIcon className="h-6 w-6 text-gray-200" />
                          </button>
                          <button onClick={() => handleDecreaseQuantity(index)}>
                            <MinusCircleIcon className="h-6 w-6 text-gray-400" />
                          </button>
                          <span className="text-gray-500">{item.quantity}</span>
                          <button onClick={() => handleIncreaseQuantity(index)}>
                            <PlusCircleIcon className="h-6 w-6 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2}>Total</td>
                  <td>Rp.{total.toLocaleString()}</td>
                </tr>
                {selected.length > 0 && (
                  <tr>
                    <td colSpan={5}>
                      <button
                        className="btn btn-outline btn-error"
                        onClick={handleDeleteSelected}
                      >
                        {selected.length}
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;

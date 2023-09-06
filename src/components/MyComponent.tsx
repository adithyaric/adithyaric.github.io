import React, { useState } from "react";

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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="text-lg font-bold">Product Name:</div>
            <input
              className="input input-bordered"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <div className="text-lg font-bold">Quantity:</div>
            <input
              className="input input-bordered"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
            />
            <div className="text-lg font-bold">Price:</div>
            <input
              className="input input-bordered"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
            <div className="card-actions justify-end" onClick={handleAddNote}>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>

        <div className="h-96 overflow-y-auto">
          {notes.map((item, index) => (
            <div
              key={`${item.productName}-${index}`}
              className="card w-96 bg-base-100 shadow-xl mb-5"
            >
              <div className="card-body">
                <h2 className="card-title">{item.productName}</h2>
                <p>
                  <button
                    onClick={() => handleDeleteNote(index)}
                    className="badge badge-outline badge-lg"
                  >
                    x Rp.{item.subtotal.toLocaleString()}
                  </button>
                </p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleEditNote(index)}
                    className="badge badge-outline"
                  >
                    i
                  </button>
                  <button
                    onClick={() => handleDecreaseQuantity(index)}
                    className="badge badge-outline"
                  >
                    -
                  </button>
                  <div>{item.quantity}</div>
                  <button
                    onClick={() => handleIncreaseQuantity(index)}
                    className="badge badge-outline"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-lg font-bold">Total: Rp.{total.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default MyComponent;

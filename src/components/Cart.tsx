import React, { useState, useEffect } from "react";
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
  isBought: boolean;
}

function Cart() {
  const [instance, setInstance] = useState<Note[][]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [productName, setProductName] = useState("");
  const [isBought, setIsBought] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("1");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState<number>(0);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const savedInstances = localStorage.getItem("instances");
    if (savedInstances) {
      setInstance(JSON.parse(savedInstances));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("instances", JSON.stringify(instance));
  }, [instance]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    const savedTotal = localStorage.getItem("total");
    if (savedTotal) {
      setTotal(parseFloat(savedTotal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("total", total.toString());
  }, [total]);

  const saveNotesToInstance = () => {
    if (notes.length === 0) {
      alert("Notes cannot be empty");
      return;
    }
    setInstance(prevInstance => [...prevInstance, notes]);
    setNotes([]); // Clear notes
  };

  // Move instance back to active notes
  const moveInstanceToActiveNotes = (index: number) => {
    const selectedInstance = instance[index];
    setNotes(prevNotes => [...prevNotes, ...selectedInstance]);

    // Remove the instance from instances
    setInstance(prevInstance => {
      const newInstances = [...prevInstance];
      newInstances.splice(index, 1);
      return newInstances;
    });
  };

  const deleteInstance = (index: number) => {
    // Remove the instance at the specified index
    setInstance(prevInstance => {
      const newInstance = [...prevInstance];
      newInstance.splice(index, 1);
      return newInstance;
    });
  };

  const handleAddNote = () => {
    if (!productName) {
      alert("Product name cannot be empty");
      return;
    }
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      alert("Quantity must be a positive number");
      return;
    }
    const itemPrice = parseFloat(price);
    if (isNaN(itemPrice) || itemPrice <= 0) {
      alert("Price must be a positive number");
      return;
    }
    const itemSubtotal = qty * itemPrice;
    const newTotal = total + itemSubtotal;
    const newNote: Note = {
      productName,
      quantity: qty,
      price: itemPrice,
      subtotal: itemSubtotal,
      isBought,
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
      setSelected(selected.filter(i => i !== index));
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

  const handleIsBoughtSelected = () => {
    const newNotes = [...notes];
    selected.forEach(index => {
      newNotes[index].isBought = !newNotes[index].isBought;
    });
    setNotes(newNotes);
    setSelected([]);
  };

  const totalUnbought = notes.reduce(
    (acc, note) => (note.isBought ? acc : acc + note.subtotal),
    0
  );
  const totalBought = notes.reduce(
    (acc, note) => (note.isBought ? acc + note.subtotal : acc),
    0
  );

  const instanceTotals = instance.map(inst =>
    inst.reduce((total, item) => total + item.subtotal, 0)
  );

  return (
    <>
      <div className="md:flex md:space-x-6 xl:px-0 mx-auto max-w-6xl justify-center px-2">
        <div className="bg-white md:mt-0 md:w-1/3 mt-6 h-full rounded-lg border p-6 shadow-md">
          <div className="mb-4">
            <label className="text-gray-700 block text-sm font-medium">
              Product Name
            </label>
            <input
              value={productName}
              onChange={e => setProductName(e.target.value)}
              className="bg-gray-200 border-gray-200 text-blue-700 focus:bg-white focus:border-purple-500 w-full appearance-none rounded border-2 px-4 py-2 leading-tight focus:outline-none dark:bg-skin-fill"
              placeholder="Name of Product"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block text-sm font-medium">
              Quantity
            </label>
            <input
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              type="number"
              className="bg-gray-200 border-gray-200 text-blue-700 focus:bg-white focus:border-purple-500 w-full appearance-none rounded border-2 px-4 py-2 leading-tight focus:outline-none dark:bg-skin-fill"
              placeholder="Quantity of Product"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block text-sm font-medium">
              Price
            </label>
            <input
              value={price}
              onChange={e => setPrice(e.target.value)}
              type="number"
              className="bg-gray-200 border-gray-200 text-blue-700 focus:bg-white focus:border-purple-500 w-full appearance-none rounded border-2 px-4 py-2 leading-tight focus:outline-none dark:bg-skin-fill"
              placeholder="Price of Product"
            />
          </div>
          <button
            className={`text-skin-fill hover:bg-skin-accent-hover mt-6 w-full rounded-md ${
              productName ? "bg-skin-accent" : "bg-skin-card"
            } py-1.5 font-medium`}
            onClick={handleAddNote}
          >
            Save
          </button>
        </div>
        <div className="bg-white md:mt-0 md:w-1/3 mt-6 h-full rounded-lg border p-6 shadow-md">
          <div className="flex flex-col">
            <div className="lg:-mx-8 -mx-6 overflow-x-auto">
              <div className="lg:px-8 inline-block min-w-full py-2 sm:px-6">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="bg-white dark:border-neutral-500 dark:bg-neutral-600 border-b font-medium">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          <label>
                            <input
                              type="checkbox"
                              className="form-checkbox"
                              onChange={handleCheckboxSelectedAllChange}
                              checked={selected.length > 0}
                            />
                          </label>
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Product Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Subtotal
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {notes.map((item, index) => (
                        <tr
                          key={`${item.productName}-${index}`}
                          className={
                            item.isBought
                              ? "bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700 text-gray-500 border-b line-through"
                              : "bg-white dark:border-neutral-500 dark:bg-neutral-600 border-b"
                          }
                        >
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4"
                          >
                            <label>
                              <input
                                type="checkbox"
                                className="form-checkbox"
                                onChange={e => handleCheckboxChange(e, index)}
                                checked={selected.includes(index)}
                              />
                            </label>
                          </th>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.productName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            Rp.{item.price.toLocaleString()}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            Rp.{item.subtotal.toLocaleString()}
                          </td>
                          <td className="whitespace-no-wrap px-6 py-4">
                            {!item.isBought && (
                              <>
                                <button onClick={() => handleEditNote(index)}>
                                  <PencilSquareIcon className="text-gray-400 h-6 w-6" />
                                </button>
                                <button
                                  onClick={() => handleDecreaseQuantity(index)}
                                >
                                  <MinusCircleIcon className="text-gray-400 h-6 w-6" />
                                </button>
                              </>
                            )}
                            <span className="text-gray-500">
                              {item.quantity}
                            </span>
                            {!item.isBought && (
                              <button
                                onClick={() => handleIncreaseQuantity(index)}
                              >
                                <PlusCircleIcon className="text-gray-400 h-6 w-6" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      <tr
                        className={
                          "bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700 border-b"
                        }
                      >
                        <td
                          colSpan={3}
                          className={"whitespace-no-wrap px-6 py-4"}
                        >
                          Total (Unbought Items)
                        </td>
                        <td
                          colSpan={1}
                          className={"whitespace-no-wrap px-6 py-4"}
                        >
                          Rp.{totalUnbought.toLocaleString()}
                        </td>
                      </tr>
                      <tr
                        className={
                          "bg-white dark:border-neutral-500 dark:bg-neutral-600 border-b"
                        }
                      >
                        <td
                          colSpan={3}
                          className={"whitespace-no-wrap px-6 py-4"}
                        >
                          Total (Bought Items)
                        </td>
                        <td
                          colSpan={1}
                          className={"whitespace-no-wrap px-6 py-4"}
                        >
                          Rp.{totalBought.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {selected.length > 0 && (
            <div className="flex gap-2">
              <button
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-md border px-3 py-1"
                onClick={handleDeleteSelected}
              >
                {selected.length}
                <TrashIcon className="text-gray-400 h-6 w-6" />
              </button>
              <button
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-skin-fill rounded-md border px-3 py-1"
                onClick={handleIsBoughtSelected}
              >
                {selected.length} Mark as Bought
              </button>
            </div>
          )}
          <button
            className={`text-skin-fill hover:bg-skin-accent-hover mt-6 w-full rounded-md ${
              notes.length > 0 ? "bg-skin-accent" : "bg-skin-card"
            } py-1.5 font-medium`}
            onClick={saveNotesToInstance}
          >
            Save To Instance
          </button>
        </div>
        <div className="bg-white md:mt-0 md:w-1/3 mt-6 h-full rounded-lg border p-6 shadow-md">
          <div className="flex flex-col">
            <div className="lg:-mx-8 -mx-6 overflow-x-auto">
              <div className="lg:px-8 inline-block min-w-full py-2 sm:px-6">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="bg-white dark:border-neutral-500 dark:bg-neutral-600 border-b font-medium">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Product Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {instance.map((inst, index) => (
                        <React.Fragment key={`instance-${index}`}>
                          {inst.map((item, noteIndex) => (
                            <tr
                              key={`${item.productName}-${noteIndex}`}
                              className={
                                item.isBought
                                  ? "bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700 text-gray-500 border-b line-through"
                                  : "bg-white dark:border-neutral-500 dark:bg-neutral-600 border-b"
                              }
                            >
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.productName}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.quantity}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Rp.{item.price.toLocaleString()}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Rp.{item.subtotal.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                          <tr
                            className={
                              index % 2 === 0
                                ? "bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700 border-b"
                                : "bg-white dark:border-neutral-500 dark:bg-neutral-600 border-b"
                            }
                          >
                            <td
                              colSpan={2}
                              className="whitespace-nowrap px-6 py-4"
                            >
                              <button onClick={() => deleteInstance(index)}>
                                <TrashIcon className="text-gray-400 h-6 w-6" />
                              </button>
                              <button
                                onClick={() => moveInstanceToActiveNotes(index)}
                              >
                                <PlusCircleIcon className="text-gray-400 h-6 w-6" />
                              </button>
                              Instance{index + 1}
                            </td>
                            <th className="whitespace-nowrap px-6 py-4">
                              Total
                            </th>
                            <th className="whitespace-nowrap px-6 py-4">
                              Rp.{instanceTotals[index].toLocaleString()}
                            </th>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;

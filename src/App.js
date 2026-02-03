import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleItems(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handlePackedToggle(id) {
    setItems((items) => {
      return items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      );
    });
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?",
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        handlePackedToggle={handlePackedToggle}
        handleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmition(e) {
    e.preventDefault(); // Prevents reloading the page when form submission

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    console.log(newItem); //sends data

    onAddItems(newItem);

    // Sets form back to initial state
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmition}>
      <h3>What do you need for your ☺️ trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({
  items,
  onDeleteItem,
  handlePackedToggle,
  handleClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
          return (
            <Item
              item={item}
              onDeleteItem={onDeleteItem}
              handlePackedToggle={handlePackedToggle}
              key={item.id}
            />
          );
        })}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClearList}>Clear list</button>
      </div>
    </div>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packin list! 🚀</em>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  const percengeDisplay = !numItems ? 0 : percentage;

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything packed!, you're ready to go! 💼 ✈️"
          : `💼 You have ${numItems} items on the list, and you already packed ${" "}
        ${numPacked} (${percengeDisplay}%)`}
      </em>
    </footer>
  );
}

function Item({ item, onDeleteItem, handlePackedToggle }) {
  console.log(item);
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handlePackedToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

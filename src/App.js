import { useState } from "react";

export default function App() {
  return (
    <div>
      <ShoppingList />
    </div>
  );
}

function ShoppingList() {
  const [items, setItems] = useState([
    { name: "Item 1", count: 0, checked: false },
    { name: "Item 2", count: 0, checked: false },
    { name: "Item 3", count: 0, checked: false },
  ]);

  function addItem(name) {
    setItems([...items, { name, count: 0, checked: false }]);
  }

  function updateItemCount(index, count) {
    const newItems = [...items];
    newItems[index].count = count;
    setItems(newItems);
  }

  function toggleItemChecked(index) {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  }

  return (
    <ul className="shopping-list">
      <div className="input-container">
        <input
          type="text"
          placeholder="Add an item ..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value) {
              addItem(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <button
          onClick={() => {
            const input = document.querySelector(".input-container input");
            if (input.value) {
              addItem(input.value);
              input.value = "";
            }
          }}
        >
          +
        </button>
      </div>

      {items.map((item, index) => (
        <ListItems
          key={index}
          name={item.name}
          count={item.count}
          checked={item.checked}
          updateCount={(count) => updateItemCount(index, count)}
          toggleChecked={() => toggleItemChecked(index)}
        />
      ))}

      <ItemsCounter items={items} />
    </ul>
  );
}

function ListItems({ name, count, checked, updateCount, toggleChecked }) {
  return (
    <li className={`${"list-item"} + ${checked ? "input-checked" : ""}`}>
      <div className="item-order">
        <input type="checkbox" checked={checked} onChange={toggleChecked} />
        {name}
      </div>
      <Counter count={count} updateCount={updateCount} />
    </li>
  );
}

function Counter({ count, updateCount }) {
  return (
    <div className="counter">
      <span onClick={() => updateCount(Math.max(0, count - 1))}>&lt;</span>
      <p> {count} </p>
      <span onClick={() => updateCount(count + 1)}>&gt;</span>
    </div>
  );
}

function ItemsCounter({ items }) {
  const total = items.reduce(
    (acc, item) => acc + (item.checked ? 0 : item.count),
    0
  );
  return <p className="items-counter">Total: {total}</p>;
}

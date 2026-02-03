export default function Stats({ items }) {
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

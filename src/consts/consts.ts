const Categories: string[] = ["Groceries", "Pets", "Finances", "Miscelaneous"];

const LocalDB = "local_storage_db";

const Colors = {
  dark: "#0F1535",
  white: "#FFFFFF",
  light: "#56577A",
};

const MockData = JSON.stringify([
  { task: "Buy milk", category: "Groceries", id: 1, done: true },
  { task: "Walk the dog", category: "Pets", id: 2, done: false },
  { task: "Pay bills", category: "Finances", id: 3, done: true },
  { task: "Call plumber", category: "Miscellaneous", id: 4, done: false },
  { task: "Read book", category: "Miscellaneous", id: 5, done: false },
]);

export { Categories, LocalDB, Colors, MockData };

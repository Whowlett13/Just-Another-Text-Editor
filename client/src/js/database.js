import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => {
//   console.log("putDb to database");
//   const jateDB = await openDB("jate", 1);
//   const text = jateDB.transaction("jate", "readwrite");
//   const store = text.objectStore("jate");
//   const request = store.put({ value: content, id: 1 });
//   const result = await request;
//   console.log(result);
// };
export const putDb = async (content) => {
  console.log("PUT to the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result.value);
};

// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => {
//   console.log("get from database");
//   const jateDB = await openDB("jate", 1);
//   const text = jateDB.transaction("jate", "readonly");
//   const store = text.objectStore("jate");
//   const request = store.getAll();
//   const result = await request;
//   console.log(result.value);
//   return result.value;
// };
export const getDb = async () => {
  console.log("GET from the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  result
    ? console.log("🚀 - data retrieved from the database", result.value)
    : console.log("🚀 - data not found in the database");
  // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  return result?.value;
};
initdb();

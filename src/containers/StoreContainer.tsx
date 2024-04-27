import React, { useState, useEffect } from "react";
import Store from "../components/store/Store";
import {
  InfoProduct,
  InfoPrice,
  InfoStock,
} from "../components/UI/modal/Message";
import { showDeleteConfirm } from "../components/UI/confirm/Confirm";
import "./StoreContainer.scss";

type TStoreContainer = {
  id: number;
  product: string;
  price: number;
  stock: number;
};

const StoreConainer = () => {
  const RandomId = (): number => {
    return Math.floor(Math.random() * Date.now());
  };

  const [product, setProduct] = useState<TStoreContainer[]>([
    { id: RandomId(), product: "Iphone", price: 1200, stock: 3 },
    { id: RandomId(), product: "Laptop", price: 3400, stock: 2 },
  ]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();

  const [notProduct, setNotProduct] = useState<boolean>(false);

  const [sortBy, setSortBy] = useState("");

  const CreateProduct = () => {
    const copy = [...product];
    setProduct([
      ...copy,
      {
        id: RandomId(),
        product: title,
        price: price as number,
        stock: stock as number,
      },
    ]);
  };

  const HandleSort = (key: "title" | "price" | "stock") => {
    if (sortBy === key) {
      product.reverse();
    } else {
      product.sort((a, b) => {
        if (key === "title") {
          return a.product.localeCompare(b.product);
        } else if (key === "price") {
          return a["price"] - b["price"];
        } else if (key === "stock") {
          return a["stock"] - b["stock"];
        }
        return 0;
      });
    }
    setSortBy(key);
  };

  const SameProduct = () => {
    const copyproduct = [...product];
    setProduct([
      ...copyproduct,
      {
        id: RandomId(),
        product: `${title} ${product.length + 1}`,
        price: price as number,
        stock: stock as number,
      },
    ]);
  };

  const OnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "") {
      InfoProduct();
      return;
    } else if (isNaN(price as number)) {
      InfoPrice();
      return;
    } else if (isNaN(stock as number)) {
      InfoStock();
      return;
    } else {
      const existingProductIndex = product.findIndex(
        (item) => item.product.toLowerCase() === title.toLowerCase()
      );
      if (existingProductIndex !== -1) {
        const show = await showDeleteConfirm();
        if (show) {
          const updatedProduct = [...product];
          updatedProduct[existingProductIndex] = {
            ...updatedProduct[existingProductIndex],
            price: price as number,
            stock: stock as number,
          };
          setProduct(updatedProduct);
        } else {
          SameProduct();
        }
      } else {
        CreateProduct();
      }
    }
    setNotProduct(false);
  };

  useEffect(() => {
    if (!notProduct) {
      const notProduct =
        product.filter((elem) => elem.stock === 0).length === product.length;
      if (notProduct) {
        setNotProduct(true);
        setProduct([]);
      }
    }
  }, [product]);

  const OnRemove = (id: number) => {
    setProduct((prevProduct) =>
      prevProduct.map((item) => {
        if (item.stock === 0) {
          return item;
        } else if (item.id === id) {
          return { ...item, stock: item.stock - 1 };
        }
        return item;
      })
    );
  };

  return (
    <>
      {notProduct && (
        <div className="notProduct">
          <h2>Not products available</h2>
        </div>
      )}
      {!notProduct && (
        <div className="storeContainer">
          <div className="title">
            <div onClick={() => HandleSort("title")}>
              <h3 className="downTitle">Title</h3>
            </div>
            <div onClick={() => HandleSort("price")}>
              <h3 className="price">Price</h3>
            </div>
            <div onClick={() => HandleSort("stock")}>
              <h3 className="stock">Stock</h3>
            </div>
          </div>
          <div className="storeShell">
            {product.map((elem) => (
              <Store
                key={elem.id}
                product={elem.product}
                price={elem.price}
                stock={elem.stock}
                remove={() => OnRemove(elem.id)}
              />
            ))}
          </div>
        </div>
      )}
      <form onSubmit={OnSubmit}>
        <input
          type="text"
          className="titleOne"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title:"
        />
        <input
          type="text"
          className="sumOne"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          placeholder="sum:"
        />
        <input
          type="text"
          className="manyOne"
          onChange={(e) => setStock(parseFloat(e.target.value))}
          placeholder="quantity:"
        />
        <div className="btnContainer">
          <button className="createBtn">Create</button>
        </div>
      </form>
    </>
  );
};

export default StoreConainer;

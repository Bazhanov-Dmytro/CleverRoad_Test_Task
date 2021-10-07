import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setDescription,
  setDiscount,
  setDiscountExpires,
  setPrice,
  setImage,
  fetchProducts,
} from "../../Redux/productSlice";
import { useState, useRef } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

function Form(props) {
  const name = useSelector((state) => state.product.name);
  const description = useSelector((state) => state.product.description);
  const discount = useSelector((state) => state.product.discount);
  const discountExpire = useSelector((state) => state.product.discountExpires);
  const price = useSelector((state) => state.product.price);

  const dispatch = useDispatch();

  const [img, setImg] = useState("");
  const imgInputRef = useRef(null);
  const { productID } = useParams();

  const location = useLocation();
  const history = useHistory();

  const getLocation = () => {
    if (location.pathname.includes("update")) {
      return <h1>Update Product</h1>;
    }
    return <h1>Create Product</h1>;
  };

  // image size validator
  const checkImage = (img) => {
    setImg(img);
    const _URL = window.URL || window.webkitURL;
    let i;
    if (img) {
      i = new Image();
      i.onload = function () {
        if (
          this.width < 200 ||
          this.width > 4000 ||
          this.height < 200 ||
          this.height > 4000
        ) {
          alert(
            "Unsatisfying image size. Image width and height should be between 200 and 4000 pixels."
          );
          setImg(null);
          imgInputRef.current.value = null;
        }
      };
      i.src = _URL.createObjectURL(img);
    }
  };
  //

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const updatedProduct = {};
          if (name) updatedProduct["name"] = name;
          if (price) updatedProduct["price"] = price;
          if (discount) updatedProduct["discount"] = discount;
          if (description) updatedProduct["description"] = description;
          if (discountExpire)
            updatedProduct["discountExpiration"] = discountExpire;

          const result = await props.submit(img, updatedProduct, productID);
          if (result === 0) {
            dispatch(setName(""));
            dispatch(setDescription(""));
            dispatch(setDiscount(""));
            dispatch(setDiscountExpires(""));
            dispatch(setPrice(""));
            dispatch(setImage(null));
            history.push("/products");
            dispatch(fetchProducts());
          }
        }}
      >
        {getLocation()}
        <input
          type="text"
          minLength={20}
          maxLength={60}
          placeholder="Product name"
          value={name}
          onChange={(e) => {
            dispatch(setName(e.target.value));
          }}
        />
        <input
          type="file"
          ref={imgInputRef}
          placeholder="Product image"
          onChange={(e) => {
            checkImage(e.target.files[0]);
          }}
        />
        <input
          type="text"
          maxLength={200}
          placeholder="Description"
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => dispatch(setPrice(e.target.value))}
        />
        <input
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(e) => dispatch(setDiscount(e.target.value))}
        />
        <input
          type="date"
          value={discountExpire}
          onChange={(e) => dispatch(setDiscountExpires(e.target.value))}
        />
        <input type="submit" />
      </form>
    </>
  );
}

export default Form;

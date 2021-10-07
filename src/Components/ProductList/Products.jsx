import { app } from "../../firebase";
import { useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import Form from "../Form/Form.jsx";
import createProduct from "../Form/Functions/create";
import updateProduct from "../Form/Functions/update";
import "../../Styles/products.scss";
import { fetchProducts, fetchProducts as fp } from "../../Redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

function Products(props) {
  // const [products, setProducts] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();

  const executeRedirect = (prodID, location) => {
    history.push(`${url}/${location}/${prodID ? prodID : ""}`);
  };

  const now = new Date();
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${
    now.getDate() > 9 ? now.getDate() : "0" + now.getDate()
  }`;

  const discountText = (discountExpiration, price, discount) => {
    if (discountExpiration !== null && discountExpiration > today) {
      return (
        <>
          <h4>
            Price: {Number(price - (price * discount) / 100).toFixed(2)}$
            <span>{Number(price).toFixed(2)}$</span>
          </h4>
          <h4 className="discount">
            Discount is active for another:{" "}
            {Math.floor(
              (Date.parse(discountExpiration) - Date.parse(today)) /
                1000 /
                60 /
                60 /
                24
            )}{" "}
            days!
          </h4>
        </>
      );
    } else {
      return (
        <>
          <h4>Price: {Number(price).toFixed(2)}$</h4>
          <h4 className="discount">{""}</h4>
        </>
      );
    }
  };

  const deleteProduct = async (id) => {
    let productPicture;
    await app
      .firestore()
      .collection("products")
      .doc(id)
      .get()
      .then((res) => {
        productPicture = res.data().image;
        return res;
      });

    const imgRef = app.storage().refFromURL(productPicture);
    imgRef.delete();

    app.firestore().collection("products").doc(id).delete();
    dispatch(fetchProducts());
  };

  const products = useSelector((state) => {
    const productList = state.product.productList;
    return productList.map((prod) => {
      return (
        <div className="card" id={prod.id} key={prod.id}>
          <div className="imageHolder">
            <img src={prod.image} alt="product" />
          </div>
          <div className="contentHolder">
            <div className="text">
              <h3>{prod.name}</h3>
              {discountText(prod.discountExpiration, prod.price, prod.discount)}
              <h4 className="description">Description: </h4>
              <div className="descriptionHolder">
                <p>{prod.description ? prod.description : "No description"}</p>
              </div>
            </div>
            <div className="menu">
              <button
                className="update"
                onClick={() => executeRedirect(prod.id, "update")}
              >
                Update
              </button>
              <button onClick={() => deleteProduct(prod.id)} className="delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
  });

  useEffect(() => {
    dispatch(fp());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.auth().currentUser]);
  return (
    <Switch>
      <Route exact path={`${path}/`}>
        <button
          className="createButton leftSide"
          onClick={() => executeRedirect("", "create")}
        >
          Create new Product
        </button>
        <div className="container">{products}</div>
      </Route>
      <Route exact path={`${path}/create`}>
        <Form submit={createProduct} />
      </Route>
      <Route exact path={`${path}/update/:productID`}>
        <Form submit={updateProduct} />
      </Route>
    </Switch>
  );
}

export default Products;

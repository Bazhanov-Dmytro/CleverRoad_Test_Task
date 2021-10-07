import { app } from "../../../firebase";
import productValidator from "../../../Validators/productValidator";

const createProduct = async (img, product) => {
  const db = app.firestore();

  product = productValidator(product, img, "create");
  if (!product) return;

  try {
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(img.name);
    await fileRef.put(img);
    console.log(`File ${img.name} uploaded.`);
    const fileUrl = await fileRef.getDownloadURL();
    const userID = app.auth().currentUser.uid;

    db.collection("products")
      .doc()
      .set({
        user: userID,
        image: fileUrl,
        name: product.name,
        price: Number(product.price).toFixed(2),
        discount: product.discount,
        description: product.description,
        discountExpiration: product.discountExpiration,
      });
    return 0;
  } catch (e) {
    console.log("Something gone wrong. Object wasn't created.", e);
  }
};

export default createProduct;

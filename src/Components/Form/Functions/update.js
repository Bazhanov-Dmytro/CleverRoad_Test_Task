import { app } from "../../../firebase";
import productValidator from "../../../Validators/productValidator";

const update = async (image, product, prodID) => {
  const storageRef = app.storage().ref();

  let fileUrl = null;
  product = productValidator(product, image, "update");
  if (!product) return;

  try {
    const fileRef = storageRef.child(image.name);
    await fileRef.put(image);
    fileUrl = await fileRef.getDownloadURL();
    product["image"] = fileUrl;
  } catch {
    console.log("No image provided.");
  }

  app.firestore().collection("products").doc(prodID).update(product);
  return 0;
};

export default update;

import checkProduct from "../Components/Form/Functions/checkProduct";

export default function productValidator(product, img, mode) {
  const now = new Date();
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${
    now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()
  }`;

  if (mode === "create") {
    if (!product.name) {
      alert("Enter product name.");
      return;
    }
    if (!img) {
      alert("Image must be provided!");
      return;
    }
  }
  if (
    (!product.price && mode === "create") ||
    product.price <= 0 ||
    product.price >= 100000000
  ) {
    alert("Enter a valid price!");
    return;
  }

  product = checkProduct(product, mode);
  if (!product) return;
  if (product.discount) {
    if (
      (product.discount < 10 || product.discount > 90) &&
      +product.discount !== 0
    ) {
      alert("Incorrect discount value.");
      return;
    } else if (+product.discount === 0 && !product.discountExpiration) {
      alert(
        "If you want to disable discount enter data that already passed at expiration date field."
      );
      return;
    }
  } else if (
    (!product.discount && mode === "create") ||
    +product.discount === 0
  ) {
    product.discount = null;
    product.discountExpiration = null;
    return product;
  } else if (product.discountExpiration) {
    if (product.discountExpiration <= today) {
      alert("Discount date is incorrect.");
      return;
    }
  }

  return product;
}

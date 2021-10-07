export default function checkProduct(product, mode) {
  if (product.description) {
    const isDescriptionEmpty = product?.description
      ?.split("")
      .filter((char) => char !== " ");

    if (isDescriptionEmpty.length === 0) product.description = null;
  } else if (!product.description && mode === "create") {
    product.description = null;
  }
  if (product.discount) {
    if (
      !product.discountExpiration &&
      +product.discount !== 0 &&
      mode !== "update"
    ) {
      alert("Please enter last discount date.");
      return;
    }
  }
  return product;
}

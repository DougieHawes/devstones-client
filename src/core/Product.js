import { useState, useEffect } from "react";

import Layout from "./Layout";

import { read, listRelated } from "./apiCore";

import { Card1, Card2 } from "../utils/cards";

const Product = (props) => {
  const [singleProduct, setSingleProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState("");

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setSingleProduct(data);

        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;

    loadSingleProduct(productId);
  }, [props]);

  const product = (
    <div className="child product">
      {singleProduct && singleProduct.description && (
        <Card2 product={singleProduct} />
      )}
      {relatedProducts.map((p, i) => (
        <Card1 key={i} product={p} />
      ))}
    </div>
  );

  return (
    <Layout
      title={singleProduct && singleProduct.name}
      description=""
      children={product}
    />
  );
};

export default Product;

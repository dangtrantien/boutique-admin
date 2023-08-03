import { productActions } from './product-slice';

// ==================================================

export const getProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://192.168.1.107:5000/product/${productId}`
    );

    const resData = await response.json();

    if (!response.ok) {
      return alert(resData.message);
    }

    return Object.keys(resData).map((key) =>
      dispatch(
        productActions.replaceProductSate({ name: key, value: resData[key] })
      )
    );
  };
};

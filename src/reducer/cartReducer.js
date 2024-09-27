const cartReducer = (state, action) => {
  if (action.type === "LOAD_CART") {
    return {
      ...state,
      cart: action.payload.cartItems.map((item) => ({
        id: item.productId._id + item.color,
        name: item.productId.name,
        color: item.color,
        amount: item.quantity,
        image: item.productId.productImages[0], // Ensure this is correct
        price: item.productId.price,
        max: item.productId.stock,
      })),
      total_price: action.payload.totalPrice || 0, // Assuming you want to update total_price
    };
  }

  if (action.type === "ADD_TO_CART") {
    const { id, color, amount, product } = action.payload;

    const existingProduct = state.cart.find(
      (curItem) => curItem.id === id + color
    );

    if (existingProduct) {
      const updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === id + color) {
          const newAmount = Math.min(curElem.amount + amount, curElem.max);
          return { ...curElem, amount: newAmount };
        }
        return curElem;
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      const cartProduct = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.productImages[0],
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let decAmount = curElem.amount - 1;

        if (decAmount <= 1) {
          decAmount = 1;
        }
        return {
          ...curElem,
          amount: decAmount,
        };
      } else {
        return curElem;
      }
    });
    return {
      ...state,
      cart: updatedProduct,
    };
  }

  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let incAmount = curElem.amount + 1;
        if (incAmount >= curElem.max) {
          incAmount = curElem.max;
        }
        return {
          ...curElem,
          amount: incAmount,
        };
      } else {
        return curElem;
      }
    });
    return {
      ...state,
      cart: updatedProduct,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "CART_ITEM_PRICE_TOTAL") {
    let { total_item, total_price } = state.cart.reduce(
      (accum, curElem) => {
        let { price, amount } = curElem;

        accum.total_item += amount;
        accum.total_price += price * amount;

        return accum;
      },
      {
        total_item: 0,
        total_price: 0,
      }
    );
    return {
      ...state,
      total_item,
      total_price,
    };
  }

  return state;
};

export default cartReducer;

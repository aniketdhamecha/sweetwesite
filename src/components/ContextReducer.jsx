import React, { useContext, createContext, useReducer } from "react";

const CreateStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          img: action.img,
          qty: action.qty,
          size: action.size
        }
      ] 
    case "REMOVE":
        let newArr = [...state];
        newArr.splice(action.index, 1);
        return newArr;

    case "UPDATE":    
    let arr = [...state];
    arr.find((food , index) => {
      if (food.id === action.id) {
        arr[index] = {
          ...food,
          qty: parseInt(action.qty),
          price: action.price + food.price
        };
        return ;
      }
      return arr;
    });
    return arr;
    case "DROP":
      return [];

    default:
      console.log("Error in reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CreateStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CreateStateContext.Provider>
  );
};

export const useCart = () => useContext(CreateStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

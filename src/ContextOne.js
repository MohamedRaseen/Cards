import * as React from "react";

let ContextOne = React.createContext();

let initialState = {
  formsData: null,
  modalData:null,
  showLoader: false
};

let reducer = (state, action) => {
  switch (action.type) {
    case "updateFormData":
      return {...state, formsData: action.data, modalData:null, showLoader: false};
    case "showModal":
      return {...state, modalData: action.data, showLoader: false};
    case "showLoader":
      return {...state, modalData: null ,showLoader: true};
    default:
      return initialState;
  }
};

function ContextOneProvider(props) {
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };

  return (
    <ContextOne.Provider value={value}>{props.children}</ContextOne.Provider>
  );
}

let ContextOneConsumer = ContextOne.Consumer;

export { ContextOne, ContextOneProvider, ContextOneConsumer };

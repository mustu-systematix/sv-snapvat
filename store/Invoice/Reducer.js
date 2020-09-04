import {
  GET_LIST_RESPONSE,
  GET_DETAILS_RESPONSE,
  GET_CUSTOMER_RESPONSE,
  GET_BRANCHES_RESPONSE,
  GET_ACCOUNTS_RESPONSE,
  CREATE_INVOICE_RESPONSE,
} from "./Action";

/** Import constant */

/** initialize the state */
export const INITIAL_STATE = {
  invoiceList: [],
  invoiceDetails: {},
  customerList: [],
  branches: [],
  accounts: [],
  createInvoice: {}
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LIST_RESPONSE:
      return { ...state, invoiceList: action.payload };
    case GET_DETAILS_RESPONSE:
      return { ...state, invoiceDetails: action.payload };
    case GET_CUSTOMER_RESPONSE:
      return { ...state, customerList: action.payload };
    case GET_BRANCHES_RESPONSE:
      return { ...state, branches: action.payload };
    case GET_ACCOUNTS_RESPONSE:
      return { ...state, accounts: action.payload };
    case CREATE_INVOICE_RESPONSE:
      return { ...state, createInvoice: action.payload };
    default:
      return state;
  }
}

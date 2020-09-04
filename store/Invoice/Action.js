export const GET_LIST_INITIATE = "GET_LIST_INITIATE";
export const GET_LIST_RESPONSE = "GET_LIST_RESPONSE";
export const GET_DETAILS_INITIATE = "GET_DETAILS_INITIATE";
export const GET_DETAILS_RESPONSE = "GET_DETAILS_RESPONSE";
export const GET_CUSTOMER_INITIATE = "GET_CUSTOMER_INITIATE";
export const GET_CUSTOMER_RESPONSE = "GET_CUSTOMER_RESPONSE";
export const GET_BRANCHES_INITIATE = "GET_BRANCHES_INITIATE";
export const GET_ACCOUNTS_INITIATE = "GET_ACCOUNTS_INITIATE";
export const GET_BRANCHES_RESPONSE = "GET_BRANCHES_RESPONSE";
export const GET_ACCOUNTS_RESPONSE = "GET_ACCOUNTS_RESPONSE";
export const CREATE_INVOICE_INITIATE = "CREATE_INVOICE_INITIATE";
export const CREATE_INVOICE_RESPONSE = "CREATE_INVOICE_RESPONSE";

export const getList = (params) => ({
  type: GET_LIST_INITIATE,
  params,
});

export const getCustomer = (params) => ({
  type: GET_CUSTOMER_INITIATE,
  params,
});

export const getDetails = (id) => ({
  type: GET_DETAILS_INITIATE,
  id,
});

export const getBranches = (id) => ({
  type: GET_BRANCHES_INITIATE,
  id,
});

export const getAccounts = (id) => ({
  type: GET_ACCOUNTS_INITIATE,
  id,
});

export const createInvoice = (postdata) => ({
  type: CREATE_INVOICE_INITIATE,
  postdata,
});

export const getListDispatch = (data) => ({
  type: GET_LIST_RESPONSE,
  payload: data,
});

export const getDetailsDispatch = (data) => ({
  type: GET_DETAILS_RESPONSE,
  payload: data,
});

export const getCustomerDispatch = (data) => ({
  type: GET_CUSTOMER_RESPONSE,
  payload: data,
});

export const getBranchesDispatch = (data) => ({
  type: GET_BRANCHES_RESPONSE,
  payload: data,
});

export const getAccountsDispatch = (data) => ({
  type: GET_ACCOUNTS_RESPONSE,
  payload: data,
});

export const createInvoiceDispatch = (data) => ({
  type: CREATE_INVOICE_RESPONSE,
  payload: data,
});

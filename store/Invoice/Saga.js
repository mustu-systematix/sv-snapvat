import { put, call, takeEvery } from "redux-saga/effects";
import {
  GET_LIST_INITIATE,
  getListDispatch,
  GET_DETAILS_INITIATE,
  getDetailsDispatch,
  GET_CUSTOMER_INITIATE,
  getCustomerDispatch,
  GET_BRANCHES_INITIATE,
  GET_ACCOUNTS_INITIATE,
  getBranchesDispatch,
  getAccountsDispatch,
  CREATE_INVOICE_INITIATE,
  createInvoiceDispatch
} from "./Action";
import Axios from "axios";

const token = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEwOTEyMzVmMzcwOTY3MGRhMmVkYWM4M2JjOTk2YmI2ZWNiZDZkNjVlOGRlNTI0NTk4ODYxYmYwNWI5YjczNWI5NWIwMDU3NTEzOGRiNjdlIn0.eyJhdWQiOiIwIiwianRpIjoiYTA5MTIzNWYzNzA5NjcwZGEyZWRhYzgzYmM5OTZiYjZlY2JkNmQ2NWU4ZGU1MjQ1OTg4NjFiZjA1YjliNzM1Yjk1YjAwNTc1MTM4ZGI2N2UiLCJpYXQiOjE1OTg5NzUzODIsIm5iZiI6MTU5ODk3NTM4MiwiZXhwIjoxNjE0NjEzNzgxLCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.LPousVBij_CljgNTFDgY1y5T84GbdPazuYPGC4epi27SRCdKzcCrXNIztv7kBrYL1CdMXJYPnFvcH-jme5uv_9L2ziCG3tx9Hu6MOMrY3eEKeNY38nlX5uHUmf15XMbCPEz5Oh1A1wNAm4kROxOUu56M70PiEYgZzFWfXmc3Ynz8NCanMKHnn39g_ZlFFBB7UUiHy1a9w1KJuFRLUg7cdzOGsnktxLvFYJpq3QnSV-l3VJCLHTBpcJO5D6Bx0dyWdbjUicnC5CTkEuF73kAGKfhPlDYX8SXTqMsV1OZdIvAk4zryomBcbC5NhBrbEUvl0DzuPckLrAluCLQYfPiup0hyYZmpYJRhoB38Qm6E3UO8Yg4s8SXXUqlyWIc7Lk57-3HqznaOHNfIhiv_-K9FzycToIqKlx7wcgcrM5ZupEa1HRQllIPOcN6KAQ0kFho4DdYrn0OS1g82EcpZ3m3nVt2I40jplfYVklonZfyi1vJAnjBVdjpOh10ojpWPRwFysNriO4_r4Vtzc47IbF1Rvp8dUPyuCMSZCs1u0dcGaRT5lTeFWECZqq0fH2n_iinYC2a_gT90w1emDebVgtamryx0WB3k-gfT8ctD9YFDR05Gj9sBgU7VQ4Bk45Vxm_uqCYykq3FoE0oz8jhQIIP86waiSC0hnTVExGbM95foMLs`;
const baseName =
  "https://api-in-staging-snapvatme-qa.azurewebsites.net/api/v1/";

const getInvoiceList = async (params) => {
  const apiName = baseName + "organization-invoices/8/?pagination=no";
  const response = await Axios.get(apiName, {
    headers: { Authorization: token },
  });
  return response.data;
};

const getInvoiceDetails = async (id) => {
  const apiName = baseName + "invoices/" + id;
  const response = await Axios.get(apiName, {
    headers: { Authorization: token },
  });
  return response.data.success.invoice;
};

const getCustomerList = async () => {
  const apiName =
    baseName + "organization-contacts/8/Customer?pagination=no&active=2";
  const response = await Axios.get(apiName, {
    headers: { Authorization: token },
  });
  return response.data.success.contacts;
};

const getBranches = async () => {
  const apiName =
    baseName + "organization-branches/8";
  const response = await Axios.get(apiName, {
    headers: { Authorization: token },
  });
  return response.data.success.branch;
};

const getAccounts = async () => {
  const apiName =
    baseName + "chart-accounts/1/8";
  const response = await Axios.get(apiName, {
    headers: { Authorization: token },
  });
  return response.data.success;
};

const createInvoice = async (postData) => {
  const apiName =
    baseName + "invoices";
  const response = await Axios.post(apiName, postData, {
    headers: { Authorization: token },
  });
  return response.data.success.invoice;
};

export function* handleGetList(params) {
  try {
    const data = yield call(getInvoiceList);
    yield put(getListDispatch(data.success));
  } catch (error) {
    yield put(getListDispatch([]));
  }
}

export function* handleGetDetails(params) {
  try {
    const data = yield call(getInvoiceDetails, params.id);
    yield put(getDetailsDispatch(data));
  } catch (error) {
    yield put(getDetailsDispatch({}));
  }
}

export function* handleGetCustomer(params) {
  try {
    const data = yield call(getCustomerList, params.id);
    yield put(getCustomerDispatch(data));
  } catch (error) {
    yield put(getCustomerDispatch([]));
  }
}

export function* handleGetBranches(params) {
  try {
    const data = yield call(getBranches, params.id);
    yield put(getBranchesDispatch(data));
  } catch (error) {
    yield put(getBranchesDispatch([]));
  }
}

export function* handleGetAccounts(params) {
  try {
    const data = yield call(getAccounts, params.id);
    yield put(getAccountsDispatch(data));
  } catch (error) {
    yield put(getAccountsDispatch([]));
  }
}

export function* handleCreateInvoice(params) {
  console.log('params: ', params);
  try {
    const data = yield call(createInvoice, params.postdata);
    yield put(createInvoiceDispatch(data));
  } catch (error) {
    yield put(createInvoiceDispatch({}));
  }
}

//watchers
export default function* watchList() {
  yield takeEvery(GET_LIST_INITIATE, handleGetList);
  yield takeEvery(GET_DETAILS_INITIATE, handleGetDetails);
  yield takeEvery(GET_CUSTOMER_INITIATE, handleGetCustomer);
  yield takeEvery(GET_BRANCHES_INITIATE, handleGetBranches);
  yield takeEvery(GET_ACCOUNTS_INITIATE, handleGetAccounts);
  yield takeEvery(CREATE_INVOICE_INITIATE, handleCreateInvoice);
}

import { useEffect, useState } from "react";
import actions from "../../store/Actions";
import { connect } from "react-redux";
import { sortingAnArrayOfObject, currencyFormaterAED } from "../../utils/Utils";
import { useRouter } from "next/router";
import { Input } from "antd";
import _ from "lodash"
import moment from "moment";

const getCustomers = actions.getCustomer;
const getBranches = actions.getBranches;
const getAccounts = actions.getAccounts;
const createInvoice = actions.createInvoice;
const createInvoiceDispatch = actions.createInvoiceDispatch;

function AddInvoice(props) {
  const [customerId, setCustomerId] = useState(0);
  const [placeOfSupplyId, setPlaceOfSupply] = useState(0);
  const [branchId, setBranchId] = useState(0);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [coa, setCoa] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isError, setError] = useState(false);
  const [standardRate, setStandardRate] = useState(0);
  const [tax, setTax] = useState(0);
  const [zeroRate, setZeroRate] = useState(0);
  const [exemptRate, setExemptRate] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const router = useRouter();

  useEffect(() => {

    props.getCustomers();
    props.getBranches();
    props.getAccounts();
  }, []);

  useEffect(() => {
    calculateTotal()
  }, [standardRate, exemptRate, zeroRate]);

  useEffect(() => {
    if(!_.isEmpty(props.createInvoiceData)){
      router.push("/")
      props.createInvoiceDispatch({})
    }
  }, [props.createInvoiceData]);

  const handleDateChange = (e) => {
    e.preventDefault();
    setInvoiceDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (invoiceNumber == "" || invoiceDate == "" || subTotal == 0) {
      setError(true)
      return;
    }
    const postData = {
      contactId: customerId == 0 ? props.customerList[0].id : customerId,
      attachments: [],
      organizationId: 8,
      type: "Non Item Wise",
      branchId: branchId == 0 ? props.branches[0].id : branchId,
      placeOfSupply:
        placeOfSupplyId == 0 ? props.branches[0].emirate : placeOfSupplyId,
      invoiceDate: moment(invoiceDate).format("DD-MM-YYYY"),
      status: 11,
      subTotalWithTax: parseFloat(standardRate) + parseFloat(tax),
      standardRate: parseFloat(standardRate) + parseFloat(tax),
      zeroRate: parseFloat(zeroRate),
      exempt: parseFloat(exemptRate),
      totalAmount: parseFloat(grandTotal),
      taxableAmount: parseFloat(standardRate),
      subTotalWithoutTax: parseFloat(subTotal),
      totalDiscountAmount: 0,
      notes: "8520",
      shippingAddressId: "",
      billingAddressId: "",
      chartOfAccountsId: 79,
      chartOfAccountsCode: "OIS",
      otherAmount: "",
      createdBy: 8,
      source: "Web",
      invoice: invoiceNumber,
    };

    props.createInvoice(postData);
  };

  const handleCustomerChange = (e) => {
    e.preventDefault();
    const id = e.target.value;
    setCustomerId(id);
  };

  const handleCoaChange = (e) => {
    e.preventDefault();
    const id = e.target.value;
    setCoa(id);
  };

  //Handle branch change and set emirates according to it
  const onBranchChange = (key) => {
    props.branches.map((el) => {
      if (el.id == key.target.value) {
        setPlaceOfSupply(el.emirate);
        setBranchId(el.id);
      }
    });
  };

  const handleInvoiceChange = (e) => {
    setInvoiceNumber(e.target.value + "-DEMO-" + Date.now());
  };

  const handleStandardRate = (e) => {
    const standardRate = e.target.value;
    const tax = (standardRate * 5) / 100
    if (standardRate) {
      setStandardRate(standardRate);
      setTax(tax)
    } else {
      setStandardRate(0);
      setTax(0)
    }
  }

  const handleZeroRate = (e) => {
    const zeroRate = e.target.value;
    if (zeroRate) {
      setZeroRate(zeroRate);
    } else {
      setZeroRate(0);
    }
  }

  const handleExemptRate = (e) => {
    const exemptRate = e.target.value;
    if (exemptRate) {
      setExemptRate(exemptRate);
    } else {
      setExemptRate(0);
    }
  }

  const calculateTotal = () => {
    const subTotal = parseFloat(standardRate) + parseFloat(zeroRate) + parseFloat(exemptRate);
    const grandTotal = subTotal + parseFloat(tax);
    setGrandTotal(grandTotal);
    setSubTotal(subTotal)
  }

  return (
    <div className="container">
      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
        crossOrigin="anonymous"
      ></link>
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <div className="col">
        <a target="_blank" href="https://www.snapvatme.com">
          <img
            src="https://app-in-staging-snapvatme-qa.azurewebsites.net/static/media/logo-login.05cbb65d.svg"
            data-holder-rendered="true"
          />
        </a>
      </div>
      <form className={"needs-validation" + isError == true ? "was-validated" : ""} novalidate onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="validationCustom01">Customer</label>
            <select
              type="text"
              className="form-control"
              id="validationCustom02"
              onChange={handleCustomerChange}
            >
              {props.customerList.map((el) => {
                return (
                  <option key={el.id} value={el.id}>
                    {el.company || el.displayName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="validationCustom02">Place of supply</label>
            <select
              type="text"
              className="form-control"
              id="validationCustom02"
              onChange={(key) => onBranchChange(key)}
            >
              {props.branches.sort(sortingAnArrayOfObject).map((el) => {
                return (
                  <option key={el.id} value={el.id}>
                    {`${el.emirateName} (${el.branchName})`}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="validationCustomUsername">Invoice Number</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend">
                  INV-
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                id="validationCustomUsername"
                placeholder=""
                aria-describedby="inputGroupPrepend"
                required
                onChange={handleInvoiceChange}
              />
              <div className="invalid-feedback">
                Please enter a invoice number.
              </div>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="validationCustom03">Invoice Date </label>
            <input
              type="date"
              className="form-control"
              id="validationCustom03"
              placeholder="City"
              required
              onChange={handleDateChange}
            />
            <div className="invalid-feedback">Please provide a valid date.</div>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationCustom04">chart of account</label>
            <select
              type="text"
              className="form-control"
              id="validationCustom02"
              onChange={handleCoaChange}
            >
              {props.accounts.map((el) => {
                return (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                );
              })}
            </select>
            <div className="invalid-feedback">
              Please provide a valid account.
            </div>
          </div>
        </div>
        <div id="invoice">
          <div className="invoice overflow-auto">
            <table border="0" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th className="text-right">#</th>
                  <th className="text-left">TAX DETAILS</th>
                  <th className="text-right">TAXABLE AMOUNT</th>
                  <th className="text-right">TAX AMOUNT</th>
                  <th className="text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="unit">1</td>
                  <td className="unit text-left">Standard Rate (5%)</td>
                  <td className="unit">
                    <Input type="number" onChange={handleStandardRate} />
                  </td>
                  <td className="unit ">
                    {currencyFormaterAED(
                      tax,
                      true
                    )}
                  </td>
                  <td className="total">
                    {currencyFormaterAED(
                      parseFloat(standardRate) + parseFloat(tax),
                      true
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="unit">2</td>
                  <td className="unit text-left">Zero Rate (5%)</td>
                  <td className="unit">
                    <Input type="number" onChange={handleZeroRate} />
                  </td>
                  <td className="unit">{currencyFormaterAED(0, true)}</td>
                  <td className="total">
                    {currencyFormaterAED(
                      zeroRate,
                      true
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="unit">3</td>
                  <td className="unit text-left">Exempt Rate (5%)</td>
                  <td className="unit">
                    <Input type="number" onChange={handleExemptRate} />
                  </td>
                  <td className="unit">{currencyFormaterAED(0, true)}</td>
                  <td className="total">
                    {currencyFormaterAED(
                      exemptRate,
                      true
                    )}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2"></td>
                  <td colspan="2">SUBTOTAL</td>
                  <td>
                    {currencyFormaterAED(subTotal, true)}
                  </td>
                </tr>
                <tr>
                  <td colspan="2"></td>
                  <td colspan="2">VAT AMOUNT</td>
                  <td>
                    {currencyFormaterAED(tax, true)}
                  </td>
                </tr>
                <tr>
                  <td colspan="2"></td>
                  <td colspan="2">GRAND TOTAL</td>
                  <td>
                    {currencyFormaterAED(grandTotal, true)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <button
              style={{ marginRight: "10px" }}
              className="btn btn-secondary"
              onClick={() => router.push("/")}
            >
              Cancel
        </button>
            <button className="btn btn-primary" type="submit">
              Create Invoice
        </button>
          </div>
        </div>
      </form>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    customerList: state.invoice.customerList,
    accounts: state.invoice.accounts,
    branches: state.invoice.branches,
    createInvoiceData: state.invoice.createInvoice
  };
};

export default connect(mapStateToProps, {
  getCustomers,
  getAccounts,
  getBranches,
  createInvoice,
  createInvoiceDispatch
})(AddInvoice);

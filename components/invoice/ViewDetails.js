import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Dropdown, Icon, Layout, Menu, Modal, Table } from "antd";

import actions from "../../store/Actions";
import { invoiceColumns } from "../../utils/Table";
import { currencyFormaterAED, checkNameForElipses } from "../../utils/Utils";
import Link from "next/link";

const getInvoiceDetails = actions.getDetails;

const View = (props) => {
  const [invoiceDetails, setInvoiceDetails] = useState({});

  useEffect(() => {
    props.getInvoiceDetails(props.id);
  }, []);

  useEffect(() => {
    setInvoiceDetails(props.invoiceDetails);
  }, [props.invoiceDetails]);

  return (
    <div style={{ margin: "20px" }}>
      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <div id="invoice">
        <div className="toolbar hidden-print">
          <div className="text-right">
            <Link href="/"> 👈Back</Link>
          </div>
          <hr />
        </div>
        <div className="invoice overflow-auto">
          <div style={{ minWidth: "600px" }}>
            <header>
              <div className="row">
                <div className="col">
                  <a target="_blank" href="https://www.snapvatme.com">
                    <img
                      src="https://app-in-staging-snapvatme-qa.azurewebsites.net/static/media/logo-login.05cbb65d.svg"
                      data-holder-rendered="true"
                    />
                  </a>
                </div>
                <div className="col company-details">
                  <h2 className="name">
                    <a target="_blank" href="https://lobianijs.com">
                      {checkNameForElipses(invoiceDetails.company || invoiceDetails.contactDisplayName, 25)}
                    </a>
                  </h2>
                  <div>
                    {invoiceDetails.billingAddress
                      ? invoiceDetails.billingAddress.zipcode + ","
                      : ""}{" "}
                    {invoiceDetails.billingAddress
                      ? invoiceDetails.billingAddress.street1
                        ? invoiceDetails.billingAddress.street1
                        : invoiceDetails.billingAddress.street2
                      : "N/A"}
                    ,
                    {invoiceDetails.billingAddress
                      ? invoiceDetails.billingAddress.city
                      : ""}{" "}
                  </div>
                  <div>(123) 456-789</div>
                  <div>
                    {invoiceDetails.contactEmail
                      ? invoiceDetails.contactEmail
                      : ""}
                  </div>
                </div>
              </div>
            </header>
            <main>
              <div className="row contacts">
                <div className="col invoice-to">
                  <div className="text-gray-light">INVOICE TO:</div>
                  <h2 className="to">{checkNameForElipses(invoiceDetails.company || invoiceDetails.contactDisplayName, 25)}</h2>
                  <div className="address">
                    {invoiceDetails.billingAddress
                      ? invoiceDetails.billingAddress.zipcode + ","
                      : ""}{" "}
                    {invoiceDetails.billingAddress
                      ? invoiceDetails.billingAddress.street1
                        ? invoiceDetails.billingAddress.street1
                        : invoiceDetails.billingAddress.street2
                      : "N/A"}
                    ,
                    {invoiceDetails.billingAddress
                      ? invoiceDetails.billingAddress.city
                      : ""}{" "}
                  </div>
                  <div className="email">
                    <a href="">
                      {invoiceDetails.contactEmail
                        ? invoiceDetails.contactEmail
                        : ""}
                    </a>
                  </div>
                </div>
                <div className="col invoice-details">
                  <h1 className="invoice-id">{invoiceDetails.invoiceNumber ? invoiceDetails.invoiceNumber.split("-DEMO-")[0]: "" }</h1>
                  <div className="date">
                    Date of Invoice: {invoiceDetails.dueDate}
                  </div>
                  <div className="date">Due Date: {invoiceDetails.dueDate}</div>
                </div>
              </div>
              {invoiceDetails.particulars &&
              invoiceDetails.particulars.length ? (
                <table border="0" cellspacing="0" cellpadding="0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-left">DESCRIPTION</th>
                      <th className="text-right">QTY</th>
                      <th className="text-right">UNIT PRICE</th>
                      <th className="text-right">DISCOUNT</th>
                      <th className="text-right">VAT</th>
                      <th className="text-right">TAXABLE AMOUNT</th>
                      <th className="text-right">VAT Amt</th>
                      <th className="text-right">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceDetails.particulars &&
                      invoiceDetails.particulars.map((el, i) => {
                        return (
                          <tr>
                            <td className="no">{i + 1}</td>
                            <td className="text-left">
                              {el.itemName} ({el.itemCode})
                            </td>
                            <td className="qty">{el.quantity}</td>
                            <td className="unit">
                              {currencyFormaterAED(el.rate, true)}
                            </td>
                            <td className="unit">{el.totalDiscount}%</td>
                            <td className="unit">{el.taxCode}</td>
                            <td className="unit">
                              {currencyFormaterAED(el.amountBeforeTax, true)}
                            </td>
                            <td className="unit">
                              {currencyFormaterAED(el.taxAmount, true)}
                            </td>
                            <td className="total">
                              {currencyFormaterAED(el.totalAmount, true)}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2"></td>
                      <td colspan="2"></td>
                      <td colspan="2"></td>
                      <td colspan="2">SUBTOTAL</td>
                      <td>
                        {currencyFormaterAED(invoiceDetails.subTotal, true)}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2"></td>
                      <td colspan="2"></td>
                      <td colspan="2"></td>
                      <td colspan="2">VAT AMOUNT</td>
                      <td>
                        {currencyFormaterAED(invoiceDetails.totalTax, true)}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2"></td>
                      <td colspan="2"></td>
                      <td colspan="2"></td>
                      <td colspan="2">GRAND TOTAL</td>
                      <td>
                        {currencyFormaterAED(invoiceDetails.totalAmount, true)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
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
                        {currencyFormaterAED(
                          invoiceDetails.taxableAmount,
                          true
                        )}
                      </td>
                      <td className="unit ">
                        {currencyFormaterAED(invoiceDetails.totalTax, true)}
                      </td>
                      <td className="total">
                        {currencyFormaterAED(
                          invoiceDetails.subTotalWithTax,
                          true
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="unit">2</td>
                      <td className="unit text-left">Zero Rate (5%)</td>
                      <td className="unit">
                        {currencyFormaterAED(
                          invoiceDetails.subTotalWithZeroRated,
                          true
                        )}
                      </td>
                      <td className="unit">{currencyFormaterAED(0, true)}</td>
                      <td className="total">
                        {currencyFormaterAED(
                          invoiceDetails.subTotalWithZeroRated,
                          true
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="unit">3</td>
                      <td className="unit text-left">Exempt Rate (5%)</td>
                      <td className="unit">
                        {currencyFormaterAED(
                          invoiceDetails.subTotalWithExempt,
                          true
                        )}
                      </td>
                      <td className="unit">{currencyFormaterAED(0, true)}</td>
                      <td className="total">
                        {currencyFormaterAED(
                          invoiceDetails.subTotalWithExempt,
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
                        {currencyFormaterAED(invoiceDetails.subTotal, true)}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2"></td>
                      <td colspan="2">VAT AMOUNT</td>
                      <td>
                        {currencyFormaterAED(invoiceDetails.totalTax, true)}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2"></td>
                      <td colspan="2">GRAND TOTAL</td>
                      <td>
                        {currencyFormaterAED(invoiceDetails.totalAmount, true)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}
              <div className="thanks">Thank you!</div>
              <div className="notices">
                <div>NOTICE:</div>
                <div className="notice">
                  {invoiceDetails.notes ? invoiceDetails.notes : "N/A"}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    invoiceDetails: state.invoice.invoiceDetails,
  };
};

export default connect(mapStateToProps, { getInvoiceDetails })(View);

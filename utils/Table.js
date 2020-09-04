import { Tag } from "antd";
import Link from "next/link";
import React from "react";
import {
  formatDate,
  currencyFormaterAED,
  getStatusName,
  checkNameForElipses,
} from "./Utils";

export const invoiceColumns = () => {
  return [
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      dataIndexForSort: "invoiceNumber",
      sorter: true,
      key: "invoiceNumber",
      width: 170,
      render: (text, record) => {
        return (
          <Link href="view/[id]" as={`/view/${record.id}`}>
            {/* <a> */}
            <div style={{ cursor: "pointer" }}>
              <span className="text-link">{record.invoiceNumber ? record.invoiceNumber.split("-DEMO-")[0]: "" }</span>
              <br />
              <span style={{ textTransform: "capitalize" }}>
                {checkNameForElipses(record.company, 40) || ""}
              </span>
            </div>
            {/* </a> */}
          </Link>
        );
      },
    },
    {
      title: "Status" + "/" + "Date",
      sorter: true,
      dataIndex: "invoiceDate",
      dataIndexForSort: "invoiceDate",
      width: 115,
      render: (text, record) => {
        return (
          <React.Fragment>
            <Tag
              style={{ textTransform: "capitalize" }}
              color={getStatusName(record.status).color}
            >
              {record.statusName}{" "}
            </Tag>
            <br />
            {formatDate(text)}
          </React.Fragment>
        );
      },
    },
    {
      title: "Place of supply",
      sorter: true,
      dataIndex: "branchName",
      dataIndexForSort: "branchName",
      width: 170,
      render: (text, record) =>
        text == "" ? (
          "N/A"
        ) : (
          <span>
            {record.branchEmirateName}
            <br /> <i>{checkNameForElipses(text, 20)}</i>
          </span>
        ),
    },
    {
      title: "SalesAccount",
      sorter: true,
      dataIndex: "chartOfAccountsName",
      dataIndexForSort: "chartOfAccountsName",
      width: 170,
      render: (text, record) => (text == "" ? "N/A" : text),
    },

    // {
    //     title: langs.labels.date,
    //     dataIndex: 'invoiceDate',
    //     dataIndexForSort: 'invoiceDate',
    //     sorter: true,
    //     render: (text, record) => formatDate(text)
    // },
    // {
    //     title: langs.labels.customerName,
    //     sorter: true,
    //     dataIndex: 'contactDisplayName',
    //     dataIndexForSort: 'contactDisplayName',
    // },
    // {
    //     title: langs.labels.status,
    //     sorter: true,
    //     dataIndexForSort: 'status',
    //     dataIndex: 'statusName',
    //     render: (text, record) => <span style={{ textTransform: 'uppercase' }}>{text}</span>
    // },
    {
      title: "VAT Amount",
      dataIndex: "totalTax",
      dataIndexForSort: "totalTax",
      width: 170,
      sorter: true,
      className: "align-right",
      render: (text, record) => (
        <label className={"table-amount"}>
          {currencyFormaterAED(text ? text : 0, true)}
        </label>
      ),
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      dataIndexForSort: "totalAmount",
      width: 170,
      sorter: true,
      className: "align-right",
      render: (text, record) =>
        record.chartOfAccountsId != 80 ? (
          <label className={"table-amount"}>
            {currencyFormaterAED(text, true)}
          </label>
        ) : (
          <label className={"table-amount"}>
            {currencyFormaterAED(record.subTotal, true)}
          </label>
        ),
    },
  ];
};

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Dropdown, Icon, Layout, Menu, Modal, Table } from "antd";
import { useRouter } from "next/router";

import actions from "../../store/Actions";
import { invoiceColumns } from "../../utils/Table";
import Link from "next/link";

const getInvoiceList = actions.getList;

const List = (props) => {
  const [invoiceList, setInvoiceList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    props.getInvoiceList();
  }, []);

  useEffect(() => {
    setInvoiceList(props.invoiceList);
  }, [props.invoiceList]);

  return (
    <div style={{ margin: "20px" }}>
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
      <div className="toolbar hidden-print">
        <div className="text-right">
          <button
            id="printInvoice"
            onClick={() => router.push("/create", `/create`,)}
            className="btn btn-info"
          >
            <i className="fa fa-plus"></i> Create
          </button>
        </div>
      </div>
      <Table
        loadingIndicator="Loading..."
        columns={invoiceColumns()}
        dataSource={invoiceList}
        size="small"
        className="complex-table"
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    invoiceList: state.invoice.invoiceList.invoices,
  };
};

export default connect(mapStateToProps, { getInvoiceList })(List);

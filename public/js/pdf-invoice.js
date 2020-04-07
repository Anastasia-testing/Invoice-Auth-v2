// get session storage of invoice id
// const fs = require("fs");
const invoiceID = sessionStorage.getItem("id");
const orderSubReportContainer = document.getElementById("order-sub-report");
const paymentSubrptContainer = document.getElementById("payment-sub-report");
// variables for invoice footer/summary
let totalInvoiceAmt;
let discount;
let totalPaidAmt = 0;


function renderSalesOrder(order, orderSubReportContainer) {
  // show result the found sales order
  orderSubReportContainer.innerHTML = `<div id="order-id" class="col-2 text-center">${order.id}</div>
                                         <div id="order-desc" class="col-8"> ${order.description} </div>
                                         <div id="order-amt" class="col-2 text-right"> ${order.amount}</div>`;
}

function renderPaymentSubRpt(data, paymentSubrptContainer) {
  const innerHTML = data.map(function(payment) {
    return `<div class="row sub-report-row sub-report-text py-1">
                        <div id="payment-id" class="col-2 col-sm-2 col-md-2 text-center">${payment.invoice_id}</div>
                        <div id="payment-create" class="col-4">${payment.createdAt}</div>
                        <div id="payment-amt" class="col-6 text-right"> ${payment.amount} </div>
                  </div>`;
  });
  paymentSubrptContainer.innerHTML = innerHTML.join("\n");
}



// show invoice number
document.getElementById( "invoice-number" ).innerHTML = `INVOICE No. ${invoiceID}`;
// # show sub reports 'sales order'
// ## get order id of the invoice
axios.get(`/api/invoices/${invoiceID}`).then(invoice => {
  console.log(invoice);
  console.log("order id: ", invoice.data.salesorder_id);
  // INVOICE FOOTER
  discount = invoice.data.discount;
  if (discount === null) {
    discount = 0;
  }
  console.log("discount: ", discount);

  console.log("discount: ", discount);
  // .... get order info
  axios.get(`api/salesorders/${invoice.data.salesorder_id}`).then(order => {
    // render order info to html page
    renderSalesOrder(order.data[0], orderSubReportContainer);

    // INVOICE FOOTER
    totalInvoiceAmt = order.data[0].amount;

    console.log("Total Invoice Amt: ", totalInvoiceAmt);

    // # Show sub report 'payments'
    //  - get payment IDs of the invoice
    //  - render payment info
    axios.get("/api/payments").then(res => {
      const results = [];
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].invoice_id === parseInt(invoiceID)) {
          results.push(res.data[i]);
          totalPaidAmt = totalPaidAmt + parseFloat(res.data[i].amount);
        }
      }
      console.log(results);
      console.log("total paid: ", totalPaidAmt);
      renderPaymentSubRpt(results, paymentSubrptContainer);

      // INVOICE FOOTER/SUMMARY
      async function showInvoiceFooter() {
        const invoiceTotal = document.getElementById("invoice-total");
        const paidAmount = document.getElementById("paid-amount");
        const discountEl = document.getElementById("discounted-amount");
        const balanceDue = document.getElementById("balance-due");

        const totalInvoice = await totalInvoiceAmt;
        const discountAmt = await discount;
        const totalPaid = await totalPaidAmt;

        // show footer
        invoiceTotal.innerHTML = "$" + parseFloat(totalInvoice);
        paidAmount.innerHTML = "$" + totalPaid;
        discountEl.innerHTML = "$" + discountAmt;
        balanceDue.innerHTML =
          "$" + (totalInvoiceAmt - totalPaid - discountAmt);
      }
      showInvoiceFooter();

      // PRINT PDF
      document.getElementById("pdf-btn").addEventListener("click", function() {
        // convertToPDF();
        // open in new tap;
        order_report = document.getElementById("order-sub-report").innerHTML;
        console.log(order_report);
        const order_no = document.getElementById("order-id").innerHTML;
        const description = document.getElementById("order-desc").innerHTML;
        const amount = document.getElementById("order-amt").innerHTML;

        const invoice_no = document.getElementById("payment-id").innerHTML;
        const paid_date = document.getElementById("payment-create").innerHTML;
        const paid_amount = document.getElementById("payment-amt").innerHTML;

        const invoiceTotal = document.getElementById("invoice-total").innerHTML;
        const paidAmount = document.getElementById("paid-amount").innerHTML;
        const discountEl = document.getElementById("discounted-amount").innerHTML;
        const balanceDue = document.getElementById("balance-due").innerHTML;

        let docDef = {
          content: [
            {text: "Sales Orders", style: "header"},
            {
              style: "tableExample",
              table: {
                widths: [150, "auto", 150],
                body: [
                  [{text: "Order #", fillColor: "grey", color: "white"}, {text: "Description", fillColor: "grey", color: "white"}, {text: "Amount", fillColor: "grey", color: "white"}],
                  [order_no, description, `$ ${amount}`]
                ]
              }
            },
            {text: "Payment", style: "header"},
            {
              style: "tableExample",
              table: {
                widths: [150, "auto", 150],
                body: [
                  [{text: "Invoice #", fillColor: "grey", color: "white"}, {text: "Paid Date", fillColor: "grey", color: "white"}, {text: "Paid Amount", fillColor: "grey", color: "white"}],
                  [invoice_no, paid_date, `$ ${paid_amount}`]
                ]
              }
            },
            // {text: 'Payment', style: 'header'},
            {
              style: "tableExample",
              table: {
                widths: ["auto", "auto", "auto", "auto"],
                body: [
                  [{text: "Invoice Total", fillColor: "grey", color: "white"}, {text: "Paid Amount", fillColor: "grey", color: "white"}, {text: "Discount", fillColor: "grey", color: "white"}, {text: "Balance Due", fillColor: "grey", color: "red"}],
                  [`$ ${invoiceTotal}`, `$ ${paidAmount}`, `$ ${discountEl}`, `$ ${balanceDue}`]
                ]
              }
            }
          ]
        };

        pdfMake.createPdf(docDef).download();
      });
    });
  });
});

const orderIdEl = document.getElementById("order-id");
const payAmountEl = document.getElementById("pay-amount");
const discountAmountEl = document.getElementById("discount-amount");
const generateInvoiceBtnEl = document.getElementById("generate-btn");
const pdfBtnEl = document.getElementById("pdf-btn");
const searchBtnEl = document.getElementById("search-btn");
const subReportSectionContainer = document.getElementById("sub-report-section");
const orderSubReportContainer = document.getElementById("order-sub-report");

// search sales order

// create invoice
function activateGenerateButtons() {
  // add click event to button 'Generate Invoice'
  generateInvoiceBtnEl.addEventListener("click", e => {
    // ## validate input
    if (payAmountEl.value === "") {
      payAmountEl.value = 0;
    }
    if (discountAmountEl.value === "") {
      discountAmountEl.value = 0;
    }
    if (isNaN(payAmountEl.value) || isNaN(discountAmountEl.value)) {
      alert("Discount amount and Amount to Pay must be number!");
    } else {
      // 1. insert into invoice table
      // 2. insert into payment tablef
      axios.post("/api/invoices", {
        salesorder_id: orderIdEl.value,
        amount_paid: payAmountEl.value,
        discount: discountAmountEl.value
      })
        .then(function(inv) {
          // insert into payment table
          console.log("invoice: ", inv);
          axios.post("/api/payments", {
            invoice_id: inv.data.dbInvoice.id,
            amount: payAmountEl.value
          })
            .then(function(pmt) {
              console.log("Payment: ", pmt);
              // update invoice summary
              axios.get(`/api/salesorders/${orderIdEl.value}`).then(order => {
                const invoiceNum = document.getElementById("invoice-number");
                const invoiceTotal = document.getElementById("invoice-total");
                const paidAmount = document.getElementById("paid-amount");
                const discount = document.getElementById("discounted-amount");
                const balanceDue = document.getElementById("balance-due");
                invoiceNum.innerHTML = inv.data.id;
                invoiceTotal.innerHTML = "$" + order.data[0].amount;
                paidAmount.innerHTML = "$" + inv.data.dbInvoice.amount_paid;
                discount.innerHTML = "$" + inv.data.dbInvoice.discount;
                balanceDue.innerHTML =
                  "$" +
                  (order.data[0].amount -
                    inv.data.dbInvoice.amount_paid -
                    inv.data.dbInvoice.discount);

                //create session storage of invoice id
                sessionStorage.setItem("id", inv.data.dbInvoice.id);
                window.location.href = "./pdf-invoice.html";
              })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  });
}

// Print PDF
function activatePDFButtons() {
  pdfBtnEl.addEventListener("click", e => {
    if (payAmountEl.value === "") {
      payAmountEl.value = 0;
    }
    if (discountAmountEl.value === "") {
      discountAmountEl.value = 0;
    }
    if (isNaN(payAmountEl.value) || isNaN(discountAmountEl.value)) {
      alert("Discount amount and Amount to Pay must be number!");
    } else {
      axios.post("/api/invoices", {
        salesorder_id: orderIdEl.value,
        amount_paid: payAmountEl.value,
        discount: discountAmountEl.value
      })
        .then(function(inv) {
        // insert into payment table
          axios.post("/api/payments", {
            invoice_id: inv.data.dbInvoice.id,
            amount: payAmountEl.value
          })
            .then(function(pmt) {
            // update invoice summary
              axios.get(`/api/salesorders/${orderIdEl.value}`).then(order => {
                const invoice_no = inv.data.id;
                const invoiceTotal = "$" + order.data[0].amount;
                const paidAmount = "$" + inv.data.dbInvoice.amount_paid;
                const discount = "$" + inv.data.dbInvoice.discount;
                const balanceDue = "$" + (order.data[0].amount - inv.data.dbInvoice.amount_paid - inv.data.dbInvoice.discount);
                const order_no = order.data[0].id;
                const description = order.data[0].description;
                const amount = order.data[0].amount;
                const paid_date = inv.data.dbInvoice.createdAt;
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
                          [invoice_no, paid_date, `$ ${paidAmount}`]
                        ]
                      }
                    },
                    {text: "Payment", style: "header"},
                    {
                      style: "tableExample",
                      table: {
                        widths: ["auto", "auto", "auto", "auto"],
                        body: [
                          [{text: "Invoice Total", fillColor: "grey", color: "white"}, {text: "Paid Amount", fillColor: "grey", color: "white"}, {text: "Discount", fillColor: "grey", color: "white"}, {text: "Balance Due", fillColor: "grey", color: "red"}],
                          [`$ ${invoiceTotal}`, `$ ${paidAmount}`, `$ ${discount}`, `$ ${balanceDue}`]
                        ]
                      }
                    }
                  ]
                };
                pdfMake.createPdf(docDef).download();
              })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  });
}



function renderSalesOrder(order, orderSubReportContainer) {
  // show sub report section
  subReportSectionContainer.setAttribute("class", "container-fluid");
  // show result the found sales order
  orderSubReportContainer.innerHTML = `<div class="col-3">${order.id}</div>
  <div class="col-7"> ${order.description} </div>
                                         <div class="col-2 text-right"> ${order.amount}</div>`;
}

searchBtnEl.addEventListener("click", e => {
  axios.get(`/api/salesorders/${orderIdEl.value}`).then(res => {
    console.log(res);
    if (res.data.length === 0) {
      alert(
        `The sales order number ${orderIdEl.value} that you entered DOES NOT EXIST!`
      );
      orderIdEl.focus();
    } else {
      // show sub reports
      // render sub reports: sales order & payment
      renderSalesOrder(res.data[0], orderSubReportContainer);
      // generate invoice

      activateGenerateButtons();
      activatePDFButtons();
      // print PDF
    }
  });
});
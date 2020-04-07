const firstnameEl = document.getElementById("firstname");
const lastnameEl = document.getElementById("lastname");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone-number");
const msgRow = document.getElementById("msg-row");
const newCustomerContainer = document.getElementById("new-customer-container");
// Numbers with length of 10 digits
// const phoneno = /^\d{10}$/;
// Numbers of any length
const phoneno = /\d+/g;

// Add click event to the button "Create"
document.getElementById("create-btn").addEventListener("click", function() {
  console.log('Button Clicked')
  if (
    !phoneEl.value.match(phoneno) ||
    phoneEl.value.length > 10 ||
    firstnameEl.value === "" ||
    lastnameEl.value === "" ||
    emailEl.value === ""
  ) {
    msgRow.setAttribute("class", "row bg-warning my-3 mx-5 p-2");
    document.getElementById("msg").innerHTML =
      "ERROR: Each field must be filled, and phone number must be number with max length of 10 digits!";
  } else {
    // sends data to server
    axios
      .post("/api/customers", {
        first_name: firstnameEl.value,
        last_name: lastname.value,
        email: emailEl.value,
        phone_number: phoneEl.value
      })
      .then(function(res) {
        console.log(res);
        showResultHTML(res.data, newCustomerContainer);
        // clears error message
        msgRow.setAttribute("class", "d-none");
        // resets all inputs
        firstnameEl.value = "";
        lastnameEl.value = "";
        firstnameEl.focus();
        lastnameEl.focus();
        emailEl.value = "";
        phoneEl.value = "";
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});

function showResultHTML(data, resultContainer) {
  resultContainer.setAttribute("class", "container-fluid");
  // ## new row to show newly created customer
  const newCustomerEl = document.createElement("div");
  newCustomerEl.setAttribute(
    "class",
    "row sub-report-text sub-report-row py-1"
  );
  newCustomerEl.innerHTML = `<div class="col-2">${data.id}</div>
     <div class="col-2">${data.first_name}</div>
     <div class="col-2">${data.last_name}</div>
     <div class="col-2">${data.email}</div>
     <div class="col-2 text-right"> ${data.phone_number} </div>`;
  resultContainer.appendChild(newCustomerEl);
}
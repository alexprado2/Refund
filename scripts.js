//select form elements
const amount = document.getElementById("amount")

//capture input event to format value
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")

    amount.value = value
}

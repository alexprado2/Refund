//select form elements
const amount = document.getElementById("amount")

//capture input event to format value
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")

    value = Number(value) / 100

    amount.value = formatCurrencyBRL(value)
    
}

//formatting the value in BRL standard
function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    return value
}


//select form elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//select elements from the list
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

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

//capture the submit event to obtain the values
form.onsubmit = (event) => {
    event.preventDefault()

    //object with new expenses
    const newExpense = {
        id:new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    //call the function that will add the item to the list
    expenseAdd(newExpense)
}

//add new item to list
function expenseAdd(newExpense) {
    try {
        //create elements li to add to the list
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")
         
        //create the category icon
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //creates expense information
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //create expense name
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //create expense category
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //add name and category to expenseInfo
        expenseInfo.append(expenseName, expenseCategory)

        //creates the value of the expense
        const expenseAmont = document.createElement("span")
        expenseAmont.classList.add("expense-amount")
        expenseAmont.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace("R$", "")}`
        
        //create the remove icon
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src","img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        //Add information to the item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmont, removeIcon)      

        //add the item to the list
        expenseList.append(expenseItem)
        
        //updates the totals
        updateTotals()

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        // console.log(error)
    }
}

//updates the totals
function updateTotals() {
    try{
        //retrieves all items (li) from the list
        const items = expenseList.children

        //updates the number of items in the list
        expensesQuantity.textContent = `${items.length}
         ${items.length > 1 ? "despesas" : "despesa"}`

         
        //creates variable to increase the total
        let total = 0

        //scroll through each item (li) in the list (ul)
        for(item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            //remove non-numeric characters
            let valeu = itemAmount.textContent.replace(/[^\d,]/g, ""). replace("," , ".")

            //converts the value to float
            valeu = parseFloat(valeu)

            //check if it is a valid number
            if (isNaN(valeu)){
                return alert("Não foi possivel calcular o total. O valor não parece ser um número.")
            }

            //increases the total value
            total += Number(valeu)
        }

        //creates the span for R$
        const symbolBRL =  document.createElement("small")
        symbolBRL.textContent = "R$"

        //formats the value and removes the R$
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        //cleans the HTML content
        expensesTotal.innerHTML = ""

        //add the symbol and the total value
        expensesTotal.append(symbolBRL, total)

    } catch (error) {
        alert("Não foi possível atualizar os totais.")
        // console.log(error)
    }
}
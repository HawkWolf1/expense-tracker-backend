                const itemsPerPage = 5;

                const expensesList = document.getElementById("listOfExpenses");

                const paginationDiv = document.createElement("div");
                paginationDiv.setAttribute("id", "paginationDiv")

                const totalExpenses = expensesList.children.length;
                const totalPages = Math.ceil(totalExpenses / itemsPerPage);

                let currentPage = 1;

                function showItemsPerPage() {
                    const startIndex = (currentPage - 1) * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;

                    for (let i = 0; i < totalExpenses; i++) {
                        if (i >= startIndex && i < endIndex) {
                            expensesList.children[i].style.display = "block";
                        } else {
                            expensesList.children[i].style.display = "none";
                        }
                    }
                    console.log(`Items per page shown: page ${currentPage}`);
                }

                function showPreviousPage() {
                    if (currentPage > 1) {
                        currentPage--;
                        showItemsPerPage();
                        console.log("A button clicked");
                    }
                }

                
                function showNextPage() {
                    if (currentPage < totalPages) {
                        currentPage++;
                        showItemsPerPage();
                        console.log("Next button clicked");
                    }
                }

                showItemsPerPage();

                paginationDiv.innerHTML = `
                <button id="prevButton">Prev</button>
                <button id="nextButton">Next</button>
                `

                expensesList.insertAdjacentElement("afterend", paginationDiv);
                
                
                const prevButton = document.getElementById("prevButton");
                const nextButton = document.getElementById("nextButton");

                prevButton.addEventListener("click", () => {
                    showPreviousPage();
                    console.log("Previous button clicked.");
                });

                nextButton.addEventListener("click", () => {
                    showNextPage();
                    console.log("Next button clicked.");
                })

  
                // prevButton.addEventListener("click", showPreviousPage);
                // nextButton.addEventListener("click", showNextPage);
                console.log('event listeners added')





// .................................................................

window.addEventListener("DOMContentLoaded", async(event) => {
    const token = localStorage.getItem('token')
    const decodeToken = parseJwt(token)
    const isPremiumUser = decodeToken.isPremiumUser
    
    if(isPremiumUser){
     showPremiumUserMessage()                    
     showLeaderboard()
     download()                   
    }
    
    event.preventDefault()
    try{
        const page = 1
        const itemsPerPage = 5
        const expensesList = document.getElementById("listOfExpenses");

    const xyz = await axios.get(`http://localhost:4000/expense/get-expense?page=${page}`, {headers: {'Authorization' : token}})
    console.log(xyz)

    const totalExpenses = xyz.data.ex.length;
    const totalPages = Math.ceil(totalExpenses / itemsPerPage)

    const paginationDiv = document.createElement("div");
    paginationDiv.setAttribute("id", "paginationDiv")
    expensesList.insertAdjacentElement("afterend", paginationDiv);

    const prevButton = document.createElement("button");
    prevButton.setAttribute("id", "prevButton");
    prevButton.textContent = "Prev";
    paginationDiv.appendChild(prevButton)

    const nextButton = document.createElement("button");
    nextButton.setAttribute("id", "nextButton");
    nextButton.textContent = "Next";
    paginationDiv.appendChild(nextButton);

    prevButton.addEventListener("click", () => {
        if (page > 1) {
            page--;
            showPage(page);
        }
    });

    nextButton.addEventListener("click", () => {
        if (page < totalPages) {
            page++;
            showPage(page);
        }
    });

    function showPage(page){
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalExpenses)
    
        for (let i = 0; i < totalExpenses; i++) {
            if (i >= startIndex && i < endIndex) {
                expensesList.children[i].style.display = "block";
            } else {
                expensesList.children[i].style.display = "none";
            }
        }

}
    showPage(page)
         }catch(err){                       
        console.log("Error Block: ",err)
    }
  
})





// // # TOKEN_SECRET =
// RAZORPAY_KEY_ID=rzp_test_KejApkBrX7U9oC
// RAZORPAY_KEY_SECRET=XBBD0VRiMREsDkY4Llr3HuUX

// AWS_USER_KEY=AKIA4SOW2FQHTQ6MYZXF
// AWS_USER_SECRET=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


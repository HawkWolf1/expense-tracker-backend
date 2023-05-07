async function saveToLocalStorage(event){
    event.preventDefault()
    const amount = document.getElementById('amount').value
    const description = document.getElementById('description').value
    const category = document.getElementById('category').value

    const myObject = {
        amount,
        description,
        category
    }
    const token = localStorage.getItem('token')
    try{
        const abc = await axios.post("http://localhost:4000/expense/add-expense", myObject,  {headers: {'Authorization' : token}}) 
            showNewUserOnScreen(abc.data.expense)   
    }  
    catch(err){
        document.body.innerHTML = document.body.innerHTML + "<h3 style='color:red'> Description !!! </h3>"
        console.log("Error Block: ",err)
    }                  
}




function showPremiumUserMessage(){
    document.getElementById("Premium1").remove() 
    document.getElementById("premium_user").innerHTML = "<h3 style='color:red;'> ***YOU ARE A PREMIUM USER!*** </h3>"

}




function showLeaderboard(){
    const a = document.createElement('input')
    a.type = 'button'
    a.id = 'board'
    a.value = 'Show Leaderboards'

    const b = document.createElement('div')
    b.id = 'container'

    a.onclick = async() =>{
        console.log('leaderboard working')
        const token = localStorage.getItem('token')
        const response = await axios.get("http://localhost:4000/premium/showleaderboard", {headers: {'Authorization': token}})

        const c = response.data
        console.log(c)

        const d = document.createElement('ul');
        d.id = 'leaderboard-list';
        
        c.forEach(userDetails => {
            const e = document.createElement('li')
            e.textContent = `Name - ${userDetails.name}, Total Cost - ${userDetails.totalExpenses}`

            d.appendChild(e)
        })

        b.innerHTML = '<h3>Leaderboards</h3>';
        b.appendChild(d);
        
    }
    document.getElementById('premium_user').appendChild(a);
    document.getElementById('premium_user').appendChild(b);
}





function download(){
    const token = localStorage.getItem('token')
    const decodeToken = parseJwt(token)
    const isPremiumUser = decodeToken.isPremiumUser
    
    const a = document.createElement('input')
    a.type = 'button'
    a.id = 'download'
    a.value = 'Download Expenses'
    

    if (isPremiumUser) {
        a.onclick = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/download', { headers: { 'Authorization': token } });
                const fileUrl = response.data.fileUrl;
                window.open(fileUrl, '_blank');
            } catch (error) {
                console.log('Error:', error.message);
            }
        }
    }

    document.getElementById('premium_user').appendChild(a)
}





function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}





let parentNode= document.getElementById('listOfExpenses')
let pagination= document.getElementById('pagination')
let itemsDropdown = document.getElementById("items");


itemsDropdown.addEventListener("change", async (e) => {
    const token = localStorage.getItem('token')
    
    const pageNo = 1
    let items = e.target.value;
    localStorage.setItem('items', items )
    e.preventDefault()


    A(pageNo, items, token)
    
})




window.addEventListener("DOMContentLoaded", async(event) => {
    const token = localStorage.getItem('token')
    const decodeToken = parseJwt(token)
    const isPremiumUser = decodeToken.isPremiumUser

    const pageNo =1
    let items = localStorage.getItem('items' )
    itemsDropdown.value = items
    
    
    if(isPremiumUser){
     showPremiumUserMessage()
     showLeaderboard()
     download()
    }
    event.preventDefault()
    
    A(pageNo, items, token)
})




pagination.addEventListener('click', (e) =>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    const pageNo = Number(e.target.textContent.trim())
    const items = localStorage.getItem('items')

    A(pageNo, items, token)
})
    



async function A(pageNo, items, token){
    try{

    const xyz = await axios.get(`http://localhost:4000/expense/get-expense?page=${pageNo}&items=${items}`, {headers: {'Authorization' : token}})
    console.log(xyz)
    parentNode.innerHTML = ''
    for(var i=0; i<xyz.data.ex.rows.length; i++){     
                        
             showNewUserOnScreen(xyz.data.ex.rows[i])
}

    
    if(pageNo){
        pagination.innerHTML = `<button> ${pageNo} </button>`
    }
    if(xyz.data.ex.count > (pageNo*items)){
        pagination.innerHTML += `<button> ${pageNo+1} </button>`
    }
    if(pageNo>1){
        pagination.innerHTML = `<button> ${pageNo-1} </button>`+ pagination.innerHTML
    }
}
    catch(err){                       
        console.log("Error Block: ",err)
    }
}




function showNewUserOnScreen(user){  
    const childHTML = `<li id=${user.id}> ${user.amount} - ${user.description} - ${user.category} 
                        <button  class="delete-btn" onclick =deleteExpense('${user.id}')> Delete  </button>  
                        <button  class="edit-btn"onclick =editExpense('${user.description}','${user.amount}','${user.category}','${user.id}')> 
                        Edit </button>                                              
                        </li>`

    if (!parentNode.innerHTML.includes("<h3>My Expenses</h3>")){
        parentNode.innerHTML = `<h3 >My Expenses</h3>`;
    }
    parentNode.innerHTML += childHTML;
}




function editExpense(description, amount, category, expenseId){
    document.getElementById('description').value = description
    document.getElementById('amount').value = amount
    document.getElementById('category').value = category

    deleteExpense(expenseId)
}




const deleteExpense = async (expenseId)=> {
    const token = localStorage.getItem('token')

    try {await axios.delete(`http://localhost:4000/expense/delete-expense/${expenseId}`, {headers: {'Authorization' : token}})
    removeUserFromScreen(expenseId)
    }
    catch(err){
        console.log("Error Block: ",err)
    }
}




function removeUserFromScreen(expenseId){
    const parentNode = document.getElementById('listOfExpenses')
    const childNodeToBeDeleted = document.getElementById(expenseId)

    parentNode.removeChild(childNodeToBeDeleted)
}




document.getElementById("Premium1").onclick = async function(e){
    const token = localStorage.getItem('token')
    const pqr = await axios.get("http://localhost:4000/purchase/premiummembership", {headers: {'Authorization' : token}})
    console.log(pqr)
    var options = {
        'key':pqr.data.key_id, 
        'order_id' : pqr.data.order.id, 

        
        'handler' : async function (bbb){
            const res = await axios.post("http://localhost:4000/purchase/updatetransactionstatus",{
            order_id: options.order_id,
            payment_id: bbb.razorpay_payment_id
            }, {headers: {'Authorization' : token}}
            )
            alert('You are a premium user now')
            
             
            showPremiumUserMessage()
            
            showLeaderboard()
            download()
            
            localStorage.setItem('token', res.data.token) // It prevents the premium message from loss at frontend
        
    }
    }

    const rzp1 = new Razorpay(options)
    rzp1.open()
    e.preventDefault()

    rzp1.on('payment.failed', function(response){
        console.log(response)
        alert('something went wrong')
    })
}
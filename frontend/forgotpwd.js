async function forgotPassword(event){
    event.preventDefault()
    const email = document.getElementById('email').value

const forgotP = {
    email
}
 console.log(forgotP)
 try{
    const ccc= await axios.post('http://localhost:4000/password/forgotpassword', forgotP) 
    alert(ccc.data.message)
    console.log(ccc.data.message)
    if (ccc.status === 202){ 
        document.body.innerHTML = document.body.innerHTML + "<h3 style='color:blue'> Mail sent successfully!!! </h3>"
    
        } else {
            throw new Error('Something is wrong!')
        }               
   }                      
   catch(err){
   console.log(JSON.stringify(err))

   document.body.innerHTML = document.body.innerHTML + "<h3 style='color:red'> Something is wrong!!! </h3>"       
   }             
   }  
    





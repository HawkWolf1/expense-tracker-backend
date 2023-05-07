async function resetPassword(event){
    event.preventDefault()
    const password1 = document.getElementById('password').value
    const password2 = document.getElementById('resetpassword').value

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(urlParams)
    console.log(id)

    if (password1 !== password2) {
        alert('Passwords do not match');
        return;
   }
    console.log('0000')

   console.log('777')

    try{
        console.log('3333')
        const resetP = { id: id, password: password1 };
        const ddd= await axios.post(`http://localhost:4000/password/resetpassword/${id}`, resetP) 
        console.log('xxxx')
        alert(ddd.data.message)
        console.log('eeeeeee')
        console.log(ddd.data.message)
        if (ddd.status === 200){ 
            window.location.href = "./login.html"
   } else {
    throw new Error('Something is wrong!')
   }               
}                      
catch(err){
    console.log(JSON.stringify(err))
    document.body.innerHTML = document.body.innerHTML + "<h3 style='color:red'> Something is wrong!!! </h3>"       
}             
}
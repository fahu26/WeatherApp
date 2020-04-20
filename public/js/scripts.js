
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')



document.querySelector('form').addEventListener('submit',(event) =>{
    event.preventDefault()
    msg1.textContent = "Loading..."
    msg2.textContent = ""
    const address = search.value
    if(msg1.classList.contains('error')){
        msg1.classList.remove('error')
    }
  //  const url ='http://localhost:8080/weather?address=' + encodeURIComponent(address)
   const url ='/weather?address=' + encodeURIComponent(address)

    fetch(url).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                msg1.classList.add('error')
                msg1.textContent = "Unable to find location, Please try again"
            }
            else{
                msg1.textContent = data.forecast
                msg2.textContent = data.location
            }
        })
    })



})





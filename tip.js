// const web3 = new Web3(Web3.givenProvider)
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const tipForm = document.querySelector("form")

const sendMoney = async (amount) => {
  
    // alert(`We are going to send this ${amount} amount of money`)
    
    //requesting and connecting to metamask account pop in browser
    const accounts = await window.ethereum.request({ method : "eth_requestAccounts"})

    //converting any ether value into wei , "wei" is like dollar  for ethereum, “wei” are the smallest ether unit, and you should always make calculations in wei and convert only for display reasons.
    const wei = web3.utils.toWei(amount, "ether")
   
    // if (accounts.lenght> 0) {
    if (accounts) {
        console.log("Account:", accounts)
        //now we have account, and we want to send an transaction, for that we use { method: "eth_sendTransaction"}  //For doing a transaction, we need info like "How much we want to send?", "From which account to which account we want to send?" , we send this info like "from", "to", "value" with an object into a params array
        
        window.ethereum.request({
            method: "eth_sendTransaction",
            params: [{
                from: accounts[0],
                to: "0xf61e4f655a9C12465571ccAA1551F7b78ff87d7E",
                value: web3.utils.toHex(wei)
            }]

        })
    }
}


if (window.ethereum) { //check if metamask(ethereum) extension exist in the browser, then only show the form , "window.ethereum" this is some thing that metamask injects into every single webpage , for interacting with metamask/ethereum
    tipForm.classList.add("has-eth")
        
}


// tipForm.classList.add("has-eth")

// tipForm.style.backgroundColor = "red"

tipForm.addEventListener("submit", (event) => {
    event.preventDefault()

   
    if (window.ethereum) {
        const inputVal = tipForm.querySelector("input")
        sendMoney(inputVal.value)
        // sendMoney("0.01")
    } else {
        alert("Please install a Digital Wallet e.g MetaMask etc.")
    }

})
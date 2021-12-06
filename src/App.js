import {useState} from "react"
import {ethers} from "ethers"
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
const GREET_CONTRACT_ACCT = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
function App() {
  const [greeting,setGreetingValue] = useState('')
async function requestAccount(){
 await window.ethereum.request({method: 'eth_requestAccounts'})
}
async function fetchGreeting(){
if(typeof window.ethereum !== undefined){
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contract = new ethers.Contract(GREET_CONTRACT_ACCT,Greeter.abi,provider)
  try {
    const data = await contract.greet()
    console.log("data",data)
  } catch (error) {
    console.error("error",error)
  }
}
}

async function setGreeting(){
 if(!greeting) return
 if(typeof window.ethereum !== undefined){
   await requestAccount()
   const provider = new ethers.providers.Web3Provider(window.ethereum)
   const signer = provider.getSigner()
   const contract = new ethers.Contract(GREET_CONTRACT_ACCT,Greeter.abi,signer)
   const transaction = await contract.setGreeting(greeting)
   setGreetingValue('')
   await transaction.wait()
   fetchGreeting()
 }
}


  console.log("Greeter ABI: ", Greeter.abi)
  return (
    <div className="App">
      <header className="App-header">
    <button onClick={fetchGreeting}>Fetch Greetings</button>
    <button onClick={setGreeting}>set Greetings</button>
    <input 
    onChange={ e=> setGreetingValue(e.target.value)} 
    placeholder="Set greeting" 
    value={greeting}>
    </input>
      </header>
    </div>
  );
}

export default App;

import { useState } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

import {Pie} from "react-chartjs-2"

ChartJS.register(
ArcElement,
Tooltip,
Legend
);

function App(){

const [amount,setAmount]=useState("");
const [rate,setRate]=useState("");
const [years,setYears]=useState("");

const [darkMode,setDarkMode] = useState(false)

const [data,setData]=useState(null);

function calculateEMI(){

  let P = Number(amount)
  let R = Number(rate)/12/100;
  let N = Number(years)*12;

  if(
    P<=0 ||
    R<=0 ||
    N<=0
  ){
    alert("Please enter valid values");
    return;
  }

  let EMI = (P*R*Math.pow(1+R,N)) / (Math.pow(1+R,N)-1);

  let totalPayment= EMI*N;

  let interest=totalPayment-P;
  let balance=P;
  let schedule=[];

  for(let i=1;i<=6;i++){
    let interestPart=balance*R;

    let principalPart= EMI-interestPart;

    balance=balance-principalPart;

    schedule.push({
      month:i,

      principal:
      principalPart.toFixed(0),

      interest:
      interestPart.toFixed(0),

      balance:
      balance.toFixed(0)
    })
  }
  setData({

monthly:
EMI.toFixed(2),

total:
totalPayment.toFixed(2),

interest:
interest.toFixed(2),

principal:P,

schedule

})

}

const chartData={

labels:[
"Loan Amount",
"Interest"
],

datasets:[{

data:data?
[
data.principal,
data.interest
]
:
[0,0],

backgroundColor:[

"#2563EB",
"#F97316"

],

borderColor:[

"#2563EB",
"#F97316"

],

borderWidth:2

}]

};

return(

<div className={
darkMode
?
"app dark"
:
"app"
}>

<div className="container">

<div className="header">

<h1>

Smart EMI Planner

</h1>

<button

className="toggle"

onClick={()=>
setDarkMode(
!darkMode
)
}

>

{darkMode
?
"☀"
:
"🌙"}

</button>

</div>

<input
type="number"
placeholder="Loan Amount"
onChange={(e)=>
setAmount(
e.target.value
)
}
/>

<input
type="number"
placeholder="Interest Rate (%)"
onChange={(e)=>
setRate(
e.target.value
)
}
/>

<input
type="number"
placeholder="Loan Duration (Years)"
onChange={(e)=>
setYears(
e.target.value
)
}
/>

<button

className="calculate"

onClick={
calculateEMI
}

>

Calculate EMI

</button>

{data && (

<>

<div className="cards">

<div className="card">

<h3>
Monthly EMI
</h3>

<p>
₹{data.monthly}
</p>

</div>

<div className="card">

<h3>
Total Payment
</h3>

<p>
₹{data.total}
</p>

</div>

<div className="card">

<h3>
Interest
</h3>

<p>
₹{data.interest}
</p>

</div>

</div>

<div className="chart">

<Pie
data={chartData}
/>

</div>

<h2>
Payment Schedule
</h2>

<table>

<thead>

<tr>

<th>Month</th>

<th>Principal</th>

<th>Interest</th>

<th>Balance</th>

</tr>

</thead>

<tbody>

{data.schedule.map(
(item,index)=>(

<tr key={index}>

<td>
{item.month}
</td>

<td>
₹{item.principal}
</td>

<td>
₹{item.interest}
</td>

<td>
₹{item.balance}
</td>

</tr>

)
)}

</tbody>

</table>

</>

)}

<div className="footer">

<a
href="https://digitalheroesco.com"
target="_blank"
>

Built For Digital Heroes

</a>





</div>

</div>

</div>

)

}

export default App;


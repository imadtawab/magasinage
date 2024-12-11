let weight = document.getElementById("weight")
let ata = document.getElementById("ata")
let frankness = document.getElementById("frankness")
let resetBtn = document.getElementById("reset")
let calculate = document.getElementById("calculate")
let output = document.getElementById("output")
let form = document.getElementById("form")
let vtd = document.getElementById("vtd")
// <!-- LWSTR: 50 * t * j -->
// <!-- DDSTOR: VTD * 0.2% * j -->

form.onsubmit = (e) => {
    e.preventDefault();
        // Handle Nbr of ton
        let nbrOfTon = Math.ceil(weight.value / 1000)

        // Handle Nbr of days
        let today = new Date()
        let ataValue = new Date(ata.value)
    console.log(+vtd.value)
    
        const diffInMilliseconds = today - ataValue;
        if(diffInMilliseconds < 0) return alert("Please select a good day")
    
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) + 1
        // console.log(diffInDays)
        
        const nbrOfDays = diffInDays - +frankness.value
    
        const lwstr =  50 * nbrOfTon * nbrOfDays
    
        if(lwstr <= 0) {
            let franknessDate = new Date().setDate(today.getDate() + -nbrOfDays);
    
            const date = new Date(franknessDate); // Convert to Date object
            
            // Extract day, month, and year
            const day = date.getDate();
            const month = date.getMonth() + 1; // Months are 0-indexed
            const year = date.getFullYear();
            
            // Format as dd/mm/yyyy
            const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
            console.log(formattedDate)
            // --- ${-nbrOfDays + 1} jrs
            return output.innerHTML = `<h2>Tu a déjà un franchise jusqu'a le ${formattedDate}</h2>`
        } else {
            let lwstrOutput = `<div class="box">
                                            <h3>LWSTR</h3>
                                            <div class="value">${lwstr.toFixed(2)} Dhs<span>${nbrOfDays} jour${nbrOfDays === 1 ? "" : "s"} de magasinage</span></div>
                                        </div>`
                let ddstor = +vtd.value * 0.002 * Math.ceil(nbrOfDays/10)
            let ddstorOutput = `<div class="box">
                                    <h3>DDSTOR</h3>
                                    <div class="value">${ddstor.toFixed(2)} Dhs</div>
                                </div>`
            let ttc = (lwstr + ddstor) * 1.2
            let ttcOutput = `<div class="box">
                <h3>Total TTC</h3>
                <div class="value">${ttc.toFixed(2)} Dhs</div>
            </div>`
            
            output.innerHTML = lwstrOutput + ddstorOutput + ttcOutput
        }
}
resetBtn.onclick = () => {
        output.innerHTML = ""
}

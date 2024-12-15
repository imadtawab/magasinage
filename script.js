let weight = document.getElementById("weight")
let depotDate = document.getElementById("depotDate")
let exitDate = document.getElementById("exitDate")
let frankness = document.getElementById("frankness")
let resetBtn = document.getElementById("reset")
let calculate = document.getElementById("calculate")
let output = document.getElementById("output")
let form = document.getElementById("form")
let vtd = document.getElementById("vtd")
// <!-- LWSTR: 50 * t * j -->
// <!-- DDSTOR: VTD * 0.2% * j -->

// Change the default value for the exist date
exitDate.defaultValue = formatDate(new Date(), true)

function formatDate(date, forChangeValue = false) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();
    
    return forChangeValue ? `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}` : `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    // return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
}
form.onsubmit = (e) => {
    e.preventDefault();
        output.innerHTML = ""
            // Handle Nbr of ton
        let nbrOfTon = Math.ceil(weight.value / 1000)

        // Handle Nbr of days
        let today = new Date(new Date().setHours(0,0,0,0))
        let depotDateValue = new Date(new Date(depotDate.value).setHours(0,0,0,0))
        let exitDateValue = new Date(new Date(exitDate.value).setHours(0,0,0,0))
    
        const diffInMilliseconds = exitDateValue - depotDateValue;
        if(diffInMilliseconds < 0) return alert("⚠Warning: La date de dépotage doit être inférieure à la date de sortie.")
    
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) + 1
        // console.log(diffInDays)
        
        const nbrOfDays = diffInDays - +frankness.value
    
        const lwstr =  50 * nbrOfTon * nbrOfDays
    
        if(lwstr <= 0) {
            let franknessDate = new Date(exitDateValue).setDate(exitDateValue.getDate() + -nbrOfDays);
    
            // Format as dd/mm/yyyy
            const exitDateFrankness = formatDate(new Date(franknessDate));

            let nbrOfDaysFrankness = -nbrOfDays + 1
            // console.log(exitDateValue - today);
            if(exitDateValue - today === 0) {
                return output.innerHTML = nbrOfDaysFrankness === 1 ? "<h2 style='color: #df2626'>C'est le dernier jour de la franchise 😬.</h2>" : `<h2>Tu as déjà une franchise de <span>${nbrOfDaysFrankness} jrs</span> jusqu'au <span>${exitDateFrankness}</span>.</h2>`
            } else {
                // console.log(exitDateValue, formatDate(new Date(exitDateValue)))
                return output.innerHTML = nbrOfDaysFrankness - 1 === 0 ? `<h2>Le <span class="exit-date">${formatDate(new Date(exitDateValue))}</span>, C'est le dernier jour de la franchise.</h2>` : `<h2>Le <span class="exit-date">${formatDate(new Date(exitDateValue))}</span>, il te restera encore une franchise de <span>${nbrOfDaysFrankness} jrs</span> jusqu'au <span>${exitDateFrankness}</span>.</h2>`
            }
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

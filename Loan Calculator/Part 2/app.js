//  Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //Hide results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
    e.preventDefault();
});


//Calculate Results
function calculateResults(){
    console.log('Calculating...');
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const callulatePayments = parseFloat(years.value) * 12;

    //Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, callulatePayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * callulatePayments).toFixed(2);
        totalInterest.value = ((monthly * callulatePayments) - principal).toFixed(2);

        //Show results
        document.getElementById('results').style.display = 'block';
        //Hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your Number');
    }
    
}

//Show Error
function showError(error){

    //Hide results
    document.getElementById('results').style.display = 'none';
    //Hide loader
    document.getElementById('loading').style.display = 'none';

    //create a Div
    const errorDiv = document.createElement('div');

    //Get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //add class
    errorDiv.className = 'alert alert-danger';

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert abobe error heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError, 3000);

}


//Clear Error
function clearError(){
    document.querySelector('.alert').remove();
}

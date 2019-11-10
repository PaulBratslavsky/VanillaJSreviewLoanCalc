console.log('connected...');

// Listen for Submint Button Clik
document.querySelector('#loan-form').addEventListener('submit', calculateResults);

/***********************************
    FUNCTIONS
***********************************/

function calculateResults(e) {
    console.log('Calculating');
    e.preventDefault();

    // Grab ALL UI elements
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPaymentsUI = document.getElementById('monthly-payment');
    console.log(monthlyPaymentsUI);
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const monthlyPayments = calculateMonthlyPayments(calculatedInterest, calculatedPayments, principal);
    console.log(monthlyPayments, 'monthly');


    if ( isFinite(monthlyPayments)) {
        monthlyPaymentsUI.value = monthlyPayments.toFixed(2);
        totalPayment.value = (monthlyPayments * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthlyPayments*calculatedPayments)-principal).toFixed(2);
        
        isLoading();
        
    } else {
        const message = 'Please check your numbers!';
        showError(message);
       // isLoading();
    }

    

}

/***********************************
    FUNCTIONS
***********************************/

// Calculate Monthly Payment
function calculateMonthlyPayments(interest, payment, principal) {
    let x = Math.pow(1 + interest,  payment);
    return (principal*x*interest)/(x-1);
}

// Show Error 
function showError(message) {
    console.log(message);

    // Create Element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    // Create and add Text via Create Text Node
    errorDiv.appendChild(document.createTextNode(message));

    // Show Error In DOM
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv, heading);

    // Clear Error after 2 seconds
    setTimeout( () => {
        document.querySelector('.alert').remove();
    }, 2000)
}

// Is loading 
function isLoading() {
    const loader = document.getElementById('loading');
    const results = document.getElementById('results');

    loader.style.display = 'block';
    results.style.display = 'none';


    setTimeout( () => {
        loader.style.display = 'none'; 
        results.style.display = 'block';
    }, 2000)
}







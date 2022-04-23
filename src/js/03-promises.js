import Notiflix from 'notiflix';

const refs = {
    formElements: document.querySelector('.form'),
}

refs.formElements.addEventListener('submit', handleSubmit);

function handleSubmit(event) { 
    event.preventDefault();
    
    let firstDelay = Number(event.target.elements.delay.value);
    let stepDelay = Number(event.target.elements.step.value);
    let amountCreateProm = Number(event.target.elements.amount.value);
    let position = 0;    
    
    for (let i = 0; i < amountCreateProm; i += 1){
        position += 1;
        
        createPromise(position, firstDelay)
            .then(resault => Notiflix.Notify.success(resault))
            .catch(error => Notiflix.Notify.failure(error));
        
        firstDelay += stepDelay;
    }
    event.currentTarget.reset();
};


function createPromise(position, delay) {

    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
    setTimeout(() => {
    if (shouldResolve) {
    // Fulfill
        resolve (`✅ Fulfilled promise ${position} in ${delay}ms`);
    }
    else {
    // Reject
        reject (`❌ Rejected promise ${position} in ${delay}ms`);
    } 
        }, delay)
    })  
}




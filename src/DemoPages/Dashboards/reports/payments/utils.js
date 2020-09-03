
export const getAllAmountPaid = (orders) => {
    let totalAmountPaid = 0

    for(let i = 0 ; i< orders.length ; i++){
        if(orders[i].payments.length > 0){
            for(let j = 0; j<orders[i].payments.length; j++){
                totalAmountPaid += orders[i].payments[j].amount;
                console.log(orders[i].payments[j].amount, orders[i].order_no);
            }
        }
    }

    return totalAmountPaid
}

export const todayPayment = (orders) => {
    let todayTotal = 0
    const today = new Date().toLocaleDateString('en-US')

    for( let i=0; i< orders.length; i++){

        if (
          new Date(orders[i].createdOn).toLocaleDateString('en-US') === today &&
          orders[i].payments.length > 0
        ) {
          for (let j = 0; j < orders[i].payments.length; j++) {
            todayTotal += orders[i].payments[j].amount;
            console.log(orders[i].payments[j].amount, orders[i].order_no);
          }
        }

    }

    return todayTotal

}

export const thisMonthPayment = (orders) => {
  let monthTotal = 0;
  const month = new Date().toLocaleDateString('en-US', { month: 'long'});

  for (let i = 0; i < orders.length; i++) {
    if (
      new Date(orders[i].createdOn).toLocaleDateString('en-US', {
        month: 'long',
      }) === month &&
      orders[i].payments.length > 0
    ) {
      for (let j = 0; j < orders[i].payments.length; j++) {
         monthTotal += orders[i].payments[j].amount;
        console.log(orders[i].payments[j].amount, orders[i].order_no);
      }
    }
  }

  return monthTotal;
};

export const totalAmountWithdrawn = (allWithdraws) => {
    let totalWithdrawn = 0;

    for (let i = 0; i < allWithdraws.length; i++) {

      if (allWithdraws[i].withdrawal_status === 'SUCCESS')
        totalWithdrawn += allWithdraws[i].amount;
    }

    return totalWithdrawn
}








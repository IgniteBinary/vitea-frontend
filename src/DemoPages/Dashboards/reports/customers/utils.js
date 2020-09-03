
export const returningCustomers = (orders) => {
    console.log(orders)
    const lookup = orders.reduce((a, e) => {
        a[e.customer.id] = ++a[e.customer.id] || 0;
        return a;
    }, {});

    const returning_customer_id = Object.keys(lookup).filter(key => lookup[key] > 0)
    return returning_customer_id
}

export const returningCustomersData = (orders) => {
   const currentTime = Date.now()
    const finalData = {};
     orders.forEach( order => {
       finalData[order.customer.id] = order
   } )
   const endTime = Date.now()
   console.log(endTime - currentTime)
   return finalData
}


export const customersData = (orders) => {
     const currentTime = Date.now();
     const customers = orders.reduce((acc, item) => {
        if(item.customer.id){
             const groupItems = acc[item.customer.id] || [];
             groupItems.push(item);
             acc[item.customer.id] = groupItems;
        }
        return acc;
    }, {});
    const endTime = Date.now();
    console.log(endTime - currentTime);
    return customers
}


export const returningData = (orders) => {
    const customers = customersData(orders);
    const returningCustomers = {};

    for (const customer_id in customers){
        if(customers[customer_id].length > 1){
           returningCustomers[customer_id] = customers[customer_id];
        }
    }
    return returningCustomers; 

}

export const oneTimeOrder = (orders) => {
  const customers = customersData(orders);
  const returningCustomers = {};

  for (const customer_id in customers) {
    if (customers[customer_id].length === 1) {
      returningCustomers[customer_id] = customers[customer_id];
    }
  }
  return returningCustomers;
};

export const loyalOrder = (orders) => {
  const customers = customersData(orders);
  const returningCustomers = {};

  for (const customer_id in customers) {
    if (customers[customer_id].length > 2) {
      returningCustomers[customer_id] = customers[customer_id];
    }
  }
  return returningCustomers;
};

export const cleanData = (orders, type) => {
    let customerObj = {}
    let order_number = 0

    const clean_data = []

    //get's an object containing returning customers and their orders
    
    const customersData =  type === 'returning' ? returningData(orders) : type ==='oneTime' ? oneTimeOrder(orders) : loyalOrder(orders)
    
    //loop through the custermers data to extract customer data
    for (const customer_id in customersData){
        customerObj = {
          ...customersData[customer_id][0].customer,
          date_of_first_order: customersData[customer_id][0].createdOn,
          date_of_most_recent_order: customersData[customer_id][customersData[customer_id].length - 1].createdOn,
          number_of_orders_placed: customersData[customer_id].length,
        };

        let totalOrderValue = 0;

       //loop through the orders of the specific  returning customers
        for (let i = 0; i < customersData[customer_id].length; i++) {
             //loop through a specific order payment to be able to get total order value
             for (let j=0; j < customersData[customer_id][i].payments.length; j++){
                
                console.log(customersData[customer_id][i].payments[j].amount);
                totalOrderValue += customersData[customer_id][i].payments[j].amount;
                customerObj.totalOrderValue = totalOrderValue;
              
            }
           

        }
        
        const average_order_value = totalOrderValue/customerObj.number_of_orders_placed;
          customerObj.average_order_value = average_order_value;
        clean_data.push(customerObj);
    }

   return clean_data
  

}



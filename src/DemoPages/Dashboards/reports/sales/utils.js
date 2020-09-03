export const SalesData = (orders, options) => {
    const lookup = orders.reduce((a, e) => {
        a[new Date(e.createdOn).toLocaleDateString('en-US', options && options)] = ++a[e.customer.id] || 0;
        return a;
    }, {});

    const periodicData = Object.keys(lookup).filter(key => lookup[key] > 0)
    return periodicData
}

export const periodicSalesData = (orders, options) => {
         const currentTime = Date.now();
         const periodicSales = orders.reduce((acc, item) => {
             const dateObject = new Date(item.createdOn);
             const createdOn = dateObject.toLocaleDateString('en-US', options);
           if (createdOn) {
             const groupItems = acc[createdOn] || [];
             groupItems.push(item);
             acc[createdOn] = groupItems;
           }
           return acc;
         }, {});
         const endTime = Date.now();
         console.log(endTime - currentTime);
         return periodicSales;
       };

export const salesByPaymentsMethod = (orders) => {
     const currentTime = Date.now();
     const customers = orders.reduce((acc, item) => {
       if (item.payments) {
          for( var i = 0; i<item.payments.length; i++){
               const groupItems = acc[item.payments[i].payment_method] || [];
                groupItems.push(item);
                 acc[item.payments[i].payment_method] = groupItems;
          }
        
        
        
       }
       return acc;
     }, {});
     const endTime = Date.now();
     console.log(endTime - currentTime);
     return customers;

}

export const generateXlabes = (orders, options) => {
    const periodicDataObject = periodicSalesData(orders, options)
    const xLabels = Object.keys(periodicDataObject);
    return xLabels
}


export const generateYlabes = (orders, options) => {
   const  yLabels = []
   const periodicDataObject = periodicSalesData(orders, options)

   for(const periodicData in periodicDataObject){
       yLabels.push(periodicDataObject[periodicData].length);
   }
  
   return yLabels
}

export const generatePayXlabels = (orders) => {
  const periodicDataObject = salesByPaymentsMethod(orders);
  const xLabels = Object.keys(periodicDataObject);
  return xLabels;
};

export const generatePayYlabels = (orders, options) => {
  const yLabels = [];
  const periodicDataObject = salesByPaymentsMethod(orders);

  for (const periodicData in periodicDataObject) {
    yLabels.push(periodicDataObject[periodicData].length);
  }

  return yLabels;
};


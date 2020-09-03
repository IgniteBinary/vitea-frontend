const checkSubcriptionStatus = () => {
    const  user = JSON.parse(localStorage.getItem('user'));
    const expiry_date = new Date(user.subscription_next_due_date)
    const current_time =new Date()

    if (expiry_date < current_time){
        console.log(expiry_date, current_time);
        console.log('Expired')
        return 'Expired'
    }
    if (expiry_date > current_time){
        console.log(expiry_date, current_time);
        console.log('Has not expired');
        return 'Active'
    }
}

export default checkSubcriptionStatus
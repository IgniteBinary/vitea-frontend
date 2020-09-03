export const MainNav = [
         {
           icon: 'pe-7s-home',
           label: 'Dashboard',
           to: '/dashboard',
         },

         {
           label: 'Appointments',
           to: '/dashboard/appointments',
           icon: 'pe-7s-note2',
         },

         {
           label: 'Doctors',
           to: '/dashboard/users',
           icon: 'pe-7s-users',
         },
         {
           label: 'Reports and Analytics',
           icon: 'pe-7s-graph3',
           content: [
             {
               label: 'Online Patients',
               to: '/dashboard/customer-reports',
             },
             {
               label: 'Online Sales',
               to: '/dashboard/online-sales-reports',
             },
             {
               label: 'In Store Sales',
               to: '/dashboard/offline-sales-reports',
             },
             {
               label: 'Payments Reports',
               to: '/dashboard/payments-reports',
             },
           ],
         },
         {
           label: 'Payments',
           to: '/dashboard/payments',
           icon: 'pe-7s-cash',
         },
         {
           icon: 'lnr-heart-pulse',
           label: 'Pharmacy Management',
           //to: '/dashboard/orders',
         },
         {
           icon: 'pe-7s-display2',
           label: 'Labaratory Management',
           //to: '/dashboard/logistics',
         },
       ];

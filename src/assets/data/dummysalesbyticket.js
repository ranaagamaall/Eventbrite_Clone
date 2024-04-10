const salesbyticket = {
  header: ["Ticket type", "Price", "Sold"],
  salesReport: [
    {
      ticketType: "Paid ticket 1",
      Price: 12,
      sold: 12,
      total: 60,
    },
    {
      ticketType: "Paid ticket 2",
      Price: 21,
      sold: 12,
      total: 60,
    },
    {
      ticketType: "Free ticket 1",
      Price: "free",
      sold: 21,
      total: 60,
    },
  ],
  pagination: {
    totalTickets: 3,
    totalPages: 1,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
  },

  sales: {
    totalOrders: 9,
    totalSoldTickets: 45,
    grossSales: 457.12,
    netSales: 465.12,
  },

  recentordersReport: [
    {
      orderNumber: "644c38ade006b2f679719f93",
      name: "Ola Abouelhadid",
      quantity: 7,
      price: 12.58,
      date: "2023-04-28T21:20:45.902Z"
    },
    {
      orderNumber: "644c38ade006b2f679719f93",
      name: "Ola Abouelhadid",
      quantity: 7,
      price: 12.58,
      date: "2023-04-28T21:20:45.902Z"
    },
    {
      orderNumber: "644c38ade006b2f679719f93",
      name: "Ola Abouelhadid",
      quantity: 7,
      price: 12.58,
      date: "2023-04-28T21:20:45.902Z"
    },
    {
      orderNumber: "644c38ade006b2f679719f93",
      name: "Ola Abouelhadid",
      quantity: 7,
      price: 12.58,
      date: "2023-04-28T21:20:45.902Z"
    }
  ]
};

export default salesbyticket;

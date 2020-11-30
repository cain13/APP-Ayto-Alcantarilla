let invoices: Array<any> = [
    {
        id: 1,
        title: "Reconocimiento medico",
        date: "2020-12-01T00:00:00.000-0300",
        senderName: "Caroline Broker",
        value: 1500,
        paid: false
    },
    {
        id: 2,
        title: "Parte de baja",
        date: "2019-11-01T00:00:00.000-0300",
        senderId: 3,
        senderName: "Michael Jones",
        value: 900,
        paid: true
    },
    {
        id: 3,
        title: "Parte de alta",
        date: "2019-10-01T00:00:00.000-0300",
        senderName: "Michael Jones",
        value: 800,
        paid: true
    },
    {
        id: 4,
        title: "Reconocimento medico",
        date: "2019-09-01T00:00:00.000-0300",
        senderName: "Jessica Stevens",
        value: 750,
        paid: true
    }
];

export default invoices;

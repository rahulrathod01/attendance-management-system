export const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
    });
    return response.json();
};

export const registerClient = async ({
    companyName, 
    ownerName, 
    email, 
    registrationNumber, 
    gstNumber,
    field1
}) => {
    
    const response = await fetch('http://localhost:5000/api/auth/register-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            companyName, 
            ownerName, 
            email, 
            registrationNumber, 
            gstNumber,
            field1}),
    });
    console.log(companyName,"companyName", 
        ownerName,"ownerName", 
        email, "email");
    return response.json();
};
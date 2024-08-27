import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

const PayPalIntegration = () => {
return (
<div>
<PayPalButton
amount='10.00'
currency={'PLN'}
onSuccess={(details, data) => {
alert('Transaction completed by ' + details.payer.name.given_name);
// OPTIONAL: Call your server to save the transaction
}}
options={{
clientId: 'AXwuRkXmaOx9zYv4FrAKMn1441_Dx77xAzR_HP53RQdUJS6xV-1kQBNmOknyqF9zDY4eRKsDDDgsza2S',
}}
/>
</div>
);
};

export default PayPalIntegration;
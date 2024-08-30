import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import Message from './Message';

const PayPalIntegration = ({ amount, onSuccess }) => {
    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {
        const addPayPalScript = async () => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=AXwuRkXmaOx9zYv4FrAKMn1441_Dx77xAzR_HP53RQdUJS6xV-1kQBNmOknyqF9zDY4eRKsDDDgsza2S&currency=PLN`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!window.paypal) {
            addPayPalScript();
        } else {
            setSdkReady(true);
        }
    }, []);

    return (
        <div>
            {!sdkReady ? (
                <Message>Loading...</Message>
            ) : (
                <PayPalButton
                    amount={amount}
                    currency={'PLN'}
                    onSuccess={onSuccess}
                    onError={(error) => {
                        console.error('PayPal Error:', error);
                    }}
                />
            )}
        </div>
    );
};

export default PayPalIntegration;
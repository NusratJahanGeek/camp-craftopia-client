import { Button, Flex, useToast } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";


const CardDetails = ({bookings, price}) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if(price > 0){
            axiosSecure.post('/create-payment-intent', {price})
        .then(res => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret);
        })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
   
        event.preventDefault();
    
        if (!stripe || !elements) {
        
          return;
        }
    
       
        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }
    
        const {error} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          console.log('[error]', error);
          setCardError(error.message);
        } 
        
        else {
            setCardError('');
        }

        setProcessing(true);

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                email: user?.email || 'unknown',
                  name: user?.displayName || 'anonymous'
                },
              },
            },
          );
    
          if(confirmError){
            console.log(confirmError);
          }
    
          console.log(paymentIntent);
          setProcessing(false);
          if(paymentIntent.status === 'succeeded'){
            setTransactionId(paymentIntent.id);
            const payment = {
                email: user?.email, 
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: bookings.length,
                status: 'Service Pending',
                classId: bookings.map(classData => classData._id),
                bookingId: bookings.map(classData => classData.classId),
                classNames: bookings.map(classData => classData.name)
            }
            axiosSecure.post("/payments", payment).then((res) => {
                console.log(res.data);
                if (res.data.insertResult){
                    toast({
                        title: 'Payment Successful!',
                        description: "Congratulations, you've successfully enrolled to the class.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                      })
                      navigate('/dashboard/enrolled-classes');
                }
            })
           
          }

      };
     
      
    

    return (
       <>
        <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
    <Flex paddingBottom={8} justifyContent="center">
  <Button fontSize="lg" type="submit" disabled={!stripe || !clientSecret || processing}>
    Proceed Payment
  </Button>
</Flex>
    </form>
    {cardError && <p className="text-red-600 text-center">{cardError}</p>}
    {transactionId && <p className="text-green-500 text-center">Congratulations, your transaction is successful! <br />TransactionID: {transactionId}</p>}
       </>

    );
};

export default CardDetails;
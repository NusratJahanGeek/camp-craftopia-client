import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Helmet } from "react-helmet-async";
import DashboardBackground from "../../../assets/DashboardBackground.png";
import { Box, Flex } from "@chakra-ui/react";
import SectionTitle from "../../../components/SectionTitle";
import CardDetails from '../../../components/CardDetails';
import useBookings from '../../../hooks/useBookings';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const MakePayment = () => {
    const [bookings] = useBookings();
    // const total = bookings.reduce( (sum, booking) => sum + booking.price, 0);
    // const price = parseFloat(total.toFixed(2));
    
    const classDetails = localStorage.getItem('class-data');
    const classPaymentData = JSON.parse(classDetails);
    const classPrice = classPaymentData.price;

    return (
        <div>
            <Helmet>
                <title>Camp Craftopia | Make Payment</title>
            </Helmet>
            <Flex
                backgroundImage={`url(${DashboardBackground})`}
                backgroundSize="cover"
                minHeight="100vh"
                alignItems="center"
                justifyContent="center"
            >
                <Box maxWidth="500px" width="100%">
                    <SectionTitle heading="Make Payment" />
                    <Elements stripe={stripePromise}>
                        <CardDetails wishlist={classPaymentData} price={classPrice} bookings={bookings}></CardDetails>
                    </Elements>
                </Box>
            </Flex>
        </div>
    );
};

export default MakePayment;

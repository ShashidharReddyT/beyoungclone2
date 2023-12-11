import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useAuth } from "../Context/UserProvider";

export default function Review() {
    const { resultData } = useAuth();
    const [totalPrice, setTotalPrice] = useState(null);
    const [finalTotal, setFinalTotal] = useState(null);

    useEffect(() => {
        // Fetch the cart data and update the state
        const fetchCartData = async () => {
            // Assuming resultData contains the structure you mentioned earlier
            if (resultData && resultData.data && resultData.data.totalPrice) {
                setTotalPrice(resultData.data.totalPrice);
            }
        };

        fetchCartData();
    }, [resultData]);

    useEffect(() => {
        // Calculate the final total including discount and shipping charges
        if (totalPrice !== null) {
            const discount = 200;
            const shippingCharges = 49;
            const finalTotalAmount = totalPrice - discount + shippingCharges;
            setFinalTotal(finalTotalAmount);
        }
    }, [totalPrice]);

    const payments = [
        { name: 'Card type', detail: 'Visa' },
        { name: 'Card holder', detail: 'Mr John Smith' },
        { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
        { name: 'Expiry date', detail: '04/2024' },
    ];
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {resultData?.data?.items?.map((cartItem) => (
                    <ListItem key={cartItem.product._id} sx={{ py: 1, px: 0 }}>
                        <img src={cartItem.product.displayImage} alt={cartItem.product.name} style={{ width: '30px', marginRight: '10px' }} />
                        <ListItemText primary={cartItem.product.name} secondary={`Size: ${cartItem.size}, Quantity: ${cartItem.quantity}`} />
                        <Typography variant="body2">{`₹${cartItem.product.price * cartItem.quantity}`}</Typography>
                    </ListItem>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total Products Price" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {`₹${totalPrice}`}
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Beyoung Discount" />
                    <Typography variant="body2">{`-₹200`}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Shipping Charges" />
                    <Typography variant="body2">{`₹49`}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total Amount" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {`₹${finalTotal}`}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    {/* Update the address display based on your data */}
                    <Typography gutterBottom>{'123 Main St, CA, Anytown, 12345, USA'}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

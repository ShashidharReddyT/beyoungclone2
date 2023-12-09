import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function AddressForm() {

    const [pincodeData, setPincodeData] = useState({});


    const handleZipCodeChange = async (e) => {
        const zipcode = e.target.value;

        if (zipcode.length === 6) {
            try {
                const response = await axios.get(`https://api.postalpincode.in/pincode/${zipcode}`);
                const data = response.data[0];

                if (data.Status === 'Success') {
                    const { District, State, Country, City } = data.PostOffice[0];
                    setPincodeData({ district: District, state: State, country: Country, city: City });
                } else {
                    console.error('Invalid pin code');
                    setPincodeData({});
                }
            } catch (error) {
                console.error('Error fetching pin code data', error);
                setPincodeData({});
            }
        } else {
            setPincodeData({});
        }
    };


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        onChange={handleZipCodeChange}
                    />
                </Grid>
                {/* Display the fetched data */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="district"
                        name="district"
                        label="District"
                        fullWidth
                        variant="standard"
                        value={pincodeData.district || ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                        value={pincodeData.state || ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        variant="standard"
                        value={pincodeData.country || ''}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';  // Import axios for making API requests

import { useAuth } from '../Context/UserProvider';

export default function AddressForm() {
    const [pincodeData, setPincodeData] = useState({});

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleZipCodeChange = async (e) => {
        const zipcode = e.target.value;

        if (zipcode.length === 6) {
            try {
                const response = await axios.get(`https://api.postalpincode.in/pincode/${zipcode}`);
                const data = response.data[0];

                if (data.Status === 'Success') {
                    const { District, State, Country, City } = data.PostOffice[0];

                    // Update state with the fetched data
                    setPincodeData({ district: District, state: State, country: Country, city: City });
                } else {
                    // Handle error case
                    console.error('Invalid pin code');
                    setPincodeData({});
                }
            } catch (error) {
                console.error('Error fetching pin code data', error);
                setPincodeData({});
            }
        } else {
            // Clear data if the entered pin code is not of the correct length
            setPincodeData({});
        }
    };

    const storedName = sessionStorage.getItem('name');
    const { user, email, updateProfile, signIn } = useAuth();

    const [username, setUsername] = useState(capitalizeFirstLetter(user || storedName || ''));



    return (
        <React.Fragment>
            <div className="myadresss">
                <Typography variant="h6" gutterBottom>
                    My Address
                </Typography>
                <Grid container spacing={3}>
                    {/* ... Other input fields ... */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            type="text"
                            value={username}
                            variant="standard"
                            fullWidth

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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            variant="standard"
                            value={pincodeData.city || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                            label="Use this address for payment details"
                        />
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

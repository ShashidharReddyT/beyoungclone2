import { Flex, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const MyOrder = () => {
    return (
        <div className='my-orders'>
            <Flex style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <img src='https://www.beyoung.in/desktop/images/checkout/EMPTY%20CARTORDER%20PAGE..png' alt="cartbag" style={{ width: '350px' }} className='cartproductimage' />
                <Text style={{ marginTop: '0', fontSize: '25px' }} className='nothingbag' >No Orders.</Text>
                <Link to='/'>
                    <Button
                        style={{
                            width: '300px',
                            height: '2.5rem',
                            fontWeight: 'bold',
                            fontSize: '18px',

                            color: 'white',
                            backgroundColor: 'black',
                            borderRadius: '10px',
                            border: '1px solid rgb(66, 162, 162)',
                            cursor: 'pointer',
                            marginLeft: '0px',
                        }}
                        className='buttoncartnothings'
                    >
                        Continue Shopping
                    </Button>
                </Link>
            </Flex>
        </div>
    )
}

export default MyOrder

import React from 'react';
import loading from '../images/loading.png'

const Loading = () => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' ,marginTop:'5rem'}} >
                <img src={loading} alt='Loading...' />
                <br />
                <p style={{ color: 'white', fontSize: '1.2rem', fontWeight: '600' }}>Weatherman at work, please stand by...</p>
            </div>
        </>
    )
}

export default Loading
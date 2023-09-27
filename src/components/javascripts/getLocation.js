import React, { useEffect } from 'react';
import { useDataContext } from '../contexts/context';
import { toast } from 'react-toastify';
function LocationComponent() {
    const { setLatitude, setLongitude } = useDataContext();

    useEffect(() => {
        //getting location of user
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    console.log(position)

                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            toast.error('User denied the request for Geolocation.', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            });
                            setLatitude(27.65);
                            setLongitude(85.35);
                            break;
                        default:
                            toast.error('An error occurred while getting user location.Try again later.', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            });
                    }
                }
            );
        } else {
            toast.error('Geolocation is not available in this browser.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, []);


    return (
        <div>

        </div>
    );
}

export default LocationComponent;

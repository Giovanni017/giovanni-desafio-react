import React from 'react';

export default function Loading({ load, text }) {
    return (
        <React.Fragment>
            {
                load &&
                    <div className='d-flex align-items-center'>
                        <small className="me-2">
                            { text ? text : 'Buscando' }
                        </small>

                        <div className="spinner-grow spinner-grow text-primary" style={{ width: 10, height: 10 }}>
                        </div>
                        <div className="spinner-grow spinner-grow text-primary " style={{ width: 10, height: 10 }}>
                        </div>
                        <div className="spinner-grow spinner-grow text-primary" style={{ width: 10, height: 10 }}>
                        </div>
                    </div>
            }
        </React.Fragment>
    )
}
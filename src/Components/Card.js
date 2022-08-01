import React from 'react';
import moment from 'moment'

export default function CardRepository({ datas }) {
    const formatUpdateAt = (date) => {
        return moment(date).format('DD/MM/YYYY - H:m')
    }

    return (
        <React.Fragment>
            <div className="card border-0 px-2">
                <div className="card-body">
                    <div className="h5 text-primary">
                        { datas.name }
                    </div>

                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <div className='me-5'>
                                <i className="fa-solid fa-code me-2 mt-2"></i>
                                { datas.language }
                            </div>
                        </div>

                        <div className='col-12 col-md-6'>
                            <div>
                                <i className="fa-solid fa-code-pull-request me-2 mt-2"></i>
                                Ultima atualização em { formatUpdateAt(datas.updated_at) }
                            </div>
                        </div>

                        <small className="text-end mt-5">
                            <a 
                                className="btn btn-sm btn-outline-primary"
                                href={ datas.html_url }
                                target="_blank"
                            >
                                Acesse <i className="fa fa-link fa-xs"></i>
                            </a>
                        </small>
                    </div>
                </div>

                <hr/>
            </div>
        </React.Fragment>
    )
}
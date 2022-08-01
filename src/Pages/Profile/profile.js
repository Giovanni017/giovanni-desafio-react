import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GitHubService from '../../Services/Service';
import Loading from '../../Components/Loading';
import CardRepository from '../../Components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
    const navigate = useNavigate()

    const [profile, setProfile] = useState({});
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const profileStorage = localStorage.getItem('profile');

        if(profileStorage){
            setProfile(JSON.parse(profileStorage));    
        } else {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        getRepos();
    }, [profile])

    const getRepos = async () => {
        setLoading(true);

        await GitHubService
            .getRepositories(profile.login)
            .then(response => {
                setRepositories(response.data);
                setLoading(false);
            });
    }

    return (
        <>
            <div className="container-fluid vh-100 p-2">
                <div className='row'>
                    <div className='col-12 col-md-4'>
                        <div className="card border-0">
                            <div className='card-body'>
                                <div className='text-center'>
                                    <img 
                                        src={profile.avatar_url} 
                                        alt="Avatar" 
                                        className='img-fluid rounded-circle'
                                        style={{ maxWidth: 250 }}
                                    />
                                </div>

                                <h4 className="mt-4">
                                    { profile.name }
                                </h4>

                                <div className="mt-2 h6 text-muted">
                                    { profile.login }
                                </div>

                                <hr/>

                                <div className="mx-2 my-4 h6">
                                    { profile.bio }
                                </div>

                                <hr/>

                                <div className='text-center'>
                                    <i className="fa-solid fa-user-group me-2"></i>
                                    { profile.followers } followers - { profile. following} following
                                </div>

                                <hr/>
                            </div>
                        </div>
                    </div>

                    <div className='col-12 col-md-8'>
                        <div className="card border-0 mt-md-0 mt-3">
                            <div>
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                        <a className="nav-link active position-relative" href="#">
                                            Repositories
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-secondary">
                                                { repositories.length }
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body">
                                { repositories.map(data => <CardRepository datas={data} key={data.id}/>) }
                            </div>
                            
                            <div className="card-body d-flex justify-content-center align-items-center pt-5">
                                <Loading load={loading} text={'Buscando repositórios'}/>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </>
    );
}

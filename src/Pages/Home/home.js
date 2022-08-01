import React from 'react';
import GitHubService from '../../Services/Service';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const [name, setName] = React.useState('');
    const [profile, setProfile] = React.useState({});
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        localStorage.removeItem('profile');
    }, [])

    const search = async () => {
        setProfile({});

        if(!name) {
            return setMessage('digite o nome de usuário');
        }

        activeLoading();

        await GitHubService
            .getUsers(name)
            .then(response => {
                setTimeout(() => {
                    inactiveLoading();

                    if(response.data.message === "Not Found") {
                        return profileNotFound()
                    } 

                    setProfile(response.data);
                    localStorage.setItem('profile', JSON.stringify(response.data));
                    setMessage(null);
                }, 1000);
            })
            .catch(error => {
                inactiveLoading();
                profileNotFound()
            });
    } 

    const profileNotFound = () => {
        setProfile({});
        localStorage.removeItem('profile');
        setMessage('Usuário não encontrado no github. Verifique se você digitou o nome corretamente.');
    }

    const activeLoading = () => {
        setLoading(true);
        setMessage(null);
    }

    const inactiveLoading = () => {
        setLoading(false);
    }

    return (
        <>
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
                <div className="card border-0" style={{ maxWidth: '340px' }}>
                    <div className="card-body d-flex align-items-center flex-column">

                        <Loading load={loading} text={'Procurando perfil'}/>

                        {
                            profile.login 
                            ?
                            <Link to={`profile`} className="text-decoration-none mb-3">
                                <small>
                                    Perfil encontrado. <i className="fa-solid fa-arrow-right fa-xs ms-1"></i>
                                </small>
                            </Link>
                            :  
                            <p className='text-center'>
                                <small> { message } </small>
                            </p>
                        }

                        <div>
                            <p>
                                Buscar repositório no github
                            </p>
                        </div>
                        <div className="mb-3">
                            <input 
                                className="form-control border-secondary" 
                                id="name" 
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' ? search() : null }
                                value={name} 
                                placeholder="digite o nome do usuário"
                                data-testid="input-search"
                            />                            
                        </div>
                    </div>

                    <button 
                        className="btn btn-secondary" 
                        onClick={search}
                        data-testid="btn-search"
                    >
                        Buscar <i className="fa-solid fa-magnifying-glass fa-xs ms-1"></i>
                    </button>
                </div>
            </div>
        </>
    );
}

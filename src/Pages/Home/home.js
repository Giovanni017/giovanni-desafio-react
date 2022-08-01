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
            return setMessage('Informe um nome de usuário do github');
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

                        <Loading load={loading} text={'Buscando perfil'}/>

                        {
                            profile.login 
                            ?
                            <Link to={`profile`} className="text-decoration-none mb-3">
                                <small>
                                    Perfil encontrado. Ver Informações <i className="fa-solid fa-arrow-right fa-xs ms-1"></i>
                                </small>
                            </Link>
                            :  
                            <p className='text-center'>
                                <small> { message } </small>
                            </p>
                        }

                        <div className="form-floating mb-3">
                            <input 
                                className="form-control border-primary" 
                                id="name" 
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' ? search() : null }
                                value={name} 
                                placeholder="Nome de desenvolvedor"
                                data-testid="input-search"
                            />
                            <label htmlFor="name">Nome de desenvolvedor</label>
                        </div>
                    </div>

                    <button 
                        className="btn btn-primary" 
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

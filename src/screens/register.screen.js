import {useCallback, useState} from "react";
import {useHistory} from "react-router";
import {Button, Card} from "react-bootstrap";

export const RegisterScreen = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');

    const onSubmit = useCallback((event) => {
        event.preventDefault();
        fetch('http://localhost:3002/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                name,
                phone
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(() => {
            history.push('/auth/login');
        });
    }, [email, password, name, phone]);

    return (
        <Card>
            <Card.Header>
                <Card.Title>Register</Card.Title>
            </Card.Header>
            <Card.Body>
                <form onSubmit={onSubmit}>
                    <div className="row mx-0 mb-4">
                        <label htmlFor="name" className="col-12 col-md-3">Name</label>
                        <div className="col-md-9 col-12">
                            <input className="form-control" type="text" id="name"
                                   onChange={e => setName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row mx-0 mb-4">
                        <label htmlFor="phone" className="col-md-3 col-12">Phone</label>
                        <div className="col-md-9 col-12">
                            <input type="text" id="phone" className="form-control" onChange={e => setPhone(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row mx-0 mb-4">
                        <label htmlFor="email" className="col-md-3 col-12">E-Mail</label>
                        <div className="col-md-9 col-12">
                            <input type="email" id="email" className="form-control" onChange={e => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row mx-0 mb-4">
                        <label htmlFor="password" className="col-md-3 col-12">Password</label>
                        <div className="col-md-9 col-12">
                            <input type="password" id="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <Button variant={"success"} type={"submit"}>Register</Button>
                </form>
            </Card.Body>
        </Card>
    );
}
import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {loginAction} from "../store/auth";
import {useHistory} from "react-router";
import {Button, Card} from "react-bootstrap";

export const LoginScreen = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onSubmit = useCallback((event) => {
        event.preventDefault();
        fetch('http://localhost:3002/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(res => {
            dispatch(loginAction(res.user, res.token));
            history.push('/');
        });
    }, [email, password]);

    return (
        <Card>
            <Card.Header>
                <Card.Title>Login</Card.Title>
            </Card.Header>
            <Card.Body>
                <form onSubmit={onSubmit}>
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
                    <Button variant={"success"} type={"submit"}>Login</Button>
                </form>
            </Card.Body>
        </Card>
    );
}
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../store/auth";

export const LayoutComponent = ({children}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const authenticated = useSelector(state => state.auth.authenticated);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to={"/"}>Techtile Challenge</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <NavDropdown title="User Area" id="basic-nav-dropdown">
                                {authenticated === true && (
                                    <>
                                        <NavDropdown.ItemText>Welcome {user?.email}</NavDropdown.ItemText>
                                        <NavDropdown.Item
                                            onClick={() => dispatch(logoutAction())}>Logout</NavDropdown.Item>
                                    </>
                                )}
                                {authenticated === false && (
                                    <>
                                        <NavDropdown.Item as={Link} to={"/auth/login"}>Login</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to={"/auth/register"}>Register</NavDropdown.Item>
                                    </>
                                )}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="my-5">
                {children}
            </Container>
        </>
    )
}
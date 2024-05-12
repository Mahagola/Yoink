import {React,useState,useContext} from 'react';
import { Row, Col, Form , Button, Container, Spinner} from 'react-bootstrap';
import { Link ,useNavigate} from 'react-router-dom';
import "./SignIn.css";
import {useSignInUserMutation} from '../services/appApi';
import { AppContext } from '../context/appContext'; 

export default function SignIn() {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const navigate = useNavigate();
    const {socket} = useContext(AppContext);
    const [SignInUser, {isLoading, error}] = useSignInUserMutation();
    function handleLogin(e){
        e.preventDefault();

        //login logic
        SignInUser({email,password}).then(({data})=>{
            if(data){
                //socket stuff
                socket.emit('new-user')
                navigate("/chat");
            }
        })
    }

  return (
    <Container>
        <Row>
            <Col md={5} className="signin__bg"></Col>
            <Col md={7} className='d-flex align-items-center justify-content-center flex-direction-column'>
                <Form style={{width:'80%', maxWidth:500}} onSubmit={handleLogin} className='signin__box'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {isLoading ? <Spinner animation="grow" /> : "SignIn"}
                    </Button>
                    <div className='py-4'>
                        <p className='text-center'>Don't have an account? <Link to="/SignUp">SignUp</Link></p>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>
  );
}

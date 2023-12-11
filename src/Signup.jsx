import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


function Signup(){
    
    // live update for text input and anything 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // div element is used to group and structure html content 
    return <div>

        {/* <center> */}
            <div style={{
                paddingTop: 170,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center",
            }}>
                <Typography variant={"h6"}>
                     Welcome to cousera. Sign up below
                </Typography>
                
            </div>
        {/* </center> */}


        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <Card variant={"outlined"} style={{
                width : 300,
                padding : 20,
            }}>
                <TextField 
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                 <br /> <br />

                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true} 
                    label="Password" 
                    variant="outlined" 
                    type='password'/>
                <br /> <br />
                <Button size={'large'} variant="contained"
                   
                   onClick={ () => {
                        
                       function callback2(data){
                           localStorage.setItem("token", data.token);
                           alert("Signup Completed")
                       }

                       function callback1(res){
                           res.json().then(callback2);
                       }   

                    //    let username = document.getElementById("username").value;
                    //    let password = document.getElementById("password").value;

                       fetch("http://localhost:3000/admin/signup", {
                            method: "POST",
                            body: JSON.stringify({
                                username: email,
                                password: password
                            }),
                            headers: {
                                "Content-type": "application/json"
                            }
                       }).then(callback1);

                   }}
                
                >Sign up</Button>
            </Card>

        </div>
          
           
    </div>

}


export default Signup;
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

function Signin(){
    
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
                     Welcome Back. Sign in below
                </Typography>
                
            </div>
        {/* </center> */}


        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <Card varint={"outlined"} style={{
                width : 300,
                padding : 20,
            }}>
                <TextField 
                    fullWidth={true}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                />
                 <br /> <br />

                <TextField
                    fullWidth={true}
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined" 
                    type='password'/>
                <br /> <br />
                <Button size={'large'} variant="contained">Sign in</Button>
            </Card>

        </div>
          
           
    </div>

}


export default Signin;
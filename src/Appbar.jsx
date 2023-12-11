import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

function Appbar(){

    const navigate = useNavigate();

    return <div style={{
        display: "flex",
        justifyContent: "space-between",
    }}>
         <div>
            <Typography>Coursera</Typography>
         </div>
         <div style={{
            display: "flex",
         }}>
            <div style={{
                marginRight: 10,
            }}>
               <Button 
                    variant={"contained"}
                    onClick={()=> {
                        // window.location = "/signup";
                        navigate("/signup");
                    }}
               
                >
                   Sign up
                </Button>
            </div>



            <div>
               <Button 
                    variant={"contained"}
                    onClick={()=> {
                        navigate("/signin");
                        // window.location = "/signin";
                    }}
               
               
                >
                  Sign in
                </Button>
            </div>
             
         </div>
    </div>

}

export default Appbar;
import { Button, TextField } from "@mui/material";
import Card from '@mui/material/Card';
import { useState } from "react";

function AddCourse() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [published, setPublished] = useState("");


    return <div>

        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 100
        }}>

            <Card variant={"outlined"} style={{
                width: 300,
                padding: 20,
            }}>
                <TextField
                    // wen a user interact with TextField and select option the browser generate a event object(e) 
                    onChange={(e) => { setTitle(e.target.value) }}
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                />
                <br /> <br />

                <TextField

                    onChange={(e) => { setDescription(e.target.value) }}
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                />
                <br /><br />

                <TextField
                    onChange={(e) => { setImage(e.target.value) }}
                    fullWidth={true}
                    label="ImageLink"
                    variant="outlined"
                />
                <br /><br />

                <TextField

                    onChange={(e) => { setPrice(e.target.value) }}
                    fullWidth={true}
                    label="Price"
                    variant="outlined"
                    type="number"
                />
                <br /><br />

                <TextField

                    onChange={ (e) => {setPublished(e.target.value)}}
                    fullWidth={true}
                    label="Published"
                    variant="outlined"
                />

                <br /><br />
                <Button
                    size={"large"}
                    variant="contained"

                onClick={ () => {

                    fetch("http://localhost:3000/admin/courses", {
                            method: "POST",
                            body: JSON.stringify({
                                title: title,
                                description: description,
                                price: price,
                                imageLink: image,
                                published: published
                            }),
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                       }).then( (res) => {
                             res.json().then( (data) => {
                                alert("course added");
                             });
                       });

                }}

                >
                    Add Course
                </Button>
            </Card>

        </div>
    </div>
}

export default AddCourse;
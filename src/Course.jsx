import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button, TextField } from "@mui/material";


function Course() {

    let { courseId } = useParams();

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
                setCourses(data.courses);
                //  console.log(data);
            })
        })
    }, [])


    let course = null;
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id == courseId) {
            course = courses[i];
        }
    }


    if (!course) {
        return <div>
            course not found with courseId : {courseId}
        </div>
    }



    return <div style={{ display: "flex", justifyContent: "center"}}>
        <CourseCard course={course} />
        <UpdateCard courses={courses} />

    </div>

    function CourseCard(props) {
        return <Card variant={"outlined"} style={{
            border: "0.1px solid black",
            margin: 10,
            width: 300,
            minHeight: 200

      }}>
           
           <Typography 
              variant="h6"
              textAlign={"center"}
            >
              {props.course.title}
            </Typography>

            <img src={props.course.imageLink} style={{ width: 300, height: 320}} alt="" />

           <Typography 
                 variant="subtitle1"
                 textAlign={"center"}
            >
               {props.course.description}
            </Typography>
    </Card>
    }



    function UpdateCard(props) {

        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [price, setPrice] = useState("");
        const [image, setImage] = useState("");
        const [published, setPublished] = useState("");

        return <Card variant={"outlined"} style={{
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

                onChange={(e) => { setPublished(e.target.value) }}
                fullWidth={true}
                label="Published"
                variant="outlined"
            />

            <br /><br />
            <Button
                size={"large"}
                variant="contained"

                onClick={() => {

                    fetch("http://localhost:3000/admin/courses/" + course.id, {
                        method: "PUT",
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
                    }).then((res) => {
                        res.json().then((data) => {
                            alert("course added");
                        });
                    });

                }}

            >
                Update Course
            </Button>
        </Card>

    }



}

export default Course;
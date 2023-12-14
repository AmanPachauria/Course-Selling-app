import { Card } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
function Course() {
    let { courseId } = useParams();
    console.log("hi there from course")

    const setCourses = useSetRecoilState(coursesState);

    useEffect(() => {
    
        fetch("http://localhost:3000/admin/courses/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then( (res) => {
            res.json().then( (data) => {
                setCourses(data.courses);
            })
        })
    }, []);

    return <div style={{ display: "flex", justifyContent: "center", marginTop: 50}}>
        <CourseCard courseId={courseId} />
        <UpdateCard courseId={courseId} />
    </div>
}


function CourseCard(props) {
    
    const courses = useRecoilValue(coursesState)
    let course = null;
    for (let i = 0; i<courses.length; i++) {
        if (courses[i].id == props.courseId) [
            course = courses[i]
        ]
    }

    if (!course) {
        return "loading....."
    }

    return <div style={{display: "flex", justifyContent: "center"}}>
     <Card style={{
        margin: 10,
        width: 300,
        minHeight: 300
    }}>

        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <img src={course.imageLink} style={{width: 300, height:300}} ></img>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
    </Card>
    </div>
}

function UpdateCard(props) {
    console.log("hi there from update card")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
    const course = props.course;
    const [courses, setCourses] = useRecoilState(coursesState);

    console.log("UpdateCard rerendered");
    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} style={{width: 300, padding: 20}}>
    <Typography>Update course details</Typography>
    <br />
    <TextField
        onChange={(e) => {
            setTitle(e.target.value)
        }}
        fullWidth={true}
        label="Title"
        variant="outlined"
    />
    <br /><br />

    <TextField
        onChange={(e) => {
            setDescription(e.target.value)
        }}
        fullWidth={true}
        label="Description"
        variant="outlined"
    />
    <br /><br />
    <TextField
        onChange={(e) => {
            setImage(e.target.value)
        }}
        fullWidth={true}
        label="Image link"
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

    <Button
        size={"large"}
        variant="contained"
        onClick={() => {
            
            fetch("http://localhost:3000/admin/courses/" + props.courseId, {
                method: "PUT",
                body: JSON.stringify({
                    title: title,
                    description: description,
                    imageLink: image,
                    published: true
                }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then( (res) => {
                    res.json().then( (data) => {
                        let updatedCourses = [];
                        for (let i = 0; i<courses.length; i++) {
                            if (courses[i].id == props.courseId) {
                                updatedCourses.push({
                                    id: props.courseId,
                                    title: title,
                                    description: description,
                                    imageLink: image
                                })
                            } else {
                                updatedCourses.push(courses[i]);
                            }
                        }
                        setCourses(updatedCourses);
                    })
                })
        }}
    > Update course</Button>
    </Card>
</div>
}

export default Course;

const coursesState = atom({
  key: 'coursesState',
  default: '', 
});
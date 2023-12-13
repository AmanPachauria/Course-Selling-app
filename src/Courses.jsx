import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

function Courses() {
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

    return <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    }}>
        {courses.map(course => {
           return <Course course={course} />}
        )}
    </div>
}

function Course(props){
      return <Card variant={"outlined"} style={{
              border: "2px solid black",
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

              <img src={props.course.imageLink} style={{ width: 300}} alt="" />

             <Typography 
                   variant="subtitle1"
                   textAlign={"center"}
              >
                 {props.course.description}
              </Typography>
      </Card>
}

export default Courses;
import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { courseState } from "../store/atoms/course";


export function Courses() {
    const [courses, setCourses] = useState([]);

    const init = async () => {
        const response = await axios.get(`${BASE_URL}/admin/courses/`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        setCourses(response.data.courses)
    };

    const handleDelete = async(courseId) => {
        const response = await axios.delete(`${BASE_URL}/admin/course/${courseId}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        setCourses(prevCourses=> prevCourses.filter(course => course._id !== courseId));
    }

    useEffect( () => {
        init();
    }, []);

    return <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            { courses.map( course => {
                return <Course key={course._id} course={course} onDelete={handleDelete} /> 
               }
            )}
    </div>

}

export function Course({course, onDelete}) {
    const navigate = useNavigate();


    return <Card 
          style={{ margin: 6, width: 260, minHeight: 200, padding: 20}}
    >
               
               <Typography 
                   textAlign={"center"}
                   variant="h6"
                >{course.title}
                </Typography>
               <Typography
                  textAlign={"center"} 
                  variant="subtitle2"
                  style={{
                      marginBottom: 10
                   }}
                >{course.description}</Typography>
               <img src={course.imageLink} style={{width: 260, height: 207}}></img>       
               <div style={{display: "flex", justifyContent: "center", marginTop: 10}}>
                    <Button variant="contained"
                            size="medium"
                            style={{
                                 marginRight: 30,
                                 width: 90,
                                 height: 30
                            }} 
                            onClick={ () => {
                                  

                                let updatedCourse = {

                                }
                                navigate("/course/" + course._id);
                            }}
                    >
                     Edit
                    </Button>
                    <Button 
                       variant="contained" 
                       color = "error"
                       style={{
                                 width: 90,
                                 height: 30
                            }} 
                       startIcon={<DeleteIcon />}

                       onClick={ () => {
                        onDelete(course._id)
                      }}
                    
                    
                    >
                        Delete
                    </Button>
               </div>

    </Card>
}

export default Courses;
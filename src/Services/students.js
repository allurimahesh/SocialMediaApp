import axois from "axios";

export const getStudents = () => {
  console.log(process.env);
  return axois.get(process.env.REACT_APP_STUDENT_API_URL + "/getAll");
};

import axios from 'axios';

import { SUCCESS } from 'app/shared/reducers/action-type.util';
import { log } from 'react-jhipster';

export const ACTION_TYPES = {
  GET_COURSES: 'course/GET_COURSES',
  CLEAR_COURSES: 'course/CLEAR_COURSES',
  REGISTER_COURSE: 'course/REGISTER_COURSE',
  GET_REGISTERED_COURSES: 'course/REGISTERED_COURSES',
  CLEAR_REGISTERED_COURSES: 'course/CLEAR_REGISTERED_COURSES',
  ADD_COURSE: 'course/ADD_COURSE',
  DELETE_COURSE: 'course/DELETE_COURSE',
  DROP_COURSE: 'course/DROP_COURSE'
};

const initialState = {
  courses: [],
  reg_courses: [],
  status: ''
};

export type ApplicationCourseState = Readonly<typeof initialState>;

export default (state: ApplicationCourseState = initialState, action): ApplicationCourseState => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.GET_COURSES):
      return {
        ...state,
        courses: action.payload.data
      };
    case ACTION_TYPES.CLEAR_COURSES:
      let newState = { ...state };
      delete newState.courses;
      return {
        ...newState
      };
    case ACTION_TYPES.CLEAR_REGISTERED_COURSES:
      newState = { ...state };
      delete newState.reg_courses;
      return {
        ...newState
      };
    case SUCCESS(ACTION_TYPES.GET_REGISTERED_COURSES):
      return {
        ...state,
        reg_courses: action.payload.data
      };

    case SUCCESS(ACTION_TYPES.ADD_COURSE):
      return state;

    case SUCCESS(ACTION_TYPES.DELETE_COURSE):
      return {
        ...state,
        status: action.payload.data
      };

    default:
      return state;
  }
};

export const getCourses = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.GET_COURSES,
    payload: axios.get('api/course/findAllCourses')
  });

export const getRegisteredCourses = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.GET_REGISTERED_COURSES,
    payload: axios.get('api/course/findRegisteredCourses')
  });

export const clearCourses = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.CLEAR_COURSES
  });

export const clearRegisteredCourses = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.CLEAR_REGISTERED_COURSES
  });

export const registerCourse = courseName => dispatch =>
  dispatch({
    type: ACTION_TYPES.REGISTER_COURSE,
    payload: axios.post('api/course/registerCourse/' + courseName)
  });

export const addCourse = course => dispatch =>
  dispatch({
    type: ACTION_TYPES.ADD_COURSE,
    payload: axios.post('api/course/addCourse/', {
      courseName: course.c_name,
      courseContent: course.c_content,
      courseLocation: course.c_location,
      courseTeacher: course.c_name
    })
  });

export const deleteCourse = courseName => dispatch =>
  dispatch({
    type: ACTION_TYPES.DELETE_COURSE,
    payload: axios.delete('api/course/deleteCourse/' + courseName)
  }).then(() => dispatch =>
    dispatch({
      type: ACTION_TYPES.GET_COURSES,
      payload: axios.get('api/course/findAllCourses')
    })
  );

export const dropCourse = courseId => dispatch =>
  dispatch({
    type: ACTION_TYPES.DROP_COURSE,
    payload: axios.delete('api/course/dropCourse/' + courseId)
  });

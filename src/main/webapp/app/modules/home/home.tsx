import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import {
  clearCourses,
  clearRegisteredCourses,
  getCourses,
  getRegisteredCourses,
  registerCourse,
  addCourse,
  deleteCourse,
  dropCourse
} from 'app/shared/reducers/course';

type MySate = {
  c_name;
  c_location;
  c_content;
  c_teacher;
};

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp, MyState> {
  constructor(props) {
    super(props);
    this.state = { c_name: '', c_location: '', c_content: '', c_teacher: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;

    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  }

  handleSubmit(event) {
    alert(
      'A name was submitted: ' + this.state.c_name + ' ' + this.state.c_location + ' ' + this.state.c_content + ' ' + this.state.c_teacher
    );
    event.preventDefault();
    this.props.addCourse(this.state);
  }

  componentDidMount() {
    this.props.getSession();
  }

  getAllCourses = () => {
    this.props.getCourses();
  };

  getRegisteredCourses = () => {
    this.props.getRegisteredCourses();
  };

  clearAllCourses = () => {
    this.props.clearCourses();
  };

  clearRegisteredCourses = () => {
    this.props.clearRegisteredCourses();
  };
  registerCourse = courseName => {
    this.props.registerCourse(courseName);
  };
  deleteCourse = courseName => {
    this.props.deleteCourse(courseName);
  };

  dropCourse = courseId => {
    this.props.dropCourse(courseId);
  };

  render() {
    let { account, courses, showCourse, reg_courses, status } = this.props;
    console.log(status);
    return (
      <Row>
        <Col md="9">
          <h2>Welcome, 九章全栈ReactSpring项目!</h2>
          <p className="lead">This is your homepage</p>
          {account && account.login ? (
            <div>
              <Alert color="success">You are logged in as user {account.login}.</Alert>
              <button className="button teal large" onClick={this.getAllCourses}>
                显示所有课程
              </button>{' '}
              <button className="button teal large" onClick={this.clearAllCourses}>
                清除
              </button>
              <div className="container-fluid coursetable">
                <div className="row">
                  <div className="col-2 col-course col-header">Name</div>
                  <div className="col-2 col-course col-header">Location</div>
                  <div className="col-2 col-course col-header">Content</div>
                  <div className="col-2 col-course col-header">Teacher</div>
                  <div className="col-1 col-course col-header">Register</div>
                  <div className="col-1 col-course col-header">Delete</div>
                </div>

                <div className="row">
                  {courses &&
                    courses.map(course => (
                      <>
                        <div className="col-8">
                          <div className="row row-course">
                            <div className="col-3 col-course">{course.courseName}</div>
                            <div className="col-3 col-course">{course.courseLocation}</div>
                            <div className="col-3 col-course">{course.courseContent}</div>
                            <div className="col-3 col-course">{course.teacherName}</div>
                          </div>
                        </div>

                        <div className="col-1">
                          <button className="button teal small" onClick={() => this.registerCourse(course.courseName)}>
                            注册课程
                          </button>
                        </div>
                        <div className="col-1">
                          <button className="button teal small" onClick={() => this.deleteCourse(course.courseName)}>
                            删除课程
                          </button>
                        </div>
                      </>
                    ))}
                </div>
              </div>
              <hr />
              <button className="button teal large" onClick={this.getRegisteredCourses}>
                显示注册的课程
              </button>{' '}
              <button onClick={this.clearRegisteredCourses} className="button teal large">
                清除
              </button>
              <div className="container-fluid coursetable">
                <div className="row">
                  <div className="col-2 col-course col-header">Name</div>
                  <div className="col-2 col-course col-header">Location</div>
                  <div className="col-2 col-course col-header">Content</div>
                  <div className="col-2 col-course col-header">Teacher</div>
                  <div className="col-1 col-course col-header">Register</div>
                </div>
                <div className="row">
                  {reg_courses &&
                    reg_courses.map(reg_course => (
                      <>
                        <div className="col-8">
                          <div className="row row-course">
                            <div className="col-3 col-course">{reg_course.course.courseName}</div>
                            <div className="col-3 col-course">{reg_course.course.courseLocation}</div>
                            <div className="col-3 col-course">{reg_course.course.courseContent}</div>
                            <div className="col-3 col-course">{reg_course.course.teacherName}</div>
                          </div>
                        </div>

                        <div className="col-1">
                          <button className="button teal small" onClick={() => this.dropCourse(reg_course.id)}>
                            取消注册
                          </button>
                        </div>
                      </>
                    ))}
                </div>
                <hr />

                <form onSubmit={this.handleSubmit}>
                  <div>
                    <span>
                      课程名称&nbsp;
                      <input type="text" value={this.state.c_name} name="c_name" onChange={this.handleChange} />
                    </span>
                  </div>
                  <div>
                    <span>
                      课程地点&nbsp;
                      <input type="text" value={this.state.c_location} name="c_location" onChange={this.handleChange} />
                    </span>
                  </div>
                  <div>
                    <span>
                      课程内容&nbsp;
                      <input type="text" value={this.state.c_content} name="c_content" onChange={this.handleChange} />
                    </span>
                  </div>
                  <div>
                    <span>
                      课程老师&nbsp;
                      <input type="text" value={this.state.c_teacher} name="c_teacher" onChange={this.handleChange} />
                    </span>
                  </div>
                  <br />
                  <input type="submit" value="创建" />
                </form>
              </div>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                If you want to
                <Link to="/login" className="alert-link">
                  {' '}
                  sign in
                </Link>
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Alert>

              <Alert color="warning">
                You do not have an account yet?&nbsp;
                <Link to="/register" className="alert-link">
                  Register a new account
                </Link>
              </Alert>
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  courses: storeState.course.courses,
  reg_courses: storeState.course.reg_courses,
  status: storeState.course.status,
  showCourse: storeState.course.showCourse
});

const mapDispatchToProps = {
  getSession,
  clearCourses,
  getCourses,
  getRegisteredCourses,
  clearRegisteredCourses,
  registerCourse,
  addCourse,
  deleteCourse,
  dropCourse
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

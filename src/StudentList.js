import React, { Component } from "react";
import { connect } from "react-redux";

class StudentList extends Component {
  render() {
    const { StudentList: students, initializeUpdateForm, delStudent } = this.props;

    return (
      <>
        {students.map((student) => {
          return (
            <tr key={student.maSV}>
              <td scope="row">{student.maSV}</td>
              <td>{student.hoTen}</td>
              <td>{student.sdt}</td>
              <td>{student.email}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => {
                    initializeUpdateForm(student);
                  }}>
                  Cập nhật
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    delStudent(student.maSV);
                  }}>
                  Xoá
                </button>
              </td>
            </tr>
          );
        })}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    StudentList: state.StudentReducer.StudentList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeUpdateForm: (student) => {
      const action = {
        type: "INITIALIZE_FORM",
        payload: student,
      };
      dispatch(action);
    },

    delStudent: (id) => {
      const action = {
        type: "DELETE_USER",
        payload: id,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);

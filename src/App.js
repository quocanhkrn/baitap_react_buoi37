import React, { Component } from "react";
import { connect } from "react-redux";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import StudentList from "./StudentList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        maSV: "",
        hoTen: "",
        sdt: "",
        email: "",
      },
      errors: {
        maSV: {
          isExisted: true,
          text: "",
        },
        hoTen: {
          isExisted: true,
          text: "",
        },
        sdt: {
          isExisted: true,
          text: "",
        },
        email: {
          isExisted: true,
          text: "",
        },
      },
      isValid: false,
      isUpdate: false,
    };
  }

  resetState = () => {
    this.setState({
      values: {
        maSV: "",
        hoTen: "",
        sdt: "",
        email: "",
      },
      errors: {
        maSV: {
          isExisted: true,
          text: "",
        },
        hoTen: {
          isExisted: true,
          text: "",
        },
        sdt: {
          isExisted: true,
          text: "",
        },
        email: {
          isExisted: true,
          text: "",
        },
      },
      isValid: false,
      isUpdate: false,
    });
  };

  checkValid = () => {
    for (const key in this.state.errors) {
      if (key === "maSV" && this.props.UpdateFormValues) continue;
      if (this.state.errors[key].isExisted) return;
    }
    this.setState({ isValid: true });
  };

  handleOnBlur = (e) => {
    const { id, value } = e.target;
    if (!value.trim()) {
      this.setState(
        {
          errors: { ...this.state.errors, [id]: { ...this.state.errors[id], isExisted: true, text: "(*) Bắt buộc" } },
        },
        () => {
          this.checkValid();
        }
      );
    }
  };

  handleOnChange = (e) => {
    const { id, value } = e.target;
    let regexPattern;
    switch (id) {
      case "email":
        regexPattern =
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        break;

      default:
        regexPattern = /.+/;
        break;
    }

    if (value && value.match(regexPattern)) {
      this.setState(
        {
          values: { ...this.state.values, [id]: value },
          errors: { ...this.state.errors, [id]: { ...this.state.errors[id], isExisted: false, text: "" } },
        },
        () => {
          if (id === "maSV" && !this.props.UpdateFormValues) {
            this.props.StudentList.forEach((student) => {
              if (student.maSV === parseInt(value)) {
                this.setState(
                  {
                    errors: { ...this.state.errors, [id]: { ...this.state.errors[id], isExisted: true, text: "(*) Đã tồn tại mã SV này" } },
                  },
                  () => {
                    this.checkValid();
                    return;
                  }
                );
              }
            });
          }
          this.checkValid();
        }
      );
    } else {
      this.setState(
        {
          values: { ...this.state.values, [id]: value },
          errors: { ...this.state.errors, [id]: { ...this.state.errors[id], isExisted: true, text: "(*) Vui lòng nhập đúng định dạng" } },
        },
        () => {
          this.checkValid();
        }
      );
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.UpdateFormValues) {
      const { maSV, hoTen, sdt, email } = nextProps.UpdateFormValues;
      this.resetState();
      this.setState({
        values: {
          maSV,
          hoTen,
          sdt,
          email,
        },
        isValid: true,
        isUpdate: nextProps.IsUpdate,
      });
    } else {
      this.resetState();
    }
  }

  render() {
    const { values, errors } = this.state;
    const { StudentList: students, addStudent, updateStudent } = this.props;

    let submitBtn;
    if (this.state.isUpdate) {
      submitBtn = (
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={!this.state.isValid}
          onClick={() => {
            updateStudent(this.state.values);
          }}>
          Cập nhật
        </button>
      );
    } else {
      submitBtn = (
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={!this.state.isValid}
          onClick={() => {
            addStudent(this.state.values);
            this.setState({ isUpdate: false });
          }}>
          Thêm sinh viên
        </button>
      );
    }

    let tableData;
    if (students) {
      tableData = (
        <>
          <thead>
            <tr>
              <th scope="col">Mã SV</th>
              <th scope="col">Họ và tên</th>
              <th scope="col">SĐT</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <StudentList studentList={students} />
          </tbody>
        </>
      );
    }

    return (
      <main className="container">
        <h1 className="py-2 bg-primary rounded-2 text-center text-white">THÔNG TIN SINH VIÊN</h1>
        <form className="row" action="#">
          <div className="col-12 col-md-6 col-xl-3 mb-3">
            <label htmlFor="maSV" className="form-label">
              Mã SV
            </label>
            <input
              type="number"
              className="form-control"
              id="maSV"
              value={this.state.values.maSV}
              disabled={this.state.isUpdate}
              onBlur={this.handleOnBlur}
              onChange={this.handleOnChange}
            />
            {errors.maSV.text && <div className="form-text text-danger">{errors.maSV.text}</div>}
          </div>
          <div className="col-12 col-md-6 col-xl-3 mb-3">
            <label htmlFor="hoTen" className="form-label">
              Họ và tên
            </label>
            <input
              type="text"
              className="form-control"
              id="hoTen"
              value={this.state.values.hoTen}
              onBlur={this.handleOnBlur}
              onChange={this.handleOnChange}
            />
            {errors.hoTen.text && <div className="form-text text-danger">{errors.hoTen.text}</div>}
          </div>
          <div className="col-12 col-md-6 col-xl-3 mb-3">
            <label htmlFor="sdt" className="form-label">
              Số điện thoại
            </label>
            <input
              type="tel"
              className="form-control"
              id="sdt"
              value={this.state.values.sdt}
              onBlur={this.handleOnBlur}
              onChange={this.handleOnChange}
            />
            {errors.sdt.text && <div className="form-text text-danger">{errors.sdt.text}</div>}
          </div>
          <div className="col-12 col-md-6 col-xl-3 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={this.state.values.email}
              onBlur={this.handleOnBlur}
              onChange={this.handleOnChange}
            />
            {errors.email.text && <div className="form-text text-danger">{errors.email.text}</div>}
          </div>
          <div className="col-12 col-md-6 col-xl-3 w-100 mb-3">{submitBtn}</div>
        </form>
        <h1 className="py-2 bg-primary rounded-2 text-center text-white">DANH SÁCH SINH VIÊN</h1>
        <table className="table align-middle">{tableData}</table>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    StudentList: state.StudentReducer.StudentList,
    UpdateFormValues: state.StudentReducer.UpdateFormValues,
    IsUpdate: state.StudentReducer.IsUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (student) => {
      const action = {
        type: "SUBMIT_STUDENT",
        payload: student,
      };
      dispatch(action);
    },
    updateStudent: (student) => {
      const action = {
        type: "SUBMIT_STUDENT",
        payload: student,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

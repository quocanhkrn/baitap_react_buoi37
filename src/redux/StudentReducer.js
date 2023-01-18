const initialState = {
  StudentList: [
    {
      maSV: "1",
      hoTen: "Betty Huels",
      sdt: "(970) 963-2504",
      email: "betty1985@gmail.com",
    },
    {
      maSV: "2",
      hoTen: "Sheridan Koelpin",
      sdt: "(712) 325-9617",
      email: "sheridan1981@gmail.com",
    },
  ],
  IsUpdate: false,
  UpdateFormValues: null,
};

const StudentReducer = (state = initialState, action) => {
  let StudentList = [...state.StudentList];
  let index;
  switch (action.type) {
    case "SUBMIT_STUDENT":
      index = StudentList.findIndex((student) => student.maSV === action.payload.maSV);
      if (index === -1) {
        StudentList.push(action.payload);
      } else {
        StudentList.splice(index, 1, action.payload);
      }
      state.IsUpdate = false;
      state.UpdateFormValues = null;
      state.StudentList = [...StudentList];
      return { ...state };

    case "DELETE_USER":
      index = StudentList.findIndex((student) => student.maSV === action.payload);
      StudentList.splice(index, 1);
      state.StudentList = [...StudentList];
      return { ...state };

    case "INITIALIZE_FORM":
      state.IsUpdate = true;
      state.UpdateFormValues = { ...action.payload };
      return { ...state };

    default:
      return { ...state };
  }
};

export default StudentReducer;

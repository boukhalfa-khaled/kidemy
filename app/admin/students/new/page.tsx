import { StudentForm } from "../_components/StudentForm";

const newStudent = () => {
  return (
    <div className="mx-auto max-w-1/3 flex flex-col gap-4">
      <div> Create New Student </div>
      <StudentForm type="create" />
    </div>
  );
};
export default newStudent;

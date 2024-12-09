import { useContext, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { updateUser } from '../../services/userApi';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../Contexts/userContext';
export const Setting = ({ user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsRefresh } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitData = async (userData) => {
    setIsLoading(true);
    try {
      const response = await updateUser(userData);

      if (response && response.status === 200) {
        setIsRefresh((prev) => prev + 'a');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setIsEdit(false);
    }
  };
  const editElement = (
    <div
      onClick={() => setIsEdit(true)}
      style={{
        backgroundColor: '#E6EBF5', // Background color
        padding: '5px 10px', // Padding for the container
        cursor: 'pointer', // Makes it clickable
        display: 'flex', // Aligns the children in a row
        alignItems: 'center', // Vertically centers the text and icon
        borderRadius: '5px', // Optional: Adds rounded corners to the container
      }}
    >
      <AiFillEdit
        style={{
          marginRight: '5px', // Adds space between the icon and the text
        }}
      />
      <span>Edit</span>
    </div>
  );
  if (!user) {
    return <div>loading...</div>;
  }
  return (
    <div className="side-element col-xl-3 col-3 ">
      <h2>Settings</h2>
      <div className="d-flex justify-content-center">
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
          className="d-flex align-items-center justify-content-center"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Ne7oVV6Lx9uAnmJDUZrrLcGy8yzo1sXdpQ&s"
            alt="Default User Avatar"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
      <h5 className="text-center mt-4 mb-5 ">
        {user.first_name} {user.last_name}
      </h5>

      {!isEdit ? (
        <div className="user-info mx-4  ">
          <div className="mx-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="user-info-titles">First Name</span>
              <br />
              <span className="user-info-details">{user.first_name}</span>
            </div>
            {editElement}
          </div>
          <div className="mx-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="user-info-titles">Last Name</span>
              <br />
              <span className="user-info-details">{user.last_name}</span>
            </div>
            {editElement}
          </div>

          <div className="mx-3 mb-3">
            <span className="user-info-titles">Email</span>
            <br />
            <span className="user-info-details ">{user.email}</span>
          </div>
          <div className="mx-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="user-info-titles">School</span>
              <br />
              <span className="user-info-details">{user.school}</span>
            </div>
            {editElement}
          </div>
          <div className="mx-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="user-info-titles">Profession</span>
              <br />
              <span className="user-info-details">{user.profession}</span>
            </div>
            {editElement}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submitData)} className="user-edit mx-4 ">
          <div className="mx-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="user-info-titles">First Name</span>
              <br />
              <input
                required
                defaultValue={user.first_name}
                className="form-control"
                type="text"
                {...register('first_name')}
              />
            </div>
          </div>
          <div className="mx-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="user-info-titles">Last Name</span>
              <br />
              <input
                defaultValue={user.last_name}
                className="form-control"
                type="text"
                {...register('last_name')}
              />
            </div>
          </div>

          <div className="mx-3 mb-3">
            <span className="user-info-titles">Email</span>
            <br />
            <span className="user-info-details ">{user.email}</span>
          </div>
          <div className="mx-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="user-info-titles">School</span>
              <br />
              <input
                defaultValue={user.school}
                className="form-control"
                type="text"
                {...register('school')}
              />
            </div>
          </div>
          <div className="mx-3  d-flex justify-content-between align-items-center">
            <div>
              <span className="user-info-titles">Profession</span>
              <br />
              <input
                defaultValue={user.profession}
                className="form-control"
                type="text"
                {...register('profession')}
              />
            </div>
          </div>
          {isLoading ? (
            <div className="d-flex justify-content-center my-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="my-3 ms-2">
              <button
                onClick={() => setIsEdit(false)}
                className="btn btn-secondary mx-3 "
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary ">
                Update
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

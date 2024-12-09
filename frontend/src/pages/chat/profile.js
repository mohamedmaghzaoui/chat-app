export const Profile = ({ user }) => {
  {
    console.log(user);
  }
  return (
    <div className="side-element col-xl-3 col-3 ">
      <h2>My Profile</h2>
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
      <h5 className="text-center mt-4 ">
        {user.first_name} {user.last_name}
      </h5>
      <span className="d-flex align-items-center justify-content-center ">
        <span className="text-success fs-1 " style={{ marginRight: '5px' }}>
          •
        </span>
        <p className="m-0 text-secondary">Active</p>
      </span>
      <div className="user-info mx-4">
        <div className="mx-3 mb-3">
          <span className="user-info-titles">First Name</span>
          <br />
          <span className="user-info-details ">{user.first_name}</span>
        </div>
        <div className="mx-3 mb-3">
          <span className="user-info-titles">Last Name</span>
          <br />
          <span className="user-info-details ">{user.last_name}</span>
        </div>
        <div className="mx-3 mb-3">
          <span className="user-info-titles">Email</span>
          <br />
          <span className="user-info-details ">{user.email}</span>
        </div>
        <div className="mx-3 mb-3">
          <span className="user-info-titles">First Name</span>
          <br />
          <span className="user-info-details ">{user.first_name}</span>
        </div>
        <div className="mx-3 mb-3">
          <span className="user-info-titles">School</span>
          <br />
          <span className="user-info-details ">{user.school}</span>
        </div>
        <div className="mx-3 mb-3">
          <span className="user-info-titles">Profession</span>
          <br />
          <span className="user-info-details ">{user.profession}</span>
        </div>
      </div>
    </div>
  );
};

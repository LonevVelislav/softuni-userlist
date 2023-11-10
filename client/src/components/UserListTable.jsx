import { useEffect, useState } from "react";
import * as userService from "../services/userService";
import UserListItem from "./UserListItem";
import CreateUserModel from "./CreateUserModel";
import UserInfoModal from "./UserInfoModal";
import UserDeleteModal from "./UserDeleteModal";
import Spinner from "./Spinner";

const UserListTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  //no details selected for the user at the start so we set it to null
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideCreateUserModel();
    }
  });

  useEffect(() => {
    setIsLoading(true);

    userService
      .getAll()
      .then((res) => setUsers(res))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const createUserClickHandler = () => {
    setShowCreate(true);
  };

  const hideCreateUserModel = () => {
    setShowCreate(false);
  };

  const hideDetailsModal = () => {
    setShowDetails(false);
  };

  const userCreateHandler = async (e) => {
    e.preventDefault();

    //get form data
    const data = Object.fromEntries(new FormData(e.target));
    //create new user in the server
    const newUser = await userService.create(data);

    //update the state with the new user
    setUsers((state) => [...state, newUser]);

    //close modal
    setShowCreate(false);
  };

  const detailsClickHandler = async (id) => {
    setSelectedUser(id);
    setShowDetails(true);
  };

  const clickDeleteClickHandler = (id) => {
    setSelectedUser(id);
    setShowDelete(true);
  };

  const deleteUserHandler = async () => {
    //remove user from server
    const result = await userService.remove(selectedUser);

    //remove user from state
    setUsers((state) => state.filter((el) => el._id !== selectedUser));
    // close delete modal
    setShowDelete(false);
  };

  return (
    <div className="table-wrapper">
      {/* this conditional means if first 'showCreate' state is true show 'CreateUserModel' if false dont show it */}
      {isLoading && <Spinner />}

      {showCreate && (
        <CreateUserModel
          hideModel={hideCreateUserModel}
          onUserCreate={userCreateHandler}
        />
      )}
      {showDetails && (
        <UserInfoModal onClose={hideDetailsModal} userId={selectedUser} />
      )}

      {showDelete && (
        <UserDeleteModal
          onCloseDelete={() => setShowDelete(false)}
          onDelete={deleteUserHandler}
        />
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>
              First name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Last name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Email
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Phone
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Created
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- Table row component --> */}
          {users.map((el) => (
            <UserListItem
              key={el._id}
              userId={el._id}
              firstName={el.firstName}
              lastName={el.lastName}
              email={el.email}
              phoneNumber={el.phoneNumber}
              createdAt={new Date(el.createdAt).toUTCString()}
              imageUrl={el.imageUrl}
              onDetailsClick={detailsClickHandler}
              onDeleteClick={clickDeleteClickHandler}
            />
          ))}
        </tbody>
      </table>

      <button className="btn-add btn" onClick={createUserClickHandler}>
        Add new user
      </button>
    </div>
  );
};

export default UserListTable;

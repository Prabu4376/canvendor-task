import { useState, useEffect } from "react";
import axios from "axios";
import { BsEyeFill, BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";

function UserData() {
  const [isLoad, setIsLoad] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userViewData, setUserViewData] = useState([]);
  const [userRemoveData, setUserRemoveData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([])

  const fetchUserData = async () => {
    setIsLoad(true);
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const data = response.data;
      setUserData(data.products);
      setIsLoad(false);
    } catch (err) {
      console.log(err);
      setIsLoad(false);
    }
  };

  

  const viewUser = async (id) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      const data = response.data;
      setUserViewData(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.log(err);
    }
  };

  const editUser = async (id) => {
    const header = { "Content-Type": "application/json" };
    try {
      const response = await axios.put(
        `https://dummyjson.com/products/${id}`,
        header
      );
      const data = response.data;
      setUserViewData(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.log(err);
    }
  };

  const removeUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://dummyjson.com/products/${id}`
      );
      const data = response.data;
      setUserRemoveData(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.log(err);
    }
  };

  const filterItem = (e) =>{

	const searchTerm = e.target.value;

	setSearchItem(searchTerm)

    const filteredItems = userData.filter((item) =>
    	item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {!isLoad ? (
        <div className="user-data-sec">
          <div className="search-sec">
            <input type="text" placeholder="Title" onChange={filterItem} value={searchItem}/>
            <button className="search-btn">Search</button>
          </div>

          <table className="user-data-table">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>

            {filteredUsers.length > 1 ? 
				<>
					{filteredUsers.map((data) => (
					<tr>
						<td>{data.id}</td>
						<td>{data.title}</td>
						<td>{data.brand}</td>
						<td>{data.category}</td>
						<td>{data.price}</td>
						<td>
						<button
							className="action-btn view-btn"
							type="button"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
							onClick={() => viewUser(data.id)}
						>
							<BsEyeFill />
						</button>
						<button
							className="action-btn edit-btn"
							type="button"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal-1"
							onClick={() => editUser(data.id)}
						>
							<BsPencilSquare />
						</button>
						<button
							className="action-btn remove-btn"
							type="button"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal-2"
							onClick={() => removeUser(data.id)}
						>
							<BsFillTrash3Fill />
						</button>
						</td>
					</tr>	
            	))}
				</>
				:
				<>
				{userData.map((data) => (
					<tr>
						<td>{data.id}</td>
						<td>{data.title}</td>
						<td>{data.brand}</td>
						<td>{data.category}</td>
						<td>{data.price}</td>
						<td>
						<button
							className="action-btn view-btn"
							type="button"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
							onClick={() => viewUser(data.id)}
						>
							<BsEyeFill />
						</button>
						<button
							className="action-btn edit-btn"
							type="button"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal-1"
							onClick={() => editUser(data.id)}
						>
							<BsPencilSquare />
						</button>
						<button
							className="action-btn remove-btn"
							type="button"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal-2"
							onClick={() => removeUser(data.id)}
						>
							<BsFillTrash3Fill />
						</button>
						</td>
					</tr>	
            	))}
				</>
			}
          </table>

          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
          {/* View-Modal */}
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    View User
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <table className="user-data-table">
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Price</th>
                    </tr>

                    {userViewData.map((item) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.brand}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </table>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Edit-Modal */}
          <div
            class="modal fade"
            id="exampleModal-1"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Edit
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div className="user-data-table">
                    {userViewData.map((item) => (
                      <>
                        <div className="edit-form">
                          <label for="id">Title:</label>
                          <input type="text" value={item.title} />
                        </div>
                        <div className="edit-form">
                          <label for="id">Brand:</label>
                          <input type="text" value={item.brand} />
                        </div>
                        <div className="edit-form">
                          <label for="id">Category:</label>
                          <input type="text" value={item.category} />
                        </div>
                        <div className="edit-form">
                          <label for="id">Price:</label>
                          <input type="text" value={item.price} />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Edit-Modal */}
          <div
            class="modal fade"
            id="exampleModal-2"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Remove
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div className="user-data-table">
                    {userRemoveData.map((item) => (
                      <>
                        <div className="edit-form">
                          <label for="id">{item.title}</label>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Loading...."
      )}
    </>
  );
}

export default UserData;

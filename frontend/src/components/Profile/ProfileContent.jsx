import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import { updateUserInformation } from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";

function ProfileContent({ active }) {
  const { user, error } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  // console.log("Useeeeeeeeeer is  !!! ", user)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // frontend preview ke liye
    setAvatar(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.put(`${server}/user/update-avatar`, formData, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="w-full">
      {/* Profile Page */}
      {active === 1 && (
        <div className="flex flex-col items-center w-full">
          {/* Profile Avatar */}
          <div className="relative mb-6">
            <img
              src={avatar ? avatar : `${backend_url}uploads/${user?.avatar}`}
              className="w-[150px] h-[150px] object-cover border-[3px] border-[#3ad132] rounded-full"
              alt="ppp"
            />

            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>

          {/* Form */}
          <div className="w-full max-w-[800px] px-5">
            <form onSubmit={handleSubmit}>
              {/* Row 1 */}
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%] pr-0 800px:pr-4 mb-4 800px:mb-0">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-full`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="email"
                    className={`${styles.input} !w-full`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%] pr-0 800px:pr-4 mb-4 800px:mb-0">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-full`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%] pr-0 800px:pr-4 mb-4 800px:mb-0">
                  <label className="block pb-2">Enter Your Password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-full`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <input
                className="w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer hover:bg-[#3a24db] hover:text-white transition"
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileContent;

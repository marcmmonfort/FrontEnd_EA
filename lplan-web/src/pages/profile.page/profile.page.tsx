import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import './profile.page.css';
// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_7.jpg';
import { AuthService } from "../../services/auth.service";
import { Link } from "react-router-dom";
import { Component } from "react";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
document.body.style.backgroundImage = `url(${backgroundImage})`;





const Profile = () => {
    
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
      const getUser = async () => {
        const userId = AuthService.getCurrentUser();

        if(userId){
          UserService.getPerson(userId)
          .then(response => {
            console.log(response);
            console.log(response.data);
            setCurrentUser(response.data);
          })
          .catch(error => {
            //window.location.href = '*';
          });
        
        }
        
      };

      document.body.style.backgroundImage = `url(${backgroundImage})`;
      getUser();
    }, []);


    return (
      <div>
        <Navbar/>
        <div className="titleContainer">
          <h1 className="titleSection">Profile</h1>
        </div>
        <div className="profileContour">
          {currentUser && (
            <div className="profile-container">
              <div className="profile">
                <h1 className="profile-user-name">{currentUser.appUser}</h1>
                <div className="profile-image">
                  <img src={currentUser.photoUser} alt="profile-img" className="profile-img-card" />
                </div>
                <div className="profile-user-buttons">
                  <Link to="/profile/edituser" className="buttonProfile">Edit Profile</Link>
                  <Link to="/profile/settings" className="buttonProfile">Settings</Link>
                  {/* <Link to="/profile/settings" className="btn_profile-settings-btn" aria-label="profile settings">Settings<i className="fas fa-cog" aria-hidden="true"></i></Link> */}
                </div>
                <div className="profile-stats">
                  <h1 className="profileTitle">Followers</h1>
                  <h1 className="profile-stat-count">{currentUser.followersUser?.length}</h1>
                  <h1 className="profileTitle">Following</h1>
                  <h1 className="profile-stat-count">{currentUser.followedUser?.length}</h1>
                </div>
                <div className="profile-bio">
                  <h1 className="profileTitle">Name</h1>
                  <p><span className="profile-real-name">{currentUser.nameUser}</span></p>
                  <h1 className="profileTitle">Description</h1>
                  <p>{currentUser.descriptionUser}</p>
                </div>
              </div>
          </div>        
        )}
      </div>
      <Footer/>
    </div>
    );
  };

export default Profile;
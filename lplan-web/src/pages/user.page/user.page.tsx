import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from '../../assets/images/background_4.jpg';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { FaUserCircle } from "react-icons/fa";
import { AuthService } from "../../services/auth.service";
import './user.page.css';

const UserProfile = () => {

  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
      console.log("Obtenemos los datos del otro usuario");
      //Obtenemos el usuario
      getById();

      console.log("Pedimos la relacion que tenemos con ese user");
      //Obtenemos si es seguidor o no.
      getRelation();
    }, [userId]);


    const getById = async () => {
        console.log("Obtenemos los datos del otro usuario:", userId);
        try {
            const response = await UserService.getPerson(userId ?? 'NoID');
            setCurrentUser(response.data);
            console.log("Obtenemos los datos del otro usuario: exito");
        } catch (error) {
            //window.location.href = '*';
            console.log("Obtenemos los datos del otro usuario: mal");
            console.error(error);
            
        }
    };

    const getRelation = async () => {
        
        const user = await AuthService.getCurrentUser().user;
        console.log("Pedimos la relacion que tenemos con ese user:", user._id);
        try {
            const response = await UserService.isFollowed(user._id,userId ?? 'NoID');
            console.log("Pedimos la relacion que tenemos con ese user:: exito");
            console.log(response);
            setIsFollowing(response.data);
        } catch (error) {
            console.log("Pedimos la relacion que tenemos con ese user:: mal");
            //window.location.href = '*';
            console.error(error);
        }
    };

    const handleFollow = async () => {
        const user = await AuthService.getCurrentUser().user;
        // Aquí implemento la lógica para seguir o dejar de seguir al usuario
        console.log("Este usuario es seguir tuyo?:" + isFollowing);
        if(isFollowing){
            try {
                const response = await UserService.removeFollowed(user._id,userId ?? 'NoID');
                console.log("Pedimos la relacion que tenemos con ese user:: exito");
                console.log(response);
                if(response){
                    setIsFollowing(false);
                }
                else{
                    alert("Algo ha ido mal al borrar el followed")
                }
                
            } catch (error) {
                console.log("Pedimos la relacion que tenemos con ese user:: mal");
                //window.location.href = '*';
                console.error(error);
            }
        }else{
            try {
                const response = await UserService.addFollowed(user._id,userId ?? 'NoID');
                console.log("Pedimos la relacion que tenemos con ese user:: exito");
                console.log(response);
                if(response){
                    setIsFollowing(true);
                }
                else{
                    alert("Algo ha ido mal al añadir el followed")
                }
            } catch (error) {
                console.log("Pedimos la relacion que tenemos con ese user:: mal");
                //window.location.href = '*';
                console.error(error);
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="user-profile">
                {currentUser ? (
                    <div className="profile">
                    <div className="profile-image">
                        {currentUser.photoUser ? (
                        <img src={currentUser.photoUser} alt="profile-img" className="profile-img-card" />
                        ) : (
                        <FaUserCircle className="default-profile-img" />
                        )}
                    </div>
                    <div className="profile-user-settings">
                        <h1 className="profile-user-name">{currentUser.appUser}</h1>
                        <button className={isFollowing ? "following-button" : "follow-button"} onClick={handleFollow}>
                        {isFollowing ? "Following" : "Follow"}
                        </button>
                    </div>
                    <div className="profile-stats">
                        <ul>
                        <li>
                            <span className="profile-stat-count">{currentUser.followersUser?.length}</span> followers
                        </li>
                        <li>
                            <span className="profile-stat-count">{currentUser.followedUser?.length}</span> following
                        </li>
                        </ul>
                    </div>
                    <div className="profile-bio">
                        <p>
                        Name: <span className="profile-real-name">{currentUser.nameUser}</span>
                        </p>
                        <p>Description: {currentUser.descriptionUser}</p>
                    </div>
                    </div>
                ) : (
                    <p>Loading user profile...</p>
                )}
            </div>
            <Footer/>
        </div>
    );


};

export default UserProfile;
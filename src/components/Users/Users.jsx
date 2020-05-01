import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/images/userPhoto.jpg'
import Preloader from "../common/preloader/Preloader";
import {NavLink} from "react-router-dom";



function Users(props) {

    let pages = [];
    let countPage = Math.ceil(props.usersTotalCount / props.pageSize);
    for (let i = 1; i <= countPage; i++) {
        pages.push(i);
    }

    return <div>
        {props.isFetching
            ?
            <Preloader/>
            : null
        }
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                             onClick={() => props.changedCurrentPage(p)}>{p}</span>

            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>

            <span>
                <div>
                    <NavLink to={'/profile/' + u.id}><img src={u.photos.small != null ? u.photos.small : userPhoto}
                                                          className={styles.photo}/></NavLink>
                </div>
                <div>
                    {u.followed
                        ? <button disabled={props.isFollowingProgress.some(id => id === u.id)} onClick={() => {
                           props.thunkFollow( u.id)
                        }}>Follow</button>
                        : <button disabled={props.isFollowingProgress.some(id => id === u.id)}onClick={() => {
                            props.thunkUnfollow( u.id)
                        }}

                        >Unfollow</button>
                    }
                </div>
            </span>
                <span><div>{u.name}</div>
                <div>{u.status}</div></span>
                <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
            </span>

            </div>)
        }
    </div>
}

export default Users;
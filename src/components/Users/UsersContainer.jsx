import React from 'react';
import {connect} from "react-redux";
import {
    getUsersThunkCreator,
    thunkFollow, thunkUnfollow

} from "../../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import {usersAPI} from "../../api/api";
import {compose} from "redux";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.pageSize, this.props.currentPage);
    }

    changedCurrentPage = (pageNumber) => {
        this.props.getUsersThunkCreator(this.props.pageSize, pageNumber);
    }

    render() {
        return <Users usersTotalCount={this.props.usersTotalCount}
                      pageSize={this.props.pageSize}
                      users={this.props.users}
                      currentPage={this.props.currentPage}
                      isFetching={this.props.isFetching}
                      isFollowingProgress={this.props.isFollowingProgress}
                      thunkFollow={this.props.thunkFollow}
                      thunkUnfollow={this.props.thunkUnfollow}
                      changedCurrentPage={this.changedCurrentPage}
                      getUsersThunkCreator={this.props.getUsersThunkCreator}
        />
    }

}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        usersTotalCount: state.usersPage.usersTotalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        toggleIsFetching: state.usersPage.toggleIsFetching,
        isFollowingProgress: state.usersPage.isFollowingProgress
    }
};

export default compose(
    connect(mapStateToProps, {
        thunkFollow, thunkUnfollow,
        getUsersThunkCreator
    })
)(UsersContainer)
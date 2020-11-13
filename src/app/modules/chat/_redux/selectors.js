import { createSelector } from "@reduxjs/toolkit";

import * as moment from 'moment'

export const MessagesSelector = state=>state.chat.messages;

export const selectedUserSelector = state=>state.chat.selectedUser;

export const selectedNameSelector = state=>state.chat.selectedName;

export const ContactsListSelector = (user) => createSelector(
    MessagesSelector,
    (messages) => !messages||!messages.length?[]:(Object.entries(messages.reduce((users, message) => {
            let id = message.user!=user.USER_IN_CODIGO?message.user:message.user2;
            let name = message.user!=user.USER_IN_CODIGO?message.username:message.username2;
            let lastMessage = message.message;
            let date = message.created_at;
            users[id] = (users[id] || {name,date, lastMessage});
            return users;
        },{})).map(([id,data])=>{
            return {id,...data};
        }).sort((user1,user2)=>{
            return moment(user2.date)-moment(user1.date);
        })
    )
)

export const UsersSelector = state => state.chat.users;

export const UsersListSelector = createSelector(
    UsersSelector,
    (users) => !users||!users.length?[]:(Object.entries(users.reduce((usersList, user) => {
            let letter=user.username[0];
            if(letter===''||letter===' ') return usersList;
            letter=letter.toUpperCase();
            usersList[letter] = (usersList[letter] || []).concat(user);
            return usersList;
        },{})).map(([letter,users])=>{
            return {letter,users};
        }).sort((group1,group2)=>{
            return group1.letter.localeCompare(group2.letter)
        })
    )
)

export const CurrentMessages = (authUser,user) => createSelector(
    MessagesSelector,
    (messages) => user&&authUser?(
        messages.filter(message=>(
            (message.user==authUser.USER_IN_CODIGO&&message.user2==user)
            ||(message.user==user&&message.user2==authUser.USER_IN_CODIGO)
        ))
    ):[],
)
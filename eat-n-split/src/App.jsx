import React, { useState } from "react";

import FriendList from "./components/FriendList";
import Form from "./components/Form";

import initialFriends from "./dev-data/data";

const App = () => {
  const [selectedFriend, setselectedFriend] = useState({});

  function selectFriend(friend) {
    setselectedFriend(friend);
  }

  function handleSubmit(updateObj) {
    console.log(updateObj);
  }

  const friendList = initialFriends.map((friend) => (
    <FriendList
      selectFriend={selectFriend}
      selectedFriend={selectedFriend}
      key={friend.id}
      friend={friend}
    />
  ));

  return (
    <div className="app">
      <div className="sidebar">
        <ul>{friendList}</ul>
        <div className="button">Add Friend</div>
      </div>
      <Form friend={selectedFriend} handleSubmit={handleSubmit} />
    </div>
  );
};

export default App;

function FriendList(props) {
  const { friend, selectFriend, selectedFriend } = props;

  // {
  //   id: 118836,
  //   name: "Clark",
  //   image: "https://i.pravatar.cc/48?u=118836",
  //   balance: -7,
  // },

  const balanceString = () => {
    const balance = Math.abs(friend.balance);
    // prettier-ignore
    if (friend.balance < 0) return <p className="red">You owe {friend.name} {balance}&euro;</p>
    else if (friend.balance > 0) return <p className="green">{friend.name} owes you {balance}&euro;</p>  
    else return <p>You are even with {friend.name}</p>
  };

  return (
    <li className={`${selectedFriend?.id === friend.id ? "selected" : ""}`}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {balanceString()}
      <div
        onClick={() => {
          selectFriend(friend);
        }}
        className="button"
      >
        {`${selectedFriend.id === friend.id ? "Close" : "Select"}`}
      </div>
    </li>
  );
}

export default FriendList;

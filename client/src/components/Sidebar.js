import React, { useContext, useEffect } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import { addNotifications, resetNotifications } from '../features/userSlice';
import "./Sidebar.css";
export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    socket,
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    messages,
    setMessages,
    privateMemberMessg,
    setPrivateMemberMessg,
    newMessages,
    setNewMessages,
  } = useContext(AppContext);

  function joinRoom(room, isPublic = true) {
    if (!user) {
        return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
        setPrivateMemberMessg(null);
    }
    // dispatch for notifications
    dispatch(resetNotifications(room));
}

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
  });

  useEffect(() => {
    if (user) {
        setCurrentRoom("general");
        getRooms();
        socket.emit("join-room", "general");
        socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });


  function getRooms(){
    fetch("http://localhost:5000/rooms")
    .then((res)=>res.json())
    .then((data)=>setRooms(data));
  }

  function orderIds(id1, id2) {
    if (id1 > id2) {
        return id1 + "-" + id2;
    } else {
        return id2 + "-" + id1;
    }
}
  function handlePrivateMessg(member){
    setPrivateMemberMessg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  }

  if (!user) {
    return <></>;
  }

  return (
    <>
      <h2>Available Rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
            <ListGroup.Item key={idx} onClick={() => joinRoom(room)} active={room === currentRoom} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
              {room} {currentRoom !== room && <span className="badge rounded-pill bg-primary">{user.newMessages[room]}</span>}
            </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
      <ListGroup>
        {members.map((member) => (
          <ListGroup.Item key={member.id} style={{ cursor: "pointer" }} active={privateMemberMessg?._id === member?._id} onClick={()=>handlePrivateMessg(member)} disabled={member._id===user._id}>
            <Row>
                <Col xs={2} className="member-status">
                    <img src={member.picture} className="member-status-img" />
                    {member.status == "online" ? <i className="fas fa-circle sidebar-online-status"></i> : <i className="fas fa-circle sidebar-offline-status"></i>}
                </Col>
                <Col xs={9}>
                    {member.name}
                    {member._id === user?._id && " (You)"}
                    {member.status == "offline" && " (Offline)"}
                </Col>
                <Col xs={1}>
                    <span className="badge rounded-pill bg-primary">{user.newMessages[orderIds(member._id, user._id)]}</span>
                </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

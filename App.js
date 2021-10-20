import React from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import io from 'socket.io-client'

const App = () => {
  const [text, setText] = React.useState("");
  const [connection, setConnection] = React.useState("Disconnected");
  const [id, setId] = React.useState(null);

  const socket = io.connect("http://127.0.0.1:5000/");

  // Check for connection
  if(socket.connected) {
    console.log("connected");
  } else {
    console.log("not connected");
  }

  socket.on("connect_error", (error) => {
    console.log(error);
  });

  socket.on("connect", (socket) => {
    console.log("Hy");
    setConnection("Connected");
    setId(socket.id);
  })

  socket.on("disconnect", (socket) => {
    console.log("Hy");
    setConnection("Disconnected");
    setId(null);
  })

  const buttonClicked = (e) => {
    socket.emit("user_name", {name: text});
    setText("");
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: "row", marginTop: 100}}>
        <View style={{flex: 2}}>
          <Text style={{margin: 12, padding: 10}}>Enter your Name: </Text>
        </View>
        <View style={{flex: 3}}>
          <TextInput style={styles.input} onChange={setText} value={text} placeholder="Enter Your Name: " />
        </View>
      </View>
      <View style={{flex: 1}}>
        <Button title="Send Name to PI Device" onPress={buttonClicked} />
      </View>
      <View style={{flex: 1, alignItems: "center"}}>
        <Text>Device Status: {connection}</Text>
        {id ? <Text style={{marginTop: 20}}>Device Id: {id}</Text> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }

})

export default App;